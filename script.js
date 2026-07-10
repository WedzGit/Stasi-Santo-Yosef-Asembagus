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