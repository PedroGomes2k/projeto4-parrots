
const containerDasCartas = document.querySelector('.containerCards')

const imagensCartas = [
    'bobrossparrota',
    'explodyparrota',
    'fiestaparrota',
    'metalparrota',
    'revertitparrota',
    'tripletsparrota',
    'unicornparrota'

]

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

    containerDasCartas.appendChild(cards)
}


function jogabilidadeCartas() {

    const cartasDuplicadas = [...imagensCartas, ...imagensCartas]

    const cartasMisturadas = cartasDuplicadas.sort(() => Math.random() -0.2 )

    cartasMisturadas.forEach((imagensSelecionadas) => {

        const carta = cartasCriadas(imagensSelecionadas)
    });


}

jogabilidadeCartas()





function clickCard(cartaClicada) {

    cartaClicada = document.querySelector('.back')
    cartaClicada.classList.toggle('card')
}

// Agora temos que fazer uma copia do html para o JavaScript





/*const quantidadeDeCartas = [Number(prompt('Quantas cartas você quer jogar?'))]
function numeroCartas(){
    i = quantidadeDeCartas

   console.log(i)
  
    
    
}
*/
