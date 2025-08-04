import { html, nothing, render } from "lit-html";
import "../entity/type.js"
/**
 * @param {string} date
 * @returns {string}
 */
function yearof(dateStr) {
  const date = new Date(dateStr);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  return year;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const formated = new Intl.DateTimeFormat(navigator.languages || ['en-US'], { dateStyle: "medium" }).format(date);
  return formated;
}
/**
 * @function
 * @param {Movie} movie
 * @returns {any}
 */
const template = (movie, crew, release_date, country) => html`
<style>
:host {
  display: grid;
  gap: 1em;
  grid-template: subgrid;
}

:host > #poster {
  grid-column: 2/6;
}

:host > #poster > img {
  width: 100%;
  border-radius: 1em;
}
:host > #details {
  padding: 2em 0;
  gap: 1em;
  display: flex;
  flex-direction: column;
  grid-column: 6/-2;
}

.facts {
  display: flex;
  flex-direction: row;
}

.facts > div:not(:first-child)::before {
  content: '•';
  padding: 0 .25em;
}

.overview {}

.tagline {
  opacity: 70%;
  font-style: italic;
}
.crew {
  display: grid;
  grid-auto-flow: column;
  width: 100%;
}

.crew > div { }

.crew .name {
  font-weight: 600;
}
</style>

<div id="poster">
  <img src=https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}>
</div>
  <!-- TODO: List providers -->
<div id="details">
  <!-- TODO: Add age indication -->
  <h2>${movie.title} (${yearof(release_date)})</h2>
  <div class="facts">
    <!-- TODO: get release date by country -->
    <!-- TODO: what format will be used? -->
    <div>${formatDate(release_date)} (${country})</div>
    <div>${movie.genres.map(x => x.name).join(', ')}</div>
    <!-- TODO: use Intl to format duration-->
    <div>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m </div>
  </div>
  <div class="user-score">
    ${movie.vote_average} <!-- TODO: create component -->
  </div>
  <div class="tagline">
    ${movie.tagline}
  </div>
  <div class="overview">
    <h3>Overview</h3>
    <p>${movie.overview}</p>
  </div>
  <div class='crew'>
    ${crew.map(x => html`
      <div>
      <div class='name'>${x.name}</div>
      <div class='cds--type-expressive-heading-04 job'>${x.job}</div>
      </div>
    `)}
  </div>
</div >
  `

class MovieDetails extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() { }

  disconnectedCallback() { }

  view(movie, crew, release_date, country) {
    render(template(movie, crew, release_date, country), this.shadowRoot);
    // this.shadowRoot.appendChild(style);
  }

  async attributeChangedCallback() {
    const id = this.getAttribute("id");

    const promises = await Promise.all([
      fetch(`/api/3/movie/${id}`).then(r => r.json()),
      fetch(`/api/3/movie/${id}/credits`).then(r => r.json()),
      fetch(`/api/country`).then(r => r.text()),
      fetch(`/api/3/movie/${id}/release_dates`).then(r => r.json()),
    ]
    );
    const movie = promises[0];
    // TODO: Discover and implement rules to select crew to be shown
    const crew = promises[1].crew.filter(x => ['Novel', 'Director'].includes(x.job));
    const country = promises[2];
    const release_date = promises[3]
    .results.filter(x => x.iso_3166_1 == country)[0]
    .release_dates.filter(x => x.type == 3)[0].release_date;
    
    console.log(JSON.stringify(release_date));
    // todo: add classification - faixa indicativa
    this.view(movie, crew, release_date, country);
  }

  static get observedAttributes() { return ["id"] }
}

customElements.define("tmdb-movie-details", MovieDetails);
