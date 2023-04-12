const express = require('express')
const app = express()
const port = 3001

app.get('/', function (req, res) {
   var a = 1, b =2;
   var c = a + b;
   res.send('Hello NodeJS!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})