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