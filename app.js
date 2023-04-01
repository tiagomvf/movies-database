import API_KEY from "./key.js"
import './app/src/App.js';
fetch(`https://api.themoviedb.org/3/movie/550\?api_key\=${API_KEY}`)
    .then(x => x.json).then(j => JSON.stringify(j));
