//url = 'https://api.nasa.gov/mars-photos/api_key=5TFO0C6T0kM7gGsv7pTwRAVPWpTS5HvKT241chj0'
const photos = document.querySelector('#photos')
const earth_date = document.querySelector('#earth_date')
const button = document.querySelector('#send')
const tableinfo = document.querySelector('#tableinfo')
const section = document.querySelector('section')

button.addEventListener('click', function(){
  photos.innerHTML = ''
  tableinfo.innerHTML = ''
  let date = earth_date.value

  if(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date)) {
    photos.innerHTML = `<img id = "rocket" src="http://www.davidbenedetti.it/wp-content/uploads/2017/02/Rocket-3D-001.gif">`
    load(date)
  } else {
    alert('Invalid date.')
  }
})


function load(date){
  let url=`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=5TFO0C6T0kM7gGsv7pTwRAVPWpTS5HvKT241chj0`

  fetch(url)
    .then(response => response.json())
    .then(data => {

    photos.innerHTML = ''

let thead = `
          <tr><th>Name of the rover:</th></tr>
          <tr><th>The Rover's landing date on Mars:</th></tr>
          <tr><th>The Rover\'s launch date from Earth:</th></tr>
          <tr><th>The Rover's mission status:</th></tr>
          <tr><th>Most recent Martian sol from which photos exist:</th></tr>
          <tr><th>Most recent Earth date from which photos exist:</th></tr>
          <tr><th>Number of photos taken by that Rover:</th></tr>
          `
let tbody = `
          <tr><td>${data.photos[1].rover.name}</td></tr>
          <tr><td>${data.photos[1].rover.landing_date}</td></tr>
          <tr><td>${data.photos[1].rover.launch_date}</td></tr>
          <tr><td>${data.photos[1].rover.status}</td></tr>
          <tr><td>${data.photos[1].rover.max_sol}</td></tr>
          <tr><td>${data.photos[1].rover.max_date}</td></tr>
          <tr><td>${data.photos[1].rover.total_photos}</td></tr>
          `
let length
  if(data.photos.length > 28) length = 28;
  else length = data.photos.length

for(let i = 0; i < length; i++) {
   photos.innerHTML += `<div><a class="uk-inline picture" href=${data.photos[i].img_src} caption=${data.photos[i].camera.full_name}><img src=${data.photos[i].img_src}></a></div>`
}
  tableinfo.innerHTML +=`<p id="description">> A mission manifest is available for each Rover. This manifest will list details of the Rover's mission:</p><table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`

  })
}
