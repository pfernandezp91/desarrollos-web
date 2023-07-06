class BHeader extends HTMLElement {
  constructor() {
    super();

    // Crear el shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    const siteTitle = (this.getAttribute('site-title') !== null ? this.getAttribute('site-title') : 'FrameworkScript' );
    const bgColor = (this.getAttribute('bg-color') !== null ? this.getAttribute('bg-color') : '#E0E0E0' );
    const textColor = (this.getAttribute('text-color') !== null ? this.getAttribute('text-color') : '#000000' );
    const titleShow = (this.getAttribute('title-show') == 'none') ? false : true;
    const logoType = (this.getAttribute('site-logo') !== null ? this.getAttribute('site-logo') : '' );
    let logo = '';

    // Cargar el logo específico según el atributo site-logo
    switch (logoType) {
      case 'logo-1':
        logo = 'logo1.png';
        break;
      case 'logo-2':
        logo = 'logo2.png';
        break;
      case 'logo-3':
        logo = 'logo3.png';
        break;
      default:
        logo = 'logo.png';
        break;
    }

    // Función para obtener las dimensiones de la imagen
    const getImageDimensions = (src, callback) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        callback(width, height);
      };
      img.src = src;
    };

    // Función para determinar si la imagen es horizontal, vertical o cuadrada
    const getImageOrientation = (width, height) => {
      if (width > height) {
        return 'horizontal';
      } else if (height > width) {
        return 'vertical';
      } else {
        return 'square';
      }
    };

    // Obtener dimensiones y orientación de la imagen
    getImageDimensions(`../../assets/img/logos/${logo}`, (width, height) => {
      const imageOrientation = getImageOrientation(width, height);

      // Crear el template y clonarlo en el shadow root
      const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="../components/css/grids.css">
        <link rel="stylesheet" href="../components/css/header.css">
        <header class="navbar-light header-sticky">
          <nav class="navbar navbar-expand-xl" style="color: ${textColor}; background-color: ${bgColor}">
              <div class="container">
                  <a class="navbar-brand navbar-brand-${imageOrientation}" href="./">
                      <img class="dark-mode-item navbar-brand-item" src="../../assets/img/logos/${logo}" alt="${siteTitle}" />
                      ${ titleShow ? '<span class="ms-2">' + siteTitle + '</span>' : '' }
                  </a>
              </div>
          </nav>
        </header>
      `;

      shadow.appendChild(template.content.cloneNode(true));
    });
  }
}
// Definir el componente b-header
customElements.define('b-header', BHeader);

class BContent extends HTMLElement {
    constructor() {
      super();
  
      // Crear el shadow root
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Crear el template y clonarlo en el shadow root
      const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="../components/css/content.css">
        <div class="bd-content ps-lg-4 px-lg-4 py-4 py-lg-5 overflow-auto">
            <slot name="superior"></slot>  
            <slot name="content"></slot>
            <slot name="inferior"></slot>
        </div>
      `;
      shadow.appendChild(template.content.cloneNode(true));
    }
}
// Definir el componente b-content
customElements.define('b-content', BContent);
  
class BFooter extends HTMLElement {
    constructor() {
      super();
  
      // Crear el shadow root
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Crear el template y clonarlo en el shadow root
      const template = document.createElement('template');
      template.innerHTML = `
        <link rel="stylesheet" href="../components/css/grids.css">
        <link rel="stylesheet" href="../components/css/footer.css">
        <footer class="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
          <div class="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
            <div class="row">
              <div class="col-12 mb-3">
                <a class="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/" aria-label="Bootstrap">
                  <span class="fs-5">${this.getAttribute('site-title')}</span>
                </a>
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </footer>
      `;
  
      shadow.appendChild(template.content.cloneNode(true));
    }
}
// Definir el componente b-footer
customElements.define('b-footer', BFooter);