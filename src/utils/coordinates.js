const request = require('request')


const coordinates = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhpZXJyeWVsaWphaCIsImEiOiJja3ozbnhvNzkwNTdhMm9sMzJvcHhxZG5tIn0.MJtB5S1_GcwGno3gHrQodg&limit=1'
  
  request({url, json:true}, (error, {body}) => {
    if (error){
      callback('Unable to connect to location services!', undefined)
    }else if (body.features.length === 0){
      callback('Unable to obtain location. Please another location!',undefined)
    }else{
      callback(undefined, {
        latitude:body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = coordinates

