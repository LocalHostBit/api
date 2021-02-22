const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://zooqle.com/search?q=';
//const url = 'https://torrent-paradise.ml/api/search?q=';

function searchMovies(searchTerm) {
    return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const movies = [];
    
            const $ = cheerio.load(body);
            $('tbody > tr').each(function(i, element) {
                const $element = $(element);
                // Torrent Freak

                const $title = $element.find('.text-nowrap > a');
                const $magneturi = $element.find('td > ul > li').children('a').eq(1);
                const $size = $element.find('.prog-l');
                const $seeds = $element.find('.progress.prog.trans90 > .prog-green');
                const $peers = $element.find('.progress.prog.trans90 > .prog-yellow');

                // // Torrent Paradise
                // const $title = $element.find('tr > td > span');
                // const $urlmagnet = $element.find('tr > td > span > a');
                // const $size = $element.find('td[data-label="Size"]').toArray();
                // const $seeds = $element.find('td[data-label="Seed"]').toArray();
                // const $leech = $element.find('td[data-label="Leech"]').toArray();

                const movie = {
                    title: $title.text(),
                    magneturi: $magneturi.attr('href'),
                    size: $size.text(),
                    seeds: $seeds.text(),
                    peers: $peers.text()
                    //urimovie: $urimovie.attr('href')
                };
                movies.push(movie);
            });
            return movies;
        });
}    

module.exports = {
    searchMovies
};