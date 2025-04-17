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
/**
 * @function
 * @param {Movie} movie
 * @returns {any}
 */
const template = (movie) => html`
<style>
:host {
  display: grid;
  gap: 2em;
  grid-template-columns: min-content auto;
}

:host > #poster {
}

#poster img {
  border-radius: 1em;
}

.facts {
  display: flex;
  flex-direction: row;
}

.facts > div:not(:first-child)::before {
  content: '•';
  padding: 0 .25em;
}
</style>

<div>
  <div id="poster">
    <img src=https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}>
    ${movie ? movie.id : nothing}
  </div>
</div>
<div>
  <h2>${movie.title} (${yearof(movie.release_date)})</h2>
  <div class="facts">
    <!-- TODO: get release date by country -->
    <div>${movie.release_date}</div>
    <div>${movie.genres.map(x => x.name).join(', ')}</div>
    <!-- TODO: use Intl to format duration -->
    <div>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m </div>
  </div >
  <div class="tagline">
    ${movie.tagline}
  </div>
  <div id="overview">
    <h3>Overview</h3>
    <p>${movie.overview}</p>
  </div>
</div>
  `

class MovieDetails extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() { }

  disconnectedCallback() { observer.disconnect(); }

  view(movie) {
    render(template(movie), this.shadowRoot);
    this.shadowRoot.appendChild(style);
  }

  async attributeChangedCallback() {
    const id = this.getAttribute("id");
    const movie = await fetch(`/api/3/movie/${id}`).then(r => r.json());
    console.log("chamou");
    this.view(movie);
  }

  static get observedAttributes() { return ["id"] }
}

customElements.define("tmdb-movie-details", MovieDetails);
