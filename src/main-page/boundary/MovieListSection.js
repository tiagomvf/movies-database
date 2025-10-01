import { html, render } from "lit-html";

const template = ({ title, options, selected, list }) => html`
<style>
:host {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto auto;
}

.first-row {
  grid-row:  1 / 2;
  justify-self: start;
  align-self: center;
  display: flex;
  gap: calc(var(--cds-grid-gutter) / 2);
}

.second-row {
  grid-row: 2 / 3;
  gap: calc(var(--cds-grid-gutter) / 2);
}

.header {
}

.switcher {
  justify-self: start;
  align-self: center;
}

.full-width {
}
</style>
  <div class="first-row">
    <h1 class="cds--type-productive-heading-04">${title}</h1>
    <cds-content-switcher class="switcher" value=${selected}>
      ${[...options.entries()].map((entry) => html`
        <cds-content-switcher-item value=${entry[0]}>
          ${entry[1]}
        </cds-content-switcher-item>
      `
      )}
    </cds-content-switcher>
  </div>
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
