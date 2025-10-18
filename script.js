// ===================================================
// 1. بيانات الدورات (لإنشاء الـ Accordion)
// ===================================================
const certificationData = [
    { 
        ar: "خدمة العملاء (مسار 2)", en: "Customer Service (Track 2)", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 25 ساعة", "تاريخ الإصدار: 2025-09-26", "رقم الشهادة: d1dbdd07-7b89..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 25 hours", "Award Date: 2025-09-26", "Certificate No.: d1dbdd07-7b89..."] 
        } 
    },
    { 
        ar: "خدمة العملاء (مسار 1)", en: "Customer Service (Track 1)", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 18 ساعة", "تاريخ الإصدار: 2025-09-26", "رقم الشهادة: 46a17bd9-6207..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 18 hours", "Award Date: 2025-09-26", "Certificate No.: 46a17bd9-6207..."] 
        } 
    },
    { 
        ar: "مبادئ خدمة العملاء", en: "Customer Service Principles", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 13 ساعة", "تاريخ الإصدار: 2025-09-27", "رقم الشهادة: a1d622a1-5d22..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 13 hours", "Award Date: 2025-09-27", "Certificate No.: a1d622a1-5d22..."] 
        } 
    },
    { 
        ar: "دورة تأجير السيارات", en: "Car Rental Course", 
        details: { 
            ar: ["جهة الاعتماد: TBO Academy", "تاريخ الإصدار: 2025-09-17", "الاعتماد: دورة تدريبية"], 
            en: ["Accredited By: TBO Academy", "Award Date: 2025-09-17", "Accreditation: Training Course"] 
        } 
    },
    { 
        ar: "بيئة عمل صحية", en: "A Healthy Work Environment", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 5 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: 95bc9c2c-bd12..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 5 hours", "Award Date: 2025-09-24", "Certificate No.: 95bc9c2c-bd12..."] 
        } 
    },
    { 
        ar: "صناعة السياحة", en: "Tourism Industry", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 8 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: 168600de-3e0d..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 8 hours", "Award Date: 2025-09-24", "Certificate No.: 168600de-3e0d..."] 
        } 
    },
    { 
        ar: "كن قائداً", en: "Be a Leader", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 4 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: a2723ab0-0068..."], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 4 hours", "Award Date: 2025-09-24", "Certificate No.: a2723ab0-0068..."] 
        } 
    },
];

let currentLang = 'ar';
const langToggleBtn = document.getElementById('lang-toggle-btn');
const htmlElement = document.documentElement;

// ===================================================
// 2. وظيفة تبديل اللغة
// ===================================================

function updateLanguage(lang) {
    currentLang = lang;
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langToggleBtn.textContent = lang === 'ar' ? 'English | EN' : 'العربية | AR';
    
    // تحديث العناوين (Title)
    document.title = document.querySelector('title').getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');

    // تحديث النصوص (باستثناء القوائم)
    document.querySelectorAll('[data-ar]:not([data-ar-list])').forEach(element => {
        element.textContent = element.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
    });

    // تحديث القوائم (ul/li) بشكل خاص
    document.querySelectorAll('[data-ar-list]').forEach(element => {
        const listContent = element.getAttribute(lang === 'ar' ? 'data-ar-list' : 'data-en-list');
        const items = listContent.split('<li>').filter(item => item.trim() !== '').map(item => `<li>${item.replace(/<\/li>/g, '').trim()}</li>`).join('');
        element.innerHTML = items;
    });

    // إعادة بناء الدورات (Accordion) باللغة الجديدة
    renderCertifications();
}

langToggleBtn.addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage(newLang);
});

// ===================================================
// 3. وظيفة العداد الجبار (Counter-Up)
// ===================================================
const countUp = (targetElement, endValue, duration, suffix) => {
    let startValue = 0;
    const step = (endValue - startValue) / (duration / 10);
    const isDecimal = endValue % 1 !== 0;

    const timer = setInterval(() => {
        startValue += step;
        
        if (startValue >= endValue) {
            clearInterval(timer);
            startValue = endValue;
        }
        
        let displayValue;
        if (isDecimal) {
            displayValue = (Math.round(startValue * 10) / 10).toFixed(1);
        } else {
            displayValue = Math.floor(startValue);
        }
        
        targetElement.textContent = displayValue + suffix;
    }, 10);
};

// تشغيل العداد عند الظهور
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(1) .number'), 2, 2000, '+'); // 2+ سنوات
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(2) .number'), 3, 1500, '+'); // 3+ مشاريع
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(3) .number'), 71, 2000, ' ساعة'); // 71 ساعة تدريب
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(4) .number'), 20, 2500, '%'); // 20% تحسين
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.5 }); 

const impactDashboard = document.querySelector('.impact-dashboard');
if(impactDashboard) {
    statsObserver.observe(impactDashboard);
}

// ===================================================
// 4. حركة الظهور (Reveal on Scroll)
// ===================================================
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // تشغيل أشرطة المهارات عند الظهور
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.skill-bar').forEach(bar => {
                    const level = bar.getAttribute('data-level') + '%';
                    bar.style.width = level; 
                });
            }
        }
    });
}, { threshold: 0.1 }); 

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===================================================
// 5. شريط التنقل (Navbar Scroll Effect)
// ===================================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================================
// 6. إنشاء الدورات (Accordion)
// ===================================================

function renderCertifications() {
    const container = document.getElementById('certifications-accordion');
    container.innerHTML = ''; 

    certificationData.forEach((cert, index) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';

        const header = document.createElement('div');
        header.className = 'accordion-header';
        header.innerHTML = `${cert[currentLang]} <i class="fas fa-chevron-down"></i>`;
        header.setAttribute('data-index', index);
        
        const content = document.createElement('div');
        content.className = 'accordion-content';
        
        const ul = document.createElement('ul');
        cert.details[currentLang].forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });
        content.appendChild(ul);

        item.appendChild(header);
        item.appendChild(content);
        container.appendChild(item);
    });

    // إضافة منطق الفتح والإغلاق
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // إغلاق جميع الأقسام ما عدا الحالي
            document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
                    activeContent.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            // فتح أو إغلاق القسم الحالي
            content.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
}


// ===================================================
// 7. وظيفة توليد السيرة الذاتية (PDF Generation)
// ===================================================

document.getElementById('download-cv-btn').addEventListener('click', () => {
    // العناصر التي نريد تضمينها في الـ CV المختصر
    const elementsToCapture = ['#home', '#about', '#experience', '#skills', '#certifications'];
    const temporaryDiv = document.createElement('div');
    temporaryDiv.id = 'pdf-capture-temp';
    temporaryDiv.style.backgroundColor = '#ffffff'; 
    temporaryDiv.style.padding = '20px';
    temporaryDiv.style.maxWidth = '800px';
    temporaryDiv.style.margin = '0 auto';
    
    // نسخ المحتوى المختار وإجراء تعديلات CSS لتبسيط الـ PDF
    elementsToCapture.forEach(selector => {
        const originalElement = document.querySelector(selector);
        if (originalElement) {
            const clone = originalElement.cloneNode(true);
            
            // إزالة العناصر غير الضرورية من الـ PDF
            if (selector === '#home') {
                 clone.querySelector('.hero-content').style.background = 'none';
                 clone.querySelector('.hero-content').style.boxShadow = 'none';
                 clone.querySelector('.cta-buttons').style.display = 'none';
                 clone.querySelector('.profile-image').style.border = '2px solid #A900FF'; 
                 clone.querySelector('.tagline').style.color = '#A900FF';
                 clone.style.height = 'auto';
                 clone.style.padding = '20px 0';
                 clone.style.textAlign = 'center';
            }
            if (selector === '#skills') {
                // إظهار أشرطة المهارات بشكل ثابت (بدون انيميشن في الـ PDF)
                clone.querySelectorAll('.skill-bar').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-level') + '%';
                    bar.style.backgroundColor = '#A900FF'; // ملء اللون مباشرة
                    bar.style.height = '8px';
                });
            }
            if (selector === '#certifications') {
                // إظهار جميع محتويات الـ Accordion بشكل مفتوح
                clone.querySelectorAll('.accordion-header i').forEach(icon => icon.style.display = 'none');
                clone.querySelectorAll('.accordion-content').forEach(content => {
                    content.classList.add('active');
                    content.style.maxHeight = 'none';
                    content.style.padding = '15px 20px';
                });
            }

            // تعديلات عامة
            clone.querySelectorAll('.section-title').forEach(title => title.style.color = '#A900FF');
            clone.querySelectorAll('.timeline-marker').forEach(marker => marker.style.display = 'none');
            clone.querySelectorAll('.timeline-item ul li::before').forEach(dot => dot.style.color = '#A900FF'); 
            clone.querySelectorAll('.timeline-item h5').forEach(h5 => h5.style.color = '#A900FF');
            clone.classList.remove('reveal-on-scroll', 'visible');
            
            temporaryDiv.appendChild(clone);
        }
    });

    // إضافة Div المؤقت إلى الـ Body
    document.body.appendChild(temporaryDiv);
    
    // عملية التحويل إلى PDF
    const { jsPDF } = window.jspdf;
    
    html2canvas(temporaryDiv, { 
        scale: 2, 
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0); 
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps= pdf.getImageProperties(imgData);
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
        
        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        const filename = currentLang === 'ar' ? 'السيرة_الذاتية_عبدالعزيز_العنزي.pdf' : 'Abdulaziz_Al-Enazi_CV.pdf';
        pdf.save(filename);
        
        // إزالة العنصر المؤقت من الـ Body بعد الانتهاء
        document.body.removeChild(temporaryDiv);
    }).catch(error => {
        console.error('PDF Generation Error:', error);
        alert('عفواً، حدث خطأ أثناء توليد السيرة الذاتية. يرجى المحاولة لاحقاً.');
        document.body.removeChild(temporaryDiv);
    });
});

// ===================================================
// 8. تهيئة الموقع المبدئية
// ===================================================
window.onload = () => {
    // التأكد من أن اللغة الافتراضية هي العربية
    updateLanguage('ar');
    console.log('موقع عبدالعزيز الجبار يعمل بكامل طاقته!');
};
