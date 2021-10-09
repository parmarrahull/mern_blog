const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');

dotenv.config({ path: './config.env'});

require('./db/Connect');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors());
app.use(express.json());

//we link the router files to make our route easy
app.use(require('./router'));

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send(`Hello Server page`);
});

app.listen(8000, () => {
    console.log(`Server is running at port no 8000`);
})
