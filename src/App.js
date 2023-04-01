import API_KEY from "../key.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"

const template = x => html`<h1>${x.title}</h1>`;

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