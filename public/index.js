document.addEventListener('DOMContentLoaded', () => {
async function renderRoute(path) {
    const contentDiv = document.getElementById('content');
    let htmlFile;

    switch (path) {
        case '/':
            htmlFile = '/pages/home.html';
            break;
        case '/about':
            htmlFile = '/pages/about.html';
            break;
        case '/contact':
            htmlFile = '/pages/contact.html';
            break;
        default:
            htmlFile = '/pages/404.html';
            break;
    }

    try {
        const response = await fetch(htmlFile);
        if (response.ok) {
            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('#content').innerHTML;

            contentDiv.innerHTML = newContent;
        } else {
            contentDiv.innerHTML = '<h1>404 Not Found</h1>';
        }
    } catch (error) {
        contentDiv.innerHTML = '<h1>Error loading page</h1>';
    }

    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function handleNavigation(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    
    window.history.pushState({}, '', path);
    renderRoute(path);
}

document.querySelectorAll('nav a[data-route]').forEach(link => {
    link.addEventListener('click', handleNavigation);
});

window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
});

renderRoute(window.location.pathname);
});
