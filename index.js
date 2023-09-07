const https = require('https')
const http = require('http')
const express = require('express')
const path = require('path')

const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log('Up and running'))

app.post('/api/getPlayerStats', (req, res) => {
    if (!req.body.name) return 
    const url = `https://api.hypixel.net/player?key=e3b99e50-48a4-4aa5-9974-8503989cdc41&name=${req.body.name}`; // Replace with the URL you want to request

    https.get(url, (response) => {
        let data = '';

        // A chunk of data has been received
        response.on('data', (chunk) => {
            data += chunk;
            // fs.writeFile('updated.json', data, 'utf8', err => {
            //     if(err) console.error(err)
            // })
        });

        // The whole response has been received
        response.on('end', () => {
            try {
                dataParsed = JSON.parse(data)
                reply = JSON.stringify(dataParsed.player.stats.Bedwars)
                res.json(reply);
            } catch(e)  {
                res.send(e)
            }
        });
    }).on('error', (error) => {
        res.send(`Error: ${error.message}`)
        console.error(`Error: ${error.message}`);
    });
});
// getPlayerData("itsmurple")
 
// const result = fs.readFileSync('updated.json', {encoding: 'utf-8'});

// data = JSON.parse(result)

// console.log(data.player.stats.Bedwars.Experience / 5000)
// console.log(data.player.stats.Bedwars.final_kills_bedwars / data.player.stats.Bedwars.final_deaths_bedwars)

