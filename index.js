const express = require('express');
const app = express();
const PORT = 3000;

app.use('/static', express.static('public'))

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    writeFileFromAPI()
});

function writeFileFromAPI() {
    fs = require('fs');
    fs.writeFile('./public/js/app.js', `console.log('write/static/js/app.js');
    window.YETT_BLACKLIST = [
        /www\.google-analytics\.com/,
    ];`,
        function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
        });
}