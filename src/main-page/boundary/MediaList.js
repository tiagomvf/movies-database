import "./MovieCard.js"

import { html, render } from "lit-html";

const calcDate =
  ({ release_date, first_air_date }) => {
    const date = Date.parse(release_date ? release_date : first_air_date);
    const languages = navigator.languages || ['en-US'];
    return new Intl.DateTimeFormat(languages, { dateStyle: "medium" })
      .format(date);
  }

const template = (list) => html`
<style>
:host {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(10%, 1fr);
  grid-template-rows: auto 1fr;
  gap: 1em;
  overflow-x: auto;
  scrollbar-width: thin;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
}

tmdb-movie-list-item {
  max-width: 100%;
  display: grid;
  grid-template-rows: subgrid;
}
:host > * {
  scroll-snap-align: start;
}
</style>
${list.map(({ title, name, release_date, first_air_date, ...rest }) => ({
  title: title ? title : name,
  release_date: calcDate({ release_date, first_air_date }),
  ...rest
}))
    .map(({ id, title, poster_path, overview, release_date }) => html`
        <tmdb-movie-list-item
          data-id=${id}
          data-title=${title}
          data-poster_path=${poster_path}
          data-overview=${overview}
          data-release_date=${release_date}
        ></tmdb-movie-list-item>
    `)}
`

class MediaList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._list = [];
    this.view();
  }

  set list(val) {
    this._list = val;
    this.view();
  }

  get list() { return this._list; }
  view() {
    render(template(this.list), this.shadowRoot);
  }

}

customElements.define("tmdb-media-list", MediaList);
