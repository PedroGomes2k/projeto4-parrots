
const containerDasCartas = document.querySelector('.containerCards')

let primeiraCarta = ''

let segundaCarta = ''

let numeroCarta = ''

let cartasDaCaixa = []

const imagensCartas = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'

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


function verificarCartas() {
    // Essa é a forma de verificaçao se as cartas são iguais
    const primeiraCartaEscolhida = primeiraCarta.getAttribute('data-imagensSelecionada')
    const segundaCartaEscolhida = segundaCarta.getAttribute('data-imagensSelecionada')

    // Realizando a condição de cartas iguais
    if (primeiraCartaEscolhida === segundaCartaEscolhida) {

        // Caso esteja certo ela vai liberar para escolha de novas cartas
        primeiraCarta = ''
        segundaCarta = ''

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

function rotacaoCarta({ target }) {

    // Ele ira procurar a div pai do elemento que foi clicado e adcionar a movimentaçao da carta
    if (target.parentNode.className.includes('rotacao')) {

    }

    // Ele vai pegar a primeira carta e rotaciona-la e vai salvar o parentNode para poder verficar verificarCartas()
    if (primeiraCarta === '') {

        target.parentNode.classList.add('rotacao')
        primeiraCarta = target.parentNode

        // Ele vai pegar a segunda carta e rotaciona-la e vai salvar o parentNode para poder verficar verificarCartas()
    } else if (segundaCarta === '') {

        target.parentNode.classList.add('rotacao')
        segundaCarta = target.parentNode

        // Function de verificaçao das cartas
        verificarCartas()

    }

}

// Function para criar cartas
function cartasCriadas(imagensSelecionadas) {

    // Criaçao dos elementos dentro da div do html
    const cards = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')
    
    // Colocando nome de class para ultiliza-la e dar estilo
    cards.className = 'cards'
    front.className = 'front card'
    back.className = 'back '

    // Adicionando imagens as faces da carta
    front.style.backgroundImage = `url(../Imagens/back.png)`
    back.style.backgroundImage = `url(../Imagens/${imagensSelecionadas})`
    
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
