import { html, render } from "lit-html";

class Router extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.routes = new Map();
    this.currentRoute = "/";
  }

  connectedCallback() {
    this.setupRoutes();
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }

  setupRoutes() {
    // Main page route
    this.routes.set("/", () => {
      import("./main-page/index.js").then(() => {
        render(html`<tmdb-main-page class="cds--css-grid"></tmdb-main-page>`, this.shadowRoot);
      });
    });

    // Movie details route
    this.routes.set("/movie/:id", (params) => {
      import("./movie/index.js").then(() => {
        const movieDetails = document.createElement("tmdb-movie-details");
        movieDetails.className = "cds--css-grid";
        movieDetails.setAttribute("id", params.id);
        render(html`${movieDetails}`, this.shadowRoot);
      });
    });
  }

  navigate(path) {
    // Handle root path
    if (path === "/" || path === "") {
      this.currentRoute = "/";
      this.routes.get("/")();
      return;
    }

    // Handle movie details path
    const movieMatch = path.match(/^\/movie\/(\d+)$/);
    if (movieMatch) {
      this.currentRoute = `/movie/${movieMatch[1]}`;
      this.routes.get("/movie/:id")({ id: movieMatch[1] });
      return;
    }

    // Default to main page for unknown routes
    this.currentRoute = "/";
    this.routes.get("/")();
  }

  goTo(path) {
    window.history.pushState({}, "", path);
    this.navigate(path);
  }
}

customElements.define("tmdb-router", Router);

export { Router };
