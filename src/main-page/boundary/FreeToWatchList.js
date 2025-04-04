import { html, render } from "lit-html";

import { freeToWatch } from "../control/MoviesStore.js";

const template = (type, list) => html`
    <div style="display: flex; flex-direction: row;align-items: center; gap: 16px; padding: 20px">
        <h1 class="cds--type-productive-heading-04">Grátis para Assistir</h1>
        <cds-content-switcher style="width: fit-content"
          value=${type}>
            <cds-content-switcher-item value="movie">Filmes</cds-content-switcher-item>
            <cds-content-switcher-item value="tv">TV</cds-content-switcher-item>
        </cds-content-switcher>
    </div>
    <tmdb-media-list .list=${list}></tmdb-media-list>
    `
class FreeToWatchList extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (!this.getAttribute("data-media-type")) {
      this.setAttribute("data-media-type", "movie");
    }
    this.view();
    this.addEventListener(
      'cds-content-switcher-selected',
      (e) => { this.setAttribute('data-media-type', e.detail.item.value); });
  }
  connectedCallback() {
  }
  attributeChangedCallback(name, oldValue, newValue) { this.view(); }

  view() {
    const type = this.getAttribute("data-media-type");
    freeToWatch(type).then(json => render(template(type, json), this.shadowRoot));
  }

  static get observedAttributes() { return ["data-media-type"] }
}

customElements.define("tmdb-free-to-watch-list", FreeToWatchList);
