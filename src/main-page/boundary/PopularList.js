import { html, render } from "lit-html";
import { MovieListSection } from "./MovieListSection";
const urls = {
  tv: '/api/3/tv/popular',
  movie: '/api/3/movie/popular',
  in_theaters: '/api/3/movie/now_playing'
};

class PopularList extends MovieListSection {
  constructor() {
    super();
    this.options = new Map([
      ["movie", "Filmes"],
      ["tv", "Na TV"],
      ["in_theaters", "Nos Cinemas"],
    ]);
    this.title = "Mais Populares";

    this.filter = (type) => fetch(`${urls[type]}`).then(response => response.json()).then(json => json.results);
  }
}
customElements.define("tmdb-popular-list", PopularList);
