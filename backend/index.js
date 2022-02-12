const connectToMongo = require('./db');
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

connectToMongo();
const port = 5000


app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`iNoteBook Backend app listening on port ${port}`)
})

