
const timeFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



//e stand for event, e.preventDeafult prevents the form from refreshing the browser every time a search is made.
timeFrom.addEventListener('submit', (e)=>{
  e.preventDefault()
  const location = search.value
  messageOne.textContent ='Loading...'
  messageTwo.textContent =''

  fetch('/time?address=' + location).then((response)=>{
  response.json().then((data)=>{
    if (data.error){
      messageOne.textContent = data.error
      messageTwo.textContent = ''
    }else{
      messageOne.textContent = data.location
      messageTwo.textContent = data.time
    }
  })
})
})