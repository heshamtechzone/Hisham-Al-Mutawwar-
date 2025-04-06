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
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formSuccess.style.display = 'block';
                    formError.style.display = 'none';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('فشل إرسال الرسالة');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formError.style.display = 'block';
                
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'إرسال الرسالة';
            });
            
            e.preventDefault();
        });
    }

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
});