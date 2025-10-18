// دوال التفاعل والتأكد من عمل العناصر

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------
    // 1. الدالة المسؤولة عن تبديل اللغة (احترافي جداً)
    // ---------------------------------------------------
    const langSwitchBtn = document.getElementById('lang-switch');
    const htmlElement = document.documentElement;

    // محتوى وهمي متعدد اللغات
    const translations = {
        'ar': {
            'h1': 'عبدالعزيز',
            'h2': 'خبير في قيادة الابتكار والتوسع التكنولوجي',
            'tag-line': 'أُحوّل الاستراتيجيات الجريئة إلى نتائج رقمية ملموسة. خبرة 12 عاماً في قيادة نمو الأداء والتحول المؤسسي.',
            'switch-text': 'English | EN',
            'dir': 'rtl',
            'font': 'Cairo'
            // يجب إضافة جميع النصوص هنا لكي يعمل التبديل
        },
        'en': {
            'h1': 'Abdulaziz',
            'h2': 'Expert in Leading Innovation & Tech Expansion',
            'tag-line': 'I transform bold strategies into tangible digital results. 12 years experience in driving performance growth and corporate transformation.',
            'switch-text': 'العربية | AR',
            'dir': 'ltr',
            'font': 'Montserrat'
        }
    };

    const switchLanguage = (lang) => {
        const data = translations[lang];
        
        // تغيير الاتجاه والخط (RTL/LTR)
        htmlElement.lang = lang;
        htmlElement.dir = data.dir;
        document.body.style.fontFamily = lang === 'ar' ? 'var(--font-ar)' : 'var(--font-en)';

        // تحديث المحتوى (هنا تحتاج لإضافة المزيد منSelectors)
        document.querySelector('.hero-content h1').textContent = data.h1;
        document.querySelector('.hero-content h2').textContent = data.h2;
        document.querySelector('.tag-line').textContent = data['tag-line'];
        langSwitchBtn.textContent = data['switch-text'];
        
        // تحديث زر تبديل اللغة
        langSwitchBtn.dataset.lang = lang === 'ar' ? 'en' : 'ar';
    };

    langSwitchBtn.addEventListener('click', () => {
        const currentLang = langSwitchBtn.dataset.lang;
        switchLanguage(currentLang);
    });

    // ---------------------------------------------------
    // 2. تأكيد عمل زر تحميل السيرة الذاتية
    // ---------------------------------------------------
    const downloadBtn = document.getElementById('download-cv-btn');
    downloadBtn.addEventListener('click', (e) => {
        // تأكد من أن الرابط صحيح ويشير إلى ملف موجود فعلياً
        if (downloadBtn.getAttribute('href') === '#') {
            e.preventDefault(); // منع التحميل إذا كان الرابط غير صحيح
            alert('عفواً، ملف السيرة الذاتية غير متوفر حالياً. سيتم توفيره قريباً!');
        } else {
            console.log('جاري التحميل... (تأكد من وجود الملف PDF)');
            // هنا يجب أن يبدأ المتصفح بتحميل ملف CV_2025.pdf
        }
    });

    // ---------------------------------------------------
    // 3. تأكيد عمل نموذج "تواصل معي"
    // ---------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // **ملاحظة للمبرمج:** هنا يجب دمج النموذج بخدمة Backend (مثل Formspree أو Netlify Forms) 
        // أو استخدام تقنيات مثل AJAX لإرسال البيانات للخادم.
        
        alert('شكراً لك يا عبد العزيز، تم إرسال الرسالة بنجاح (هذا تنبيه وهمي).');
        contactForm.reset();
        
        // للتأكد من أن البريد يعمل كاحتياطي، يجب التأكد من عمل الـ mailto: في ملف HTML
    });

    // ---------------------------------------------------
    // 4. تأثيرات الإبهار (ظهور الأقسام عند التمرير)
    // ---------------------------------------------------
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // نسبة 10% من العنصر مرئية
    });

    elementsToReveal.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
});
