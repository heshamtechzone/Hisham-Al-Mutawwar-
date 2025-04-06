document.addEventListener('DOMContentLoaded', function() {
    // شريط التنقل الثابت
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // قائمة الهاتف المحمول
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });

    // إرسال نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const telegramMessage = `رسالة جديدة من ${name} (${email}):\n\n${message}`;
        const telegramBotToken = 'YOUR_BOT_TOKEN';
        const telegramChatId = '201505076374';
        
        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(telegramMessage)}`)
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                        contactForm.style.display = 'block';
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
            });
    });

    // تحديث سنة حقوق النشر
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // تأثيرات التمرير
    function initAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        
        function checkPosition() {
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                
                if (position.top < window.innerHeight * 0.75 && position.bottom >= 0) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('load', checkPosition);
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);
        
        checkPosition();
    }
    
    initAOS();

    // تحميل الصور من Google Drive
    function loadDriveImages() {
        const driveImageIds = {
            profile: '15g-Du1zgKUodab4FKpUwMfbUod1Rx3xm',
            projects: [
                '15g3U82rx2Cm7eUCXIoWaUG9YwYO0wb2j',
                '15gJo-9I6bN7gzVyAOtu4XkfY_JMs2_GA',
                '15hJgB1BxKSMugTsCmmCNDaRpsFEqg0_y',
                '15imYHwjK5cxuaf4g9lbqiB-0nhnA1b_h'
            ]
        };
        
        // صورة الملف الشخصي
        const profileImage = document.getElementById('profile-image');
        if (profileImage && driveImageIds.profile) {
            profileImage.src = `https://drive.google.com/uc?export=view&id=${driveImageIds.profile}`;
        }

        // صور المشاريع
        const portfolioImages = document.querySelectorAll('.portfolio-item img');
        portfolioImages.forEach((img, index) => {
            if (driveImageIds.projects[index]) {
                img.src = `https://drive.google.com/uc?export=view&id=${driveImageIds.projects[index]}`;
            }
        });
    }

    loadDriveImages();
});