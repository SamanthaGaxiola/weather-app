const form = document.querySelector('.top-banner form')
const input = document.querySelector('.top-banner input')
const list = document.querySelector('.city-box .cities')
const apiKey = '4d8fb5b93d4af21d66a2948710284366'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const listItems = list.querySelectorAll('.city-box .city')
  const inputVal = input.value

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys } = data
      const li = document.createElement('li')
      li.classList.add('city')
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>`
      li.innerHTML = markup
      list.appendChild(li)
    })
})
