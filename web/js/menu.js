const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');

//show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})
//close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})
//change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

})

//cargar contenido al hacer clic en los enlaces del sidebar sin afectarla
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        cargarContenido(href);
    });
});
//Funcion cargar contenido 
function cargarContenido(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.right').innerHTML = html;
        })
        .catch(error => console.error('Error al cargar contenido: ', error));
}