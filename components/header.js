/*
STYLES in styles.css
*/

const baseUrl = window.location.origin.includes("github.io") 
    ? "/POS/" 
    : "/";

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="header">           
            <div>
                <div id="bars" class="bars" onClick="openMenuLeft()">
                    <div></div>
                    <div></div>
                    <div></div>                                        
                </div>                
            </div>
            <div id="menuLeft" class="menuLeft">
              <span><a href="${baseUrl}index.html">Checkout</a></span>
              <span><a href="${baseUrl}pages/admin.html">Settings</a></span>              
            </div>
            <div class="logo">
                <span>Pos.</span>
            </div>           
        </div>
      `;
  }
}

function openMenuLeft() {
  const menuLeft = document.getElementById('menuLeft')
  // get all rendered styles
  const styles = window.getComputedStyle(menuLeft)
  if (styles.visibility == "hidden") {
    document.getElementById("menuLeft").style.visibility = "visible";
  }
  else {
    document.getElementById("menuLeft").style.visibility = "hidden";
  }
}

//CLICK AWAY LISTENER TO CLOSE THE MENU WHEN CLICK OUTSIDE
document.addEventListener("click", (evt) => {
  const menuLeft = document.getElementById("menuLeft");
  const bars = document.getElementById("bars");
  let targetEl = evt.target; // clicked element      
  do {
    if(targetEl == menuLeft || targetEl == bars ) {      
      return;
    }    
    targetEl = targetEl.parentNode;
  } while (targetEl);  
  menuLeft.style.visibility ="hidden";
});

customElements.define('header-component', Header);