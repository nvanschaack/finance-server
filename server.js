
const express = require('express');
const app = express()
require('dotenv').config()

const PORT = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//using POST method here because we have to pass information using req.body (CREATE in CRUD methods)
//SP500 & VIX
app.post('/api/data', (req, res) => {
    fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${req.body.seriesId}&api_key=${process.env.FREDAPIKEY}&file_type=json`)
    .then((response)=> response.json())
    .then((data)=> res.json(data))
})

// app.get('/api/data/:ticker', (req,res)=> {
//     fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${req.params.ticker}&api_key=887f89b21accb02d2d33bcae5e10ac1b&file_type=json`)
//     .then((response)=> response.json())
//     .then((data)=> res.json(data))
// })

//using GET method here because were just reading data from this API endpoint (READ in CRUD methods)
//COP
app.get('/api/COPdata', (req,res)=> {
    fetch(`https://www.alphavantage.co/query?function=WTI&interval=daily&entitlement=delayed&apikey=F67UFNIP0NRAM1GI`)
    .then((response)=> response.json()) //converting response from the API into readable format
    .then((data)=> res.json(data)) //this res.json is going from the server to the react application
})

//TYTR
app.get('/api/TYTR', (req,res)=>{
    fetch(`https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=15min&entitlement=delayed&maturity=10year&apikey=F67UFNIP0NRAM1GI`)
    .then((response)=> response.json()) //converting response from the API into readable format
    .then((data)=>res.json(data)) //this res.json is going from the server to the react application
})

//EURO TO USD
app.get('/api/EuroToUSD', (req,res)=>{
    fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&interval=15min&entitlement=delayed&from_currency=EUR&to_currency=USD&apikey=F67UFNIP0NRAM1GI`)
    .then((response)=> response.json()) //converting response from the API into readable format
    .then((data)=> res.json(data)) //this res.json is going from the server to the react application
})

app.listen(PORT, () => {
    console.log('server is running');
})