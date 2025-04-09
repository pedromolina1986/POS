function stylesLinking(page, checkout) {
    // Detect if running on GitHub Pages            
    const isGitHubPages = window.location.hostname.includes("github.io");
        
    const basePath = isGitHubPages ? "/POS/" : "/";
    
    // Create a new link element
    let link = page.createElement("link");
    if (checkout) {
        link.rel = "stylesheet";
        link.href = basePath + "styles/checkout.css";
    }    
    page.head.appendChild(link);
    link = page.createElement("link");
    link.rel = "stylesheet";            
    link.href = basePath + "styles/styles.css";
    page.head.appendChild(link);
    link = page.createElement("link");
    link.rel = "stylesheet";
    link.href = basePath + "styles/logos.css";
    page.head.appendChild(link);
                    
    
    // Append it to the document head
    page.head.appendChild(link);
};

function linkingScripts(page) {
    // Detect if running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes("github.io");
        
    const basePath = isGitHubPages ? "/POS/" : "/";

    // Function to dynamically load scripts
    function loadScript(src) {
        const script = page.createElement("script");
        script.src = basePath + src;
        script.type = "text/javascript";
        script.defer = true; // Ensures scripts execute in order
        page.head.appendChild(script);
    }

    // Load header and footer scripts
    loadScript("components/header.js");
    loadScript("components/footer.js");
};

function dynamicScriptCall(page) 
 {
    // Detect if running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Automatically get the repository name from URL
    const pathParts = window.location.pathname.split('/');
    const repoName = pathParts[1] ? `/${pathParts[1]}/` : "/";

    // Set the correct base path
    const basePath = isGitHubPages ? repoName : "/";
    
    // Create and load the script dynamically
    const script = document.createElement("script");
    script.src = basePath + "scripts/scripts.js";
    script.type = "text/javascript";            
    document.body.appendChild(script);
};