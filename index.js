const express = require('express');

const scrape = require('./scrape');


const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Scraping es Fun!'
    });
});

// /search/wandavision
// /search/juego de tronos
app.get('/api/search/:title', (req, res) => {
    scrape
        .searchMovies(req.params.title)
        .then(movies => {
            res.json(movies);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})