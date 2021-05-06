const express = require('express');
const app = express();
const PORT = 3000;

// app.use('/static', express.static('public'))
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    getBlockScript()
});
app.get('/', function (req, res) {
    res.send('user ' + req.params.id)
})
function getBlockScript() {
    const axios = require('axios');
    axios.get('http://dev-cookie-consent.dosetech.co/api/cookie/2')
        .then(function (response) {
            if (response.status == 200) {
                let result = response.data.detail;
                let blackListScripts = [];
                for (let index = 0; index < result.blackListScripts.length; index++) {
                    blackListScripts.push(
                        new RegExp(result.blackListScripts[index].trim())
                    );
                }

                writeFileFromAPI(blackListScripts)
            }
        })
        .catch(function (error) {
            console.log(error);
        })

}
function writeFileFromAPI(blackListScripts) {
    if (blackListScripts) {
        // blackListScripts.push(/www\.googletag\.com/)
        fs = require('fs');
        let data = ` window.YETT_BLACKLIST = [${blackListScripts}]`
        console.log(data);
        fs.writeFile('./public/js/yettBlackList.js', `${data}`, (err) => {
            if (err) return console.log(err);
            console.log('writeFileFromAPI sucesss !!');
        });
    }
}