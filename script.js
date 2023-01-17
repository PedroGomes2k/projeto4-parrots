
const containerDasCartas = document.querySelector('.containerCards')

let primeiraCarta = ''

let segundaCarta = ''

let numeroCarta = ''

let cartaCaixa = []

const imagensCartas = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'

]

function numerosPares() {

    if (numeroCarta % 2 !== 0 || numeroCarta < 4 || numeroCarta > 14) {

        return true

    } else {

        return false
    }
}

function quantidadeCartas() {

    while (numerosPares()) {
        numeroCarta = Number(prompt('Quantas cartas voce quer jogar? Sua escolha tem que ser entre pares de 4 a 14'))
    }

    caixaCarta()
}


quantidadeCartas()


function caixaCarta() {

    for (let i = 0; i < numeroCarta; i++){

        cartaCaixa.push(imagensCartas[i])
      
    }
    
    cartasCriadas()
    
}
function jogabilidadeCartas() {


    const cartasMisturadas = as.sort(() => Math.random() - 0.5)

    cartasMisturadas.forEach((imagensSelecionadas) => {

        const carta = cartasCriadas(imagensSelecionadas)
    });

    
}


function verificarCartas() {
    const primeiraCartaEscolhida = primeiraCarta.getAttribute('data-imagensSelecionada')
    const segundaCartaEscolhida = segundaCarta.getAttribute('data-imagensSelecionada')

    if (primeiraCartaEscolhida === segundaCartaEscolhida) {

        primeiraCarta = ''
        segundaCarta = ''

    } else {
        setTimeout(() => {

            primeiraCarta.classList.remove('rotacao')
            segundaCarta.classList.remove('rotacao')

            primeiraCarta = ''
            segundaCarta = ''

        }, 1000)
    }
}

function rotacaoCarta({ target }) {

    if (target.parentNode.className.includes('rotacao')) {
        return
    }

    if (primeiraCarta === '') {

        target.parentNode.classList.add('rotacao')
        primeiraCarta = target.parentNode


    } else if (segundaCarta === '') {

        target.parentNode.classList.add('rotacao')
        segundaCarta = target.parentNode

        verificarCartas()

    }

}

function cartasCriadas(imagensSelecionadas) {


    const cards = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')

    cards.className = 'cards'
    front.className = 'front card'
    back.className = 'back '

    front.style.backgroundImage = `url(../Imagens/back.png)`
    back.style.backgroundImage = `url(../Imagens/${imagensSelecionadas}.gif)`
    cards.addEventListener

    cards.appendChild(front)
    cards.appendChild(back)

    cards.addEventListener('click', rotacaoCarta)
    cards.setAttribute('data-imagensSelecionada', imagensSelecionadas)

    containerDasCartas.appendChild(cards)
    
}








function clickCard(cartaClicada) {

    cartaClicada = document.querySelector('.back')
    cartaClicada.classList.add('card')
}
