const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();

// Define path for express config
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//setup handbars and view locaton
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('',(req,res)=>{
    res.render('index')
})
 app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,city})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: data,
                location: city
            })
        })
    })
 })

app.listen(3000,()=>{
    console.log('Server 3000 is running')
})
