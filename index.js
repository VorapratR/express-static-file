const express = require('express');
const app = express();
const PORT = 3000;

app.use('/static', express.static('public'))

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    getBlockScript()
    writeFileFromAPI()
});
function getBlockScript() {
    const axios = require('axios');
    axios.get('http://dev-cookie-consent.dosetech.co/api/cookie/1')
        .then(function (response) {
            if (response.status == 200) {
                let result = response.data.detail;
                let blackListScripts = [];
                for (let index = 0; index < result.blackListScripts.length; index++) {
                    blackListScripts.push(new RegExp(result.blackListScripts[index].trim()));
                }
                return blackListScripts
            }

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (error) {
            console.log(error);
        });

}
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