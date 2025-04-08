import { freeToWatch, popular, trendings } from "../control/MoviesStore";
import { MovieListSection } from "./MovieListSection";

class MainPage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const trending = new MovieListSection();
    trending.options = new Map([["day", "Hoje"], ["week", "Nesta Semana"]]);
    trending.title = "Tendências";
    trending.filter = trendings;
    this.shadowRoot.append(trending);

    const popular = new MovieListSection();
    popular.options = new Map([
      ["movie", "Filmes"],
      ["tv", "Na TV"],
      ["in_theaters", "Nos Cinemas"],
    ]);
    popular.title = "Mais Populares";
    const urls = {
      tv: '/api/3/tv/popular',
      movie: '/api/3/movie/popular',
      in_theaters: '/api/3/movie/now_playing'
    };
    popular.filter = (type) => fetch(`${urls[type]}`).then(response => response.json()).then(json => json.results);

    const free = new MovieListSection();
    free.options = new Map([
      ["movie", "Filmes"],
      ["tv", "Na TV"],
    ]);
    free.title = "Grátis para Assistir";
    free.filter = freeToWatch;
    this.shadowRoot.append(trending, popular, free);
  }

}

customElements.define("tmdb-main-page", MainPage);
