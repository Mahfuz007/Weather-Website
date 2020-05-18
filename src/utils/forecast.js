const request= require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a08ea5ceb0333e4bd94279ea3dba8d79&query='+latitude+','+longitude+'&units=f';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather services!',undefined);
        }else if(body.error){
            callback('Unable to find weather location. Try another location',undefined);
        }else{
            callback(undefined,"It is currently "+ body.current.temperature +" degrees out there. There is "+body.current.feelslike+" degrees temperature feels like.");
        }
    })
}

module.exports = forecast;