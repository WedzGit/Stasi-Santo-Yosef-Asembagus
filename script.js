document.addEventListener('DOMContentLoaded', () => {
    // Tutup navbar saat tautan dipilih di mode mobile
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const isExpanded = navbarToggler?.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                navbarToggler.click();
            }
        });
    });

    // Tambahkan kontak email ke daftar kontak jika belum ada
    const contactList = document.querySelector('#contact .list-unstyled');
    if (!contactList || contactList.querySelector('.email-contact')) return;

    const emailAddress = 'stasisantoyosefasembagus@gmail.com';
    const subject = 'Permintaan Informasi dari Website Stasi';
    const body = 'Yth. Pengurus Stasi Santo Yosep Asembagus,\n\nSaya ingin menanyakan tentang...';
    const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const listItem = document.createElement('li');
    listItem.className = 'email-contact d-flex align-items-center mt-2';

    const iconLink = document.createElement('a');
    iconLink.href = mailtoHref;
    iconLink.className = 'text-decoration-none me-2';
    iconLink.setAttribute('aria-label', 'Kirim email ke Gereja Santo Yosep');
    iconLink.innerHTML = '<i class="bi bi-envelope-fill text-primary fs-4" aria-hidden="true"></i>';

    const textSpan = document.createElement('span');
    textSpan.className = 'contact-text fw-bold';
    textSpan.textContent = `Email: ${emailAddress}`;

    listItem.append(iconLink, textSpan);
    contactList.appendChild(listItem);
});
// ========================================
// FITUR PENGUMUMAN / BANNER BERJALAN
// ========================================

const ANNOUNCEMENT_SUPABASE_URL = 'https://bzonefscffqjcjktjyow.supabase.co';
const ANNOUNCEMENT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b25lZnNjZmZxamNqa3RqeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDg1MTksImV4cCI6MjA5OTI4NDUxOX0.WePI7E4qItEUt_QqvT-Kf0ugXcHi9Cwiznrc_riZ4z4';
document.addEventListener('DOMContentLoaded', async function () {
    const banner = document.getElementById('announcement-banner');
    const trackText = document.getElementById('announcement-text');
    const modal = document.getElementById('announcement-modal');
    const modalContent = document.getElementById('announcement-modal-content');
    const modalCloseBtn = document.getElementById('announcement-modal-close');

    if (!banner) return; // Jaga-jaga kalau elemen belum ada di halaman ini

    const supabaseAnnouncement = supabase.createClient(
        ANNOUNCEMENT_SUPABASE_URL,
        ANNOUNCEMENT_SUPABASE_ANON_KEY
    );

    // 1. Hapus dulu pengumuman yang sudah expired (auto-cleanup)
    await supabaseAnnouncement
        .from('announcements')
        .delete()
        .lt('expires_at', new Date().toISOString());

    // 2. Ambil pengumuman yang masih aktif (kalau ada)
    const { data: announcements, error } = await supabaseAnnouncement
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error || !announcements || announcements.length === 0) {
        return; // Tidak ada pengumuman aktif, banner tetap tersembunyi
    }

    const announcement = announcements[0];

    // 3. Tampilkan banner
    trackText.textContent = '📢 ' + announcement.running_text + '  —  Klik untuk lihat detail';
    banner.style.display = 'flex';
    document.body.classList.add('has-announcement');

    // 4. Klik banner untuk buka modal detail
    banner.addEventListener('click', function () {
        openAnnouncementModal(announcement);
    });

    function openAnnouncementModal(data) {
        modalContent.innerHTML = '';

        if (data.type === 'image') {
            const wrapper = document.createElement('div');
            wrapper.className = 'announcement-image-wrapper';

            const img = document.createElement('img');
            img.src = data.image_url;
            img.alt = data.running_text;

            img.addEventListener('click', function () {
                img.classList.toggle('zoomed');
            });

            wrapper.appendChild(img);
            modalContent.appendChild(wrapper);
        } else {
            const paper = document.createElement('div');
            paper.className = 'announcement-text-paper';
            paper.textContent = data.content_text;
            modalContent.appendChild(paper);
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeAnnouncementModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeAnnouncementModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeAnnouncementModal();
    });

    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'flex' && e.key === 'Escape') {
            closeAnnouncementModal();
        }
    });
});