//VARIÁVEIS
var hasFlippedCard = false
var firstCard = ''
var secondCard = ''
var countWin = 0
var lockBoard = false
var positionCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

//SELECIONAR TODAS AS CARTAS
const CARDS = document.querySelectorAll('.c-card')

//PERCORRER TODAS AS CARTAS, ADICIONANDO O EVENT LISTENER DE CLICAR
CARDS.forEach((card) => {
  card.addEventListener('click', managerCard)
  card.style.order = shuffleCards()
})

//ADICIONAR TODAS AS FUNCÕES E REGRAS DE NEGÓCIOS AO CLICAR NA CARTA
function managerCard() {
  //VERIFICA SE O TABULEIRO ESTÁ TRANCADO
  if (lockBoard) {
    return
  }

  //VERIFICA SE POSSUI ALGUMA CARTA VIRADA
  if (!hasFlippedCard) {
    this.classList.add('flip')
    hasFlippedCard = true
    firstCard = this
    return
  }

  //VERIFICA SE A CARTA CLICADA É A MESMA DA ANTERIOR
  if (this.id === firstCard.id) {
    this.removeEventListener('click', managerCard)
    return
  }

  this.classList.add('flip')
  secondCard = this

  //VERIFICA SE OS DATASETS SÃO DIFERENTES
  if (firstCard.dataset.card !== secondCard.dataset.card) {
    lockBoard = true
    setTimeout(() => {
      firstCard.addEventListener('click', managerCard)

      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')

      hasFlippedCard = false
      lockBoard = false
    }, 1000)

    return
  }

  //CASO AS CARTAS VIRADAS SEJAM PARES
  firstCard.removeEventListener('click', managerCard)
  secondCard.removeEventListener('click', managerCard)

  countWin++

  if (countWin === 8) {
    lockBoard = true
    alert('ganhou')
  }

  hasFlippedCard = false
  firstCard = ''
  secondCard = ''
}

function shuffleCards() {
  let random = 0
  //CONDIÇÃO PARA NÃO GERAR NÚMEROS REPETIDOS
  do {
    //GERA UM NÚMERO ALEATORIO ENTRE 0 E 20
    random = Math.floor(Math.random() * 16)
  } while (positionCards[random] === -1)

  let position = positionCards[random]
  positionCards[random] = -1

  return position
}
