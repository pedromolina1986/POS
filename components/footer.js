/*
STYLES in styles.css
*/

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
          <div class="footer">
            <div class="footerSocialMedias">
                <a href="https://www.facebook.com/pedro.molina.353803" class="fa fa-facebook"></a>
                <a href="https://www.google.com/search?q=pedro+henrique+kuckak+molina&sca_esv=23cc6f897c9df544&sxsrf=AHTn8zqP12f1NuzNXk5Px9Lslo3gcX3gIg%3A1740778603880&source=hp&ei=ayzCZ4niMuX00PEP44arqQs&iflsig=ACkRmUkAAAAAZ8I6e-krzznyHID6VfVb5BjnE6oPu0z-&oq=pedro&gs_lp=Egdnd3Mtd2l6IgVwZWRybyoCCAAyBBAjGCcyBBAjGCcyCBAuGIAEGLEDMggQABiABBixAzILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMggQABiABBixAzIIEC4YgAQYsQMyCBAAGIAEGLEDMggQLhiABBixA0i4DlCKBFjFB3ABeACQAQCYAVKgAfECqgEBNbgBA8gBAPgBAZgCBqAClQOoAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICCxAuGIAEGNEDGMcBwgIOEC4YgAQYsQMY0QMYxwHCAg4QLhiABBixAxiDARiKBcICBRAAGIAEwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxjJA8ICCxAAGIAEGJIDGIoFmAML8QUVYEw7jYPSqJIHATagB5hG&sclient=gws-wiz"
                    class="fa fa-google"></a>
                <a href="https://www.linkedin.com/in/pedro-molina-pono/" class="fa fa-linkedin"></a>
                <a href="https://www.instagram.com/pedro.kuchak/" class="fa fa-instagram"></a>
                <a href="https://github.com/pedromolina1986" class="fa fa-github"></a>

            </div>
            <div class="footerCopyright">
                <span>Copyright 2025</span>
            </div>

        </div>
        `;
  }
}


customElements.define('footer-component', Footer);