document.addEventListener('DOMContentLoaded', function() {
    // Tangkap semua tautan di dalam menu navigasi yang akan di-collapse
    var navLinks = document.querySelectorAll('.navbar-collapse .nav-link');

    // Tangkap tombol toggler
    var navbarToggler = document.querySelector('.navbar-toggler');

    // Tambahkan event listener untuk setiap tautan
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Periksa apakah menu navigasi sedang terbuka
            var isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Tutup menu navigasi dengan simulasi klik pada toggler
                navbarToggler.click();
            }
        });
    });
});
// FITUR KONTAK GMAIL/EMAIL OTOMATIS (DIMODIFIKASI UNTUK KLIK & COPY)
document.addEventListener('DOMContentLoaded', function () {
    const contactList = document.querySelector('#contact .list-unstyled');
    if (!contactList) return; 
    if (contactList.querySelector('.email-contact')) return;

    // Data Alamat Email, Subjek, dan Isi Pesan
    const emailAddress = 'stasisantoyosefasembagus@gmail.com'; 
    const subject = 'Permintaan Informasi dari Website Stasi'; 
    const body = 'Yth. Pengurus Stasi Santo Yosep Asembagus,\n\nSaya ingin menanyakan tentang...';
    
    const mailtoHref = 'mailto:' + emailAddress + 
                       '?subject=' + encodeURIComponent(subject) + 
                       '&body=' + encodeURIComponent(body);

    const li = document.createElement('li');
    li.className = 'email-contact d-flex align-items-center mt-2'; // Menggunakan flex untuk tata letak

    // === ELEMEN 1: IKON KLIK (Tautan Mailto) ===
    const iconLink = document.createElement('a');
    iconLink.href = mailtoHref;
    iconLink.className = 'text-decoration-none me-2';
    iconLink.setAttribute('aria-label', 'Kirim Email ke Gereja Santo Yosep');
    iconLink.innerHTML = '<i class="bi bi-envelope-fill text-primary fs-4" aria-hidden="true"></i>'; // Ikon lebih besar

    // === ELEMEN 2: TEKS COPY (Teks yang bisa disalin) ===
    const textSpan = document.createElement('span');
    textSpan.className = 'contact-text fw-bold';
    textSpan.textContent = 'Email: ' + emailAddress;

    li.appendChild(iconLink);
    li.appendChild(textSpan);
    contactList.appendChild(li);
});
// Inisialisasi peta dengan koordinat dari Google Maps (jika Leaflet tersedia)
if (typeof L !== 'undefined' && document.getElementById('map')) {
  var map = L.map('map').setView([-7.7502331, 114.2268863], 15); 
  // angka 15 = zoom level default

  // Tambahkan tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
  });

  // Custom icon untuk marker
  var customIcon = L.icon({
    iconUrl: 'img/styoseflogo.png', // ganti dengan path ikonmu
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Marker utama
  var marker = L.marker([-7.7502331, 114.2268863], {icon: customIcon}).addTo(map);
  marker.bindPopup("<b>Gereja Katolik Stasi Santo Yosep</b><br>Asembagus, Situbondo").openPopup();

  if (typeof locations !== 'undefined' && Array.isArray(locations)) {
    locations.forEach(function(loc) {
      L.marker([loc.lat, loc.lng]).addTo(map)
        .bindPopup("<b>" + loc.name + "</b>");
    });
  }

  if (typeof baseMaps !== 'undefined') {
    L.control.layers(baseMaps).addTo(map);
  }
}