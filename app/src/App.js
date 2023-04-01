import API_KEY from "../../key.js";
import { html, render } from "./libs/lit-html.js"

const template = ({title, poster_path, overview, release_date}) => html`
<h1>${title}</h1>
<dl>
    <dt>Release Date</dt>
    <dd>${release_date}</dd>
    <dt>Overview</dt>
    <dd>${overview}</dd>
    <dt>Poster</dt>
    <dd>
        <img src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${title}'s poster"></img>
    </dd>
</dl>
`;

class App extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        fetch(`https://api.themoviedb.org/3/movie/550\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => render(template(json), this));
    }
}
customElements.define("mdb-app", App);