const path = require('path')
const express = require('express')
const hbs = require('hbs')
const coordinates = require('./utils/coordinates')
const time = require('./utils/time')

const app = express()
const port = process.env.PORT ||8000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
  res.render('index',{
    title: 'World-Clock',
    name: 'The Greatest Full Stack Developer'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About',
    name:'The Greatest Full Stack Developer',
    aboutText:'Contact me via '
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help!',
    name: 'The Greatest Full Stack Developer',
    helpText:'Glad to have you here. You are Loved!'
  })
})

app.get('/time', (req,res) => {
  if(!req.query.address) {
    return res.send({
      error:'You must provide an address'
    })
  }
  
  coordinates(req.query.address, (error, {latitude, longitude,location}={}) =>{
      if (error){
        return res.send({error})
      }else{
        time(latitude, longitude, (error, timeData) =>{
          if (error){
            return res.send({error})
          }
          res.send({
            location: location,
            time: timeData
          })
        })
      }
    })
})

app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products:[]
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    title: '404 Error',
    errorMessage: 'Page not found!',
    name:'The Greatest Full Stack Developer'
  })
})

app.listen(port, () => {
  console.log('server is up on port 8000.')
})