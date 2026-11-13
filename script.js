const containerDasCartas = document.querySelector('.containerCards')

let primeiraCarta = ''

let segundaCarta = ''

let numeroCarta = ''

let cartasDaCaixa = []

// Timer: começa na primeira carta virada e para quando o último par é encontrado
const tempoNaTela = document.querySelector('.tempo')

let tempoInicio = 0

let intervaloTimer = ''


const imagensCartas = [
    'pikachu.png',
    'charizard.png',
    'snorlax.png',
    'squedel.png',
    'lucario.png',
    'infernape.png',
    'onix.png'
]



function numerosPares() {

    // Fazendo a verificação se o numeroCarta é um par 
    if (numeroCarta % 2 !== 0 || numeroCarta < 4 || numeroCarta > 14) {

        return true

    } else {

        return false
    }
}

function quantidadeCartas() {

    // Fazendo a pergunta para o usuário de quantas cartas ele quer para jogar
    while (numerosPares()) {
        // Realizando descrição para fazer essa ação 
        numeroCarta = Number(prompt('Quantas cartas voce quer jogar? Sua escolha tem que ser entre pares de 4 a 14'))
    }

    // Ultilização de uma array para poder fazer a quantidade de carta selecionada funcionar
    caixaCarta()
}

quantidadeCartas()

function caixaCarta() {

    /* Esse processo foi feito por que quando o usuário escolhesse a quantidade de carta 
    ficaria sortido quais cartas escolhidas. E para que as cartas ficassem as mesmas ultilizei
    duas vezes o mesmo processo de push,assim elas vão ficar de maneira similar. Porém, a 
    ultilização de 2 push iria dar o dobro, por isso fiz divisão por 2 para ficar  na quantidade
    exata 
    */
    numeroCarta = numeroCarta / 2

    // Fazendo a condicional para criar a quantidade de carta escolhida
    for (let i = 0; i < numeroCarta; i++) {

        // Agora ele vai pegar o Array cartasDaCaixa e vou pegar todas imagens na quantidade que os usuário escolheu
        // A ultilização de 2 funçoes é para que va as mesmas imagens de cartas para o usuário 

        cartasDaCaixa.push(imagensCartas[i])
        cartasDaCaixa.push(imagensCartas[i])
    }
}

function jogabilidadeCartas() {

    // Fazendo o shuffle das cartas
    cartasDaCaixa.sort(() => Math.random() - 0.5)

    // Fazendo com o que o JS leia linha por linha do Array cartasDaCaixa
    cartasDaCaixa.forEach((imagensSelecionadas) => {

        // Seleção das imagens das cartas na function
        cartasCriadas(imagensSelecionadas)

    })

}

jogabilidadeCartas()

// Function para criar cartas
function cartasCriadas(imagensSelecionadas) {

    // Criaçao dos elementos dentro da div do html
    const cards = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')

    // Colocando nome de class para ultiliza-la e dar estilo
    cards.className = 'cards'
    front.className = 'front card'
    back.className = 'back card '

    // Adicionando imagens as faces da carta
    front.style.backgroundImage = `url(Imagens/pokebola.png)`
    back.style.backgroundImage = `url(Imagens/${imagensSelecionadas})`

    // Fazendo transformaçao de divs em filhos da div 'cards'
    cards.appendChild(front)
    cards.appendChild(back)

    // Ultilizar o evento para conseguir clicar em uma carta
    cards.addEventListener('click', rotacaoCarta)
    // Acrescentando atributos nas imagens para poder verificar se são iguais
    cards.setAttribute('data-imagensSelecionada', imagensSelecionadas)

    // Transformandno a div 'cards' em uma div filha
    containerDasCartas.appendChild(cards)
}

function rotacaoCarta({ target }) {

    // Ele ira procurar a div pai do elemento que foi clicado: se a carta já estiver virada, não faz nada
    if (target.parentNode.className.includes('rotacao')) {
        return
    }

    // Se já tem duas cartas viradas esperando a verificação, espera ela terminar
    if (segundaCarta !== '') {
        return
    }


    // Na primeira carta do jogo o timer começa a contar
    if (tempoInicio === 0) {
        iniciarTimer()
    }

    // Ele vai pegar a primeira carta e rotaciona-la e vai salvar o parentNode para poder verficar verificarCartas()
    if (primeiraCarta === '') {

        target.parentNode.classList.add('rotacao')
        primeiraCarta = target.parentNode
        console.log(primeiraCarta)
        
        // Ele vai pegar a segunda carta e rotaciona-la e vai salvar o parentNode para poder verficar verificarCartas()
    } else if (segundaCarta === '') {

        target.parentNode.classList.add('rotacao')
        segundaCarta = target.parentNode
        console.log(segundaCarta)


        // Function de verificaçao das cartas
        verificarCartas()

    }  
}


function verificarCartas() {
    // Essa é a forma de verificaçao se as cartas são iguais
    const primeiraCartaEscolhida = primeiraCarta.getAttribute('data-imagensSelecionada')
    const segundaCartaEscolhida = segundaCarta.getAttribute('data-imagensSelecionada')

    // Realizando a condição de cartas iguais
    if (primeiraCartaEscolhida === segundaCartaEscolhida) {

        // Caso esteja certo ela vai liberar para escolha de novas cartas
        primeiraCarta = ''
        segundaCarta = ''

        endGame()
    } else {

        // Ação de falha entre as duas cartas
        setTimeout(() => {

            // Caso estaja errado vai remover a ação da carta virar
            primeiraCarta.classList.remove('rotacao')
            segundaCarta.classList.remove('rotacao')

            // Caso esteja errado ela vai liberar para escolha de novas cartas
            primeiraCarta = ''
            segundaCarta = ''

        }, 1000)
    }
}

function endGame(){

    // Pegando as cartas viradas na hora em que um par é encontrado
    const fimDoJogo = document.querySelectorAll('.rotacao')

    if(fimDoJogo.length === cartasDaCaixa.length){

      const tempoFinal = pararTimer()

      // Espera a animação da última carta terminar e confere se bateu o recorde
      setTimeout(() => verificarRecorde(tempoFinal), 600)
    }
}

// Transforma os milissegundos em minutos:segundos.décimos (ex: 01:23.4)
function formatarTempo(milissegundos) {

    const minutos = Math.floor(milissegundos / 60000)
    const segundos = Math.floor((milissegundos % 60000) / 1000)
    const decimos = Math.floor((milissegundos % 1000) / 100)

    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${decimos}`
}

function iniciarTimer() {

    tempoInicio = Date.now()

    // Atualiza o tempo na tela a cada décimo de segundo
    intervaloTimer = setInterval(() => {
        tempoNaTela.innerHTML = formatarTempo(Date.now() - tempoInicio)
    }, 100)
}

function pararTimer() {

    clearInterval(intervaloTimer)

    const tempoFinal = Date.now() - tempoInicio
    tempoNaTela.innerHTML = formatarTempo(tempoFinal)

    return tempoFinal
}





// ------------------------------------------------------------------
// Recordes: ficam salvos online (API em api/recordes.js, na Vercel),
// um recorde para cada quantidade de cartas
// ------------------------------------------------------------------

const modalRecordes = document.querySelector('.modalRecordes')
const mensagemRecordes = document.querySelector('.mensagemRecordes')
const listaRecordes = document.querySelector('.listaRecordes')

function buscarRecordes() {

    return fetch('api/recordes').then((resposta) => {

        if (!resposta.ok) {
            throw new Error('API de recordes indisponível')
        }

        return resposta.json()
    })
}

function salvarRecorde(nome, tempo) {

    return fetch('api/recordes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartas: cartasDaCaixa.length, nome: nome, tempo: tempo })
    }).then((resposta) => {

        if (!resposta.ok) {
            throw new Error('Não foi possível salvar o recorde')
        }

        return resposta.json()
    })
}

function verificarRecorde(tempoFinal) {

    const tempoTexto = formatarTempo(tempoFinal)
    const cartas = cartasDaCaixa.length

    buscarRecordes()
        .then((recordes) => {

            const recordeAtual = recordes[cartas]

            // Não bateu o recorde: mostra o tempo e quem continua na frente
            if (recordeAtual && recordeAtual.tempo <= tempoFinal) {
                mostrarRecordes(recordes, `Você zerou em ${tempoTexto}! O recorde com ${cartas} cartas continua com ${recordeAtual.nome}.`)
                return
            }

            // Bateu o recorde: pergunta o nome e salva
            const nome = prompt(`🎉 Novo recorde! Você zerou ${cartas} cartas em ${tempoTexto}. Qual é o seu nome?`)

            if (nome === null || nome.trim() === '') {
                mostrarRecordes(recordes, `Você zerou em ${tempoTexto}! Sem nome, o recorde não foi salvo.`)
                return
            }

            return salvarRecorde(nome.trim(), tempoFinal).then((resultado) => {

                if (resultado.novoRecorde) {
                    mostrarRecordes(resultado.recordes, `🎉 Parabéns, ${nome.trim()}! Novo recorde com ${cartas} cartas: ${tempoTexto}`)
                } else {
                    mostrarRecordes(resultado.recordes, `Alguém foi mais rápido agora há pouco! Você zerou em ${tempoTexto}.`)
                }
            })
        })
        .catch(() => {
            // Sem a API (ex.: abrindo o arquivo direto no computador) o jogo continua funcionando
            mostrarRecordes(null, `Você zerou em ${tempoTexto}!`)
        })
}

function mostrarRecordes(recordes, mensagem) {

    // textContent (e não innerHTML) para o nome digitado aparecer só como texto
    mensagemRecordes.textContent = mensagem
    listaRecordes.innerHTML = ''

    if (recordes === null) {

        const item = document.createElement('li')
        item.className = 'semRecordes'
        item.textContent = 'Não foi possível carregar os recordes agora.'
        listaRecordes.appendChild(item)

    } else {

        [4, 6, 8, 10, 12, 14].forEach((quantidade) => {

            const recorde = recordes[quantidade]

            const item = document.createElement('li')
            const textoCartas = document.createElement('span')
            const textoNome = document.createElement('span')
            const textoTempo = document.createElement('span')

            textoCartas.className = 'quantidade'
            textoNome.className = 'nome'
            textoTempo.className = 'tempoRecorde'

            textoCartas.textContent = `${quantidade} cartas`
            textoNome.textContent = recorde ? recorde.nome : '—'
            textoTempo.textContent = recorde ? formatarTempo(recorde.tempo) : 'sem recorde'

            // Destaca a linha da quantidade de cartas que está sendo jogada
            if (quantidade === cartasDaCaixa.length) {
                item.classList.add('modoAtual')
            }

            item.appendChild(textoCartas)
            item.appendChild(textoNome)
            item.appendChild(textoTempo)
            listaRecordes.appendChild(item)
        })
    }

    modalRecordes.classList.remove('escondido')
}

function fecharRecordes() {
    modalRecordes.classList.add('escondido')
}

// Botão 🏆 Recordes: mostra quem zerou mais rápido em cada modo
document.querySelector('.botaoRecorde').addEventListener('click', () => {

    mostrarRecordes({}, 'Carregando...')

    buscarRecordes()
        .then((recordes) => mostrarRecordes(recordes, 'Quem zerou mais rápido em cada quantidade de cartas:'))
        .catch(() => mostrarRecordes(null, 'Recordes indisponíveis'))
})

document.querySelector('.fecharRecordes').addEventListener('click', fecharRecordes)

// Clicar fora da caixa também fecha
modalRecordes.addEventListener('click', (evento) => {
    if (evento.target === modalRecordes) {
        fecharRecordes()
    }
})

// Jogar de novo: recarrega a página e pergunta a quantidade de cartas outra vez
document.querySelector('.jogarDeNovo').addEventListener('click', () => location.reload())
