import { trendings } from "../control/MoviesStore.js";
import { MovieListSection } from './MovieListSection.js'

class TrendingList extends MovieListSection {
  constructor() {
    super();
    const o = new Map();
    o.set("day", "Hoje");
    o.set("week", "Nesta Semana");
    this.options = o;
    this.title = "Tendências";
    this.filter = (x) => trendings(x);
  }

}

customElements.define("tmdb-trending-list", TrendingList);
