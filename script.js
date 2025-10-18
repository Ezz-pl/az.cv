// ===================================================
// 1. بيانات الدورات (لإنشاء الـ Accordion) - تم إدراج رقم الشهادة كاملاً
// ===================================================
const certificationData = [
    { 
        ar: "خدمة العملاء (مسار 2)", en: "Customer Service (Track 2)", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 25 ساعة", "تاريخ الإصدار: 2025-09-26", "رقم الشهادة: d1dbdd07-7b89-4bel-893c-10c194015d01"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 25 hours", "Award Date: 2025-09-26", "Certificate No.: d1dbdd07-7b89-4bel-893c-10c194015d01"] 
        } 
    },
    { 
        ar: "خدمة العملاء (مسار 1)", en: "Customer Service (Track 1)", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 18 ساعة", "تاريخ الإصدار: 2025-09-26", "رقم الشهادة: 46a17bd9-6207-4979-8112-00a589e2c62e"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 18 hours", "Award Date: 2025-09-26", "Certificate No.: 46a17bd9-6207-4979-8112-00a589e2c62e"] 
        } 
    },
    { 
        ar: "مبادئ خدمة العملاء", en: "Customer Service Principles", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 13 ساعة", "تاريخ الإصدار: 2025-09-27", "رقم الشهادة: a1d622a1-5d22-4901-89ff-a95a6b434297"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 13 hours", "Award Date: 2025-09-27", "Certificate No.: a1d622a1-5d22-4901-89ff-a95a6b434297"] 
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
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 5 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: 95bc9c2c-bd12-4da6-b300-7d4dbl105fc3"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 5 hours", "Award Date: 2025-09-24", "Certificate No.: 95bc9c2c-bd12-4da6-b300-7d4dbl105fc3"] 
        } 
    },
    { 
        ar: "صناعة السياحة", en: "Tourism Industry", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 8 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: 168600de-3e0d-4ba8-a704-4d73cadf3857"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 8 hours", "Award Date: 2025-09-24", "Certificate No.: 168600de-3e0d-4ba8-a704-4d73cadf3857"] 
        } 
    },
    { 
        ar: "كن قائداً", en: "Be a Leader", 
        details: { 
            ar: ["جهة الاعتماد: هدف (دروب)", "عدد الساعات: 4 ساعات", "تاريخ الإصدار: 2025-09-24", "رقم الشهادة: a2723ab0-0068-4455-8954-250d111dd611"], 
            en: ["Accredited By: HADAF (Doroob)", "Hours: 4 hours", "Award Date: 2025-09-24", "Certificate No.: a2723ab0-0068-4455-8954-250d111dd611"] 
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
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(1) .number'), 3, 2000, '+'); // 3+ سنوات
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(2) .number'), 3, 1500, '+'); // 3+ مشاريع
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(3) .number'), 71, 2000, ' ساعة'); // 71 ساعة تدريب
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(4) .number'), 94, 2500, '%'); // 94% إتمام
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
            // تشغيل أشرطة المهارات عند الظهور (تفاعلي)
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.skill-bar').forEach(bar => {
                    const level = bar.getAttribute('data-level') + '%';
                    // يتم تحريك شريط التقدم عبر الـ CSS
                    bar.style.setProperty('--skill-width', level);
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
    // العناصر التي نريد تضمينها في الـ CV المختصر (تعديل جذري)
    // طباعة الأقسام الأساسية فقط لضمان الاختصار
    const elementsToCapture = ['#home', '#experience', '#skills', '#contact-info']; 
    const temporaryDiv = document.createElement('div');
    temporaryDiv.id = 'pdf-capture-temp';
    temporaryDiv.style.backgroundColor = '#ffffff'; 
    temporaryDiv.style.padding = '20px';
    temporaryDiv.style.maxWidth = '800px'; 
    temporaryDiv.style.margin = '0 auto';
    
    // نسخ المحتوى المختار وإجراء تعديلات CSS لتبسيط الـ PDF (يضمن طباعة مختصرة)
    elementsToCapture.forEach(selector => {
        const originalElement = document.querySelector(selector);
        if (originalElement) {
            const clone = originalElement.cloneNode(true);
            
            // تعديلات لنسخة الـ PDF
            clone.style.padding = '10px 0'; // تقليل الفراغات
            clone.classList.remove('reveal-on-scroll', 'visible');
            
            // تخصيص قسم المقدمة (إزالة الأزرار والنبذة الطويلة)
            if (selector === '#home') {
                 clone.querySelector('.hero-content').style.background = 'none';
                 clone.querySelector('.hero-content').style.boxShadow = 'none';
                 clone.querySelector('.cta-buttons').style.display = 'none';
                 clone.querySelector('.profile-image').style.border = '2px solid #A900FF'; 
                 clone.querySelector('.hero-contact-info').style.color = '#000000'; // جعلها سوداء
                 clone.style.height = 'auto';
                 clone.style.textAlign = 'center';
                 
                 // إضافة النبذة القصيرة التي كانت موجودة في الـ Hero للموقع المباشر
                 const shortDesc = document.createElement('p');
                 shortDesc.textContent = document.querySelector('#home .description').textContent;
                 shortDesc.style.color = '#555';
                 shortDesc.style.maxWidth = '500px';
                 shortDesc.style.margin = '10px auto 0';
                 clone.querySelector('.hero-content').appendChild(shortDesc);
            }
            // تخصيص قسم المهارات
            if (selector === '#skills') {
                clone.querySelectorAll('.skill-bar').forEach(bar => {
                    // إظهار الشريط باللون الأرجواني مباشرة
                    bar.style.width = bar.getAttribute('data-level') + '%';
                    bar.style.backgroundColor = '#A900FF'; 
                    bar.style.height = '8px';
                });
            }
            // تخصيص قسم معلومات الاتصال
            if (selector === '#contact-info') {
                clone.querySelectorAll('.contact-item').forEach(item => {
                    item.style.backgroundColor = '#f4f4f4'; // خلفية فاتحة للبطاقة
                    item.style.color = '#000';
                });
            }
            
            // تعديلات عامة
            clone.querySelectorAll('.section-title').forEach(title => {
                title.style.color = '#A900FF';
                title.style.borderBottom = '2px solid #A900FF';
            });
            clone.querySelectorAll('.timeline-marker').forEach(marker => marker.style.display = 'none');
            clone.querySelectorAll('.timeline-item ul li::before').forEach(dot => dot.style.color = '#A900FF'); 
            clone.querySelectorAll('.timeline-item h5').forEach(h5 => h5.style.color = '#A900FF');
            
            temporaryDiv.appendChild(clone);
        }
    });
    
    // إضافة Footer خاص بالـ PDF
    const pdfFooter = document.createElement('p');
    pdfFooter.textContent = 'يمكنكم رؤية الموقع الإلكتروني الكامل على: https://ezz-pl.github.io/az.cv';
    pdfFooter.style.textAlign = 'center';
    pdfFooter.style.fontSize = '12px';
    pdfFooter.style.color = '#555';
    pdfFooter.style.paddingTop = '20px';
    temporaryDiv.appendChild(pdfFooter);


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
        let position = 0;
        let heightLeft = pdfHeight;

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
        
        // دعم الصفحات المتعددة (لضمان طباعة الأقسام كلها)
        while (heightLeft >= -20) { // هامش بسيط للسماح بطباعة الجزء الأخير
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
