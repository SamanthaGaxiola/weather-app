const form = document.querySelector('.maincontainer form')
const input = document.querySelector('.maincontainer input')
const list = document.querySelector('.city-box .cities')
const msg = document.querySelector('.maincontainer .msg')
const apiKey = '4d8fb5b93d4af21d66a2948710284366'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const listItems = list.querySelectorAll('.city-box .cities')
  const listItemsArray = Array.from(listItems)
  const inputVal = input.value

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = ''
      if (inputVal.includes(',')) {
        if (inputVal.split(',')[1].length > 2) {
          inputVal = inputVal.split(',')[0]
          content = el
            .querySelector('.city-name span')
            .textContent.toLowerCase()
        } else {
          content = el.querySelector('.city-name').dataset.name.toLowerCase()
        }
      } else {
        content = el.querySelector('.city-name span').textContent.toLowerCase()
      }
      return content == inputVal.toLowerCase()
    })

    if (filteredArray.length > 0) {
      const cityName =
        filteredArray[0]?.querySelector('.city-name span')?.textContent
      const text = cityName
        ? `You already know the weather for ${cityName}! Try a new City!`
        : ''
      msg.textContent = text
      form.reset()
      input.focus()
      return
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys } = data
      const li = document.createElement('li')
      li.classList.add('cities')
      const markup = `
        <h2 class="city-name" data-name="${name}">
          <span>${name}</span>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>`
      li.innerHTML = markup
      list.innerHTML = ''
      list.appendChild(li)
    })
})
