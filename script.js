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
// Tambahkan fungsi ini di dalam document.addEventListener('DOMContentLoaded', ...) jika Anda menggunakannya
function showImage(src, title) {
    // 1. Dapatkan elemen gambar di dalam modal
    var modalImage = document.getElementById('modalImage');
    
    // 2. Dapatkan elemen judul di dalam modal
    var modalTitle = document.getElementById('imageModalLabel');
    
    // 3. Atur sumber (src) dan teks alternatif gambar
    modalImage.src = src;
    modalImage.alt = title;
    
    // 4. Atur judul di modal
    modalTitle.textContent = title;
    
    // Bootstrap Modal akan otomatis muncul karena data-bs-toggle di HTML
}
// ===========================================
// FUNGSI PAGINASI GALERI FOTO
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Dapatkan semua elemen album foto
    const albums = document.querySelectorAll('.album-folder');
    
    // Keluar jika tidak ada album di halaman ini (penting untuk halaman lain)
    if (albums.length === 0) return; 


                        // ATUR PAGES DI BAWAH INI DI "const itemsPerPage = (3) <<< YANG DIGANTI"
    const itemsPerPage = 5; // <<< ATUR JUMLAH ALBUM PER HALAMAN DI SINI
    const totalPages = Math.ceil(albums.length / itemsPerPage);
    const paginationContainer = document.getElementById('gallery-pagination');





    // ------------------------------------------
    // A. Fungsi untuk Mengganti Halaman Tampilan
    // ------------------------------------------
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
            // Memberi sedikit ruang dari navbar
            const navbarHeight = 70; 
            const topPosition = gallerySection.offsetTop - navbarHeight;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
    }

    // ------------------------------------------
    // B. Fungsi untuk Membuat Tombol Paginasi
    // ------------------------------------------
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
