import {html, render} from "lit-html";

import {template as listTemplate} from "./MediaCardListTemplate.js"

const urls = {
  tv : '/api/3/tv/popular',
  movie : '/api/3/movie/popular',
  in_theaters : '/api/3/movie/now_playing'
};

const template = (type, list) => html`
    <div style="display: flex; flex-direction: row;align-items: center; gap: 16px; padding: 20px">
        <h1 class="cds--type-productive-heading-04">Mais Populares</h1>
        <cds-content-switcher style="width: fit-content"
            value=${type}>
            <cds-content-switcher-item value="movie">Filmes</cds-content-switcher-item>
            <cds-content-switcher-item value="tv">Na TV</cds-content-switcher-item>
            <cds-content-switcher-item value="in_theaters">Nos Cinemas</cds-content-switcher-item>
        </cds-content-switcher>
    </div>
    ${listTemplate(type, list)}`
class PopularList extends HTMLElement {

  constructor() {
    super();
    if (!this.getAttribute("data-media-type")) {
      this.setAttribute("data-media-type", "movie");
    }
    this.addEventListener(
        "cds-content-switcher-selected",
        e => this.setAttribute("data-media-type", e.detail.item.value));
  }

  connectedCallback() { this.view(); }

  attributeChangedCallback(/*name, oldValue, newValue*/) { this.view(); }

  view() {
    const type = this.getAttribute("data-media-type");
    fetch(`${urls[type]}`)
        .then(response => response.json())
        .then(json => render(template(type, json.results), this));
  }

  static get observedAttributes() { return [ "data-media-type" ] }
}

customElements.define("tmdb-popular-list", PopularList);
