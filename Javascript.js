// Registro de usuarios (simulación)
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    alert(`Usuario registrado:\nNombre: ${username}\nCorreo: ${email}`);
    window.location.href = "search.html";
});

// Búsqueda de oficios
const jobs = [
    { name: "Juan Perez", job: "Plomero", description: "Reparaciones de tuberías.", lat: -12.046374, lng: -77.042793 },
    { name: "Maria Gomez", job: "Carpintera", description: "Muebles a medida.", lat: -12.056374, lng: -77.052793 }
];

document.getElementById('searchBar')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = document.getElementById('results');
    results.innerHTML = "";

    jobs.filter(job => job.job.toLowerCase().includes(query)).forEach(job => {
        const li = document.createElement('li');
        li.textContent = `${job.name} - ${job.job}`;
        li.onclick = () => showProfile(job);
        results.appendChild(li);
    });
});

// Mostrar perfil del proveedor
function showProfile(provider) {
    localStorage.setItem('provider', JSON.stringify(provider));
    window.location.href = "profile.html";
}

// Cargar perfil con mapa
if (window.location.pathname.includes('profile.html')) {
    const provider = JSON.parse(localStorage.getItem('provider'));
    document.getElementById('providerName').textContent = provider.name;
    document.getElementById('description').textContent = provider.description;

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: provider.lat, lng: provider.lng },
        zoom: 15
    });

    new google.maps.Marker({
        position: { lat: provider.lat, lng: provider.lng },
        map
    });
}
