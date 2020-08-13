const express = require('express');
const app = express();

app.use(express.static('./dist/self-edu-web'));
app.get('/*', (req, res) => res.sendFile('src/index.html', { root: 'dist/self-edu-web'}));

app.listen(process.env.PORT || 8080);
