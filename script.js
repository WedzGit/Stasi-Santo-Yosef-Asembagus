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
// Leaflet map removed — using Google Maps iframe with static overlay (no API key).