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
// === PERBARUI FUNGSI INI DI script.js ===
function showImage(src, title) {
    var modalImage = document.getElementById('modalImage');
    var modalTitle = document.getElementById('imageModalLabel');
    
    // 1. Atur sumber dan judul
    modalImage.src = src;
    modalImage.alt = title;
    modalTitle.textContent = title;

    // 2. Tampilkan Modal secara eksplisit menggunakan JavaScript
    //    Kita harus membuat instance Modal terlebih dahulu.
    var imageModalElement = document.getElementById('imageModal');
    var imageModal = new bootstrap.Modal(imageModalElement);
    
    imageModal.show(); // Perintah untuk menampilkan Modal
}

// ===========================================
// FUNGSI PAGINASI GALERI FOTO
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Dapatkan semua elemen album foto
    const albums = document.querySelectorAll('.album-folder');
    
    // Keluar jika tidak ada album di halaman ini (penting untuk halaman lain)
    if (albums.length === 0) return; 

            //<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                        // ATUR PAGES DI BAWAH INI DI "const itemsPerPage = (number) <<< YANG DIGANTI"
    const itemsPerPage = 4; // <<< ATUR JUMLAH ALBUM PER HALAMAN DI SINI
    const totalPages = Math.ceil(albums.length / itemsPerPage);
    const paginationContainer = document.getElementById('gallery-pagination');
            //<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // A. Fungsi untuk Mengganti Halaman Tampilan
    function displayPage(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Iterasi melalui semua album
        albums.forEach((album, index) => {
            if (index >= startIndex && index < endIndex) {
                album.style.display = 'block'; // Tampilkan album pada halaman ini
            } else {
                album.style.display = 'none'; // Sembunyikan album lainnya
            }
        });

        // Update status tombol paginasi (Active Class)
        const pageLinks = paginationContainer.querySelectorAll('.page-item');
        pageLinks.forEach(link => link.classList.remove('active'));
        
        // Temukan dan aktifkan tombol yang sesuai
        const activeLink = paginationContainer.querySelector(`[data-page="${pageNumber}"]`).closest('.page-item');
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Gulir (Scroll) ke bagian atas Galeri setelah berpindah halaman
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const navbarHeight = 70; 
            const topPosition = gallerySection.offsetTop - navbarHeight;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    }

    // B. Fungsi untuk Membuat Tombol Paginasi
    function createPaginationButtons() {
        // Hapus tombol yang mungkin sudah ada
        paginationContainer.innerHTML = ''; 

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-item';
            
            // Halaman 1 aktif secara default
            if (i === 1) {
                li.classList.add('active'); 
            }

            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = i;
            a.setAttribute('data-page', i);

            // Tambahkan event listener untuk memanggil displayPage saat diklik
            a.addEventListener('click', function(e) {
                e.preventDefault(); 
                const page = parseInt(this.getAttribute('data-page'));
                displayPage(page);
            });

            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }

    // --- INISIALISASI ---
    createPaginationButtons();
    displayPage(1); // Tampilkan halaman pertama saat halaman dimuat
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
// FITUR KONTAK WHATS'APP (DIMODIFIKASI UNTUK KLIK & COPY)
document.addEventListener('DOMContentLoaded', function () {
    const contactList = document.querySelector('#contact .list-unstyled');
    if (!contactList) return; 
    if (contactList.querySelector('.whatsapp-contact')) return;

    // Data nomor & pesan
    const phone = '6283848307342'; //Hanya angka, tanpa '+' atau '-'
    const phoneDisplay = '+62 838-4830-7342'; // Nomor untuk ditampilkan
    const prefilled = 'Halo Stasi Santo Yosep Asembagus';
    const href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(prefilled);

    const li = document.createElement('li');
    li.className = 'whatsapp-contact d-flex align-items-center mb-1'; // Menggunakan flex untuk tata letak

    // === ELEMEN 1: IKON KLIK (Tautan WhatsApp) ===
    const iconLink = document.createElement('a');
    iconLink.href = href;
    iconLink.target = '_blank';
    iconLink.rel = 'noopener noreferrer';
    iconLink.className = 'text-decoration-none me-2'; // Margin kanan kecil
    iconLink.setAttribute('aria-label', 'Chat WhatsApp Gereja Santo Yosep');
    iconLink.innerHTML = '<i class="bi bi-whatsapp text-success fs-4" aria-hidden="true"></i>'; // Ikon lebih besar

    // === ELEMEN 2: TEKS COPY (Teks yang bisa disalin) ===
    const textSpan = document.createElement('span');
    textSpan.className = 'contact-text fw-bold';
    textSpan.textContent = 'WhatsApp: ' + phoneDisplay;

    li.appendChild(iconLink);
    li.appendChild(textSpan);
    contactList.appendChild(li);
});
// Inisialisasi peta dengan koordinat dari Google Maps
var map = L.map('map').setView([-7.7502331, 114.2268863], 15); 
// angka 15 = zoom level default

// Tambahkan tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
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
// Tambahkan marker di lokasi
var marker = L.marker([-7.7502331, 114.2268863]).addTo(map);
marker.bindPopup("<b>Gereja Katolik Stasi Santo Yosep</b><br>Asembagus, Situbondo").openPopup();
locations.forEach
(function(loc) 
{
  L.marker([loc.lat, loc.lng]).addTo(map)
    .bindPopup("<b>" + loc.name + "</b>");
});
L.control.layers(baseMaps).addTo(map);
// FITUR LAZY LOAD OTOMATIS
document.addEventListener('DOMContentLoaded', function() {
    // 1. Cari semua gambar di dalam album
    const images = document.querySelectorAll('.album-img');

    // 2. Berikan atribut loading="lazy" ke setiap gambar
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    console.log(images.length + " foto sekarang menggunakan Lazy Load.");
});