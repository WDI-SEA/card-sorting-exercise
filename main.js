console.log('BUTTS')

const capitalize = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase()

let toMove = null;

getCards.addEventListener('submit', e => {
  e.preventDefault()
  fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=6`)
  .then(data => data.json())
  .then(res => {
    console.log(res)
    let wrapper = document.querySelector('.cards-wrapper')
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
    res.cards.forEach((card, i) => {
      img = document.createElement('img')
      img.src = card.image
      img.classList.add('card')
      img.setAttribute('alt', `${capitalize(card.value)} of ${capitalize(card.suit)}`)
      img.id = i
      
      wrapper.appendChild(img)
    })
  })
})

document.querySelector('.cards-wrapper').addEventListener('click', e => {
  console.log(e.target)
  if (!e.target.src) return
  if (!toMove) {
    // add card to limbo
    toMove = {
      id: e.target.id,
      alt: e.target.alt,
      src: e.target.src,
    }
    e.target.classList.add('move')
  } else {
    let replace = e.target
    console.log('replace:')
    console.log(replace)
    let swap = document.getElementById(toMove.id)
    swap.src = e.target.src
    swap.alt = e.target.alt
    swap.classList.remove('move')

    e.target.src = toMove.src
    e.target.alt = toMove.alt

    toMove = null
  }
})