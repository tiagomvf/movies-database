import { freeToWatch } from "../control/MoviesStore.js";
import { MovieListSection } from "./MovieListSection.js";

class FreeToWatchList extends MovieListSection {
  constructor() {
    super();
    this.options = new Map([
      ["movie", "Filmes"],
      ["tv", "Na TV"],
    ]);
    this.title = "Grátis para Assistir";
    this.filter = freeToWatch;
  }
}
customElements.define("tmdb-free-to-watch-list", FreeToWatchList);
