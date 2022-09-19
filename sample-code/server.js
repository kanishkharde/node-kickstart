const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.send("OK");
});

app.listen(9898, () => {
    console.log('server started at http://localhost:9898')
});