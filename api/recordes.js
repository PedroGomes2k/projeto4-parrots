import { get, put, BlobPreconditionFailedError } from '@vercel/blob'

// API dos recordes do jogo (roda como função da Vercel)
//   GET  /api/recordes -> { "4": { nome, tempo, data }, "6": {...}, ... }
//   POST /api/recordes  { cartas, nome, tempo } -> salva se bater o recorde daquela quantidade de cartas
//
// Os recordes ficam num arquivo JSON privado no Vercel Blob.
// Fora da produção (testes locais e previews) usamos outro arquivo, para não misturar.
const ARQUIVO = process.env.VERCEL_ENV === 'production' ? 'recordes.json' : 'recordes-teste.json'

const QUANTIDADES_DE_CARTAS = [4, 6, 8, 10, 12, 14]

// Erros que acontecem quando duas pessoas tentam salvar o arquivo ao mesmo tempo
function outraPessoaSalvouJunto(erro) {

    const mensagem = String(erro.message)

    return erro instanceof BlobPreconditionFailedError
        || mensagem.includes('conflicting operation')
        || mensagem.includes('already exists')
}

async function lerRecordes() {

    // useCache: false garante que sempre lemos a versão mais nova do arquivo
    const resultado = await get(ARQUIVO, { access: 'private', useCache: false })

    if (resultado === null) {
        return { recordes: {}, etag: null }
    }

    const texto = await new Response(resultado.stream).text()

    return { recordes: JSON.parse(texto), etag: resultado.blob.etag }
}

export async function GET() {

    const { recordes } = await lerRecordes()

    return Response.json(recordes, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request) {

    let dados

    try {
        dados = await request.json()
    } catch {
        return Response.json({ erro: 'JSON inválido' }, { status: 400 })
    }

    const cartas = Number(dados.cartas)
    const tempo = Math.round(Number(dados.tempo))
    const nome = String(dados.nome ?? '').trim().slice(0, 20)

    // Validações: quantidade de cartas do jogo, tempo possível (de 1s a 1h) e nome preenchido
    if (!QUANTIDADES_DE_CARTAS.includes(cartas) || !Number.isFinite(tempo) || tempo < 1000 || tempo > 3600000 || nome === '') {
        return Response.json({ erro: 'Dados inválidos' }, { status: 400 })
    }

    // Até 5 tentativas: se outra pessoa salvar ao mesmo tempo, lemos de novo e comparamos outra vez
    for (let tentativa = 0; tentativa < 5; tentativa++) {

        if (tentativa > 0) {
            // espera um pouquinho (tempo aleatório) para não colidir de novo
            await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 250))
        }

        const { recordes, etag } = await lerRecordes()
        const recordeAtual = recordes[cartas]

        if (recordeAtual && recordeAtual.tempo <= tempo) {
            return Response.json({ novoRecorde: false, recordes })
        }

        recordes[cartas] = { nome, tempo, data: new Date().toISOString() }

        try {
            await put(ARQUIVO, JSON.stringify(recordes), {
                access: 'private',
                contentType: 'application/json',
                addRandomSuffix: false,
                // só sobrescreve se o arquivo não mudou desde que lemos (ifMatch)
                allowOverwrite: etag !== null,
                ...(etag ? { ifMatch: etag } : {})
            })

            return Response.json({ novoRecorde: true, recordes })

        } catch (erro) {

            if (!outraPessoaSalvouJunto(erro)) {
                throw erro
            }
        }
    }

    return Response.json({ erro: 'Muitas pessoas salvando ao mesmo tempo, tente de novo' }, { status: 409 })
}
