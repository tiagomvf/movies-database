
const template = `
  <cds-header aria-label="Another Movie Database">
        <cds-header-menu-button button-label-active="Close menu"
            button-label-inactive="Open menu"></cds-header-menu-button>
        <cds-header-name href="/" prefix="AMDB">[Another Movie Database]</cds-header-name>
        <cds-header-nav menu-bar-label="IBM [Platform]">
          <cds-header-menu menu-label="Filmes" trigger-content="Filmes">
            <cds-header-menu-item href="/movie/">Populares</cds-header-menu-item>
            <cds-header-menu-item href="javascript:void 0">Em cartaz</cds-header-menu-item>
            <cds-header-menu-item href="javascript:void 0">Próximas estreias</cds-header-menu-item>
            <cds-header-menu-item href="javascript:void 0">Mais bem avaliados</cds-header-menu-item>
          </cds-header-menu>
            <cds-header-nav-item href="javascript:void 0">Séries</cds-header-nav-item>
            <cds-header-nav-item href="javascript:void 0">Pessoas</cds-header-nav-item>
            <cds-header-menu menu-label="Mais" trigger-content="Mais">
                <cds-header-menu-item href="javascript:void 0">Sub-link 1</cds-header-menu-item>
                <cds-header-menu-item href="javascript:void 0">Sub-link 2</cds-header-menu-item>
                <cds-header-menu-item href="javascript:void 0">Sub-link 3</cds-header-menu-item>
            </cds-header-menu>
        </cds-header-nav>
  </cds-header>
`;

class AppHeader extends HTMLElement {
  connectedCallback() { this.innerHTML = template; }
}

customElements.define('tmdb-app-header', AppHeader);
