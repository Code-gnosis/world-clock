const request = require('request')

const time = (latitude, longitude, callback) =>{
  const url = 'https://www.timeapi.io/api/Time/current/coordinate?latitude=' + latitude + '&longitude=' + longitude

  request( {url, json:true }, (error, {body}) => {
    if (error){
      callback('Unable to provide time! Please check your network', undefined)
    } else if (body.error){
      callback('Unable to obtain address!', undefined)
    } else{
      callback(undefined, body.time + '   ' +body.date)
    }
  })
}

module.exports = time