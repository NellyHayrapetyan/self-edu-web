const express = require('express');
const compression = require('compression');
const app = express();


app.use(compression());

app.use(express.static('./dist/self-edu-web'));
app.get('/*', (req, res) => res.sendFile('src/index.html', { root: 'dist/self-edu-web'}));

app.listen(process.env.PORT || 8080);
