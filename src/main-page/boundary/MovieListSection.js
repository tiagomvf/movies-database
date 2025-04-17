import { html, render } from "lit-html";

const template = ({ title, options, selected, list }) => html`
<style>
:host {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto auto;
}

.first-row {
  grid-row:  1 / 2;
  justify-self: start;
  align-self: center;
}

.second-row {
  grid-row: 2 / 3;
}

.header {
  grid-column: 1 / 3;
}

.switcher {
  grid-column: 3 / 5;
}

.full-width {
  grid-column: 1 / -1;
}
</style>
  <h1 class="first-row header cds--type-productive-heading-04">${title}</h1>
  <cds-content-switcher class="first-row switcher" value=${selected}>
    ${[...options.entries()].map((entry) => html`
      <cds-content-switcher-item value=${entry[0]}>
        ${entry[1]}
      </cds-content-switcher-item>
    `
)}
  </cds-content-switcher>
  <tmdb-media-list class="second-row full-width" .list=${list}></tmdb-media-list>
  `
export class MovieListSection extends HTMLElement {

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.addEventListener(
      'cds-content-switcher-selected',
      (e) => {
        this._selected = e.detail.item.value;
        this.view();
      }
    );
  }

  connectedCallback() {
    this.view();
  }

  view() {
    const selected = this._selected || [...this.options.keys()][0];
    this.filter(selected).then(json => {
      render(template({ title: this.title, options: this.options, selected, list: json }), this.shadowRoot);
    });
  }

}

customElements.define('tmdb-movie-list-section', MovieListSection);
