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
            // التعديل هنا: تشغيل العداد على 4 بدلاً من 3
            countUp(document.querySelector('.stats-grid .stat-item:nth-child(1) .number'), 4, 2000, '+'); // 4+ سنوات
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
    // 🔴 تم إضافة '#education' لضمان التقاطه في الـ PDF
    const elementsToCapture = ['#home', '#about', '#experience', '#education', '#skills', '#contact-info']; 
    const temporaryDiv = document.createElement('div');
    temporaryDiv.id = 'pdf-capture-temp';
    // تحديد خصائص لتوليد PDF بشكل صحيح (خلفية بيضاء، حجم مناسب)
    temporaryDiv.style.backgroundColor = '#ffffff'; 
    temporaryDiv.style.padding = '20px';
    temporaryDiv.style.maxWidth = '800px'; 
    temporaryDiv.style.margin = '0 auto';
    temporaryDiv.style.color = '#000000'; // لجعل النصوص سوداء في الـ PDF
    temporaryDiv.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr'; // توجيه اللغة
    
    // نسخ المحتوى المختار وإجراء تعديلات CSS لتبسيط الـ PDF (يضمن طباعة مختصرة)
    elementsToCapture.forEach(selector => {
        const originalElement = document.querySelector(selector);
        if (originalElement) {
            const clone = originalElement.cloneNode(true);
            
            // تعديلات لنسخة الـ PDF
            clone.style.padding = '10px 0'; // تقليل الفراغات
            clone.classList.remove('reveal-on-scroll', 'visible');
            
            // تخصيص قسم المقدمة (#home)
            if (selector === '#home') {
                 clone.querySelector('.hero-content').style.background = 'none';
                 clone.querySelector('.hero-content').style.boxShadow = 'none';
                 clone.querySelector('.cta-buttons').style.display = 'none'; // إزالة الأزرار
                 // 🔴 تغيير لون الحدود في الـ PDF إلى الأزرق الكحلي
                 clone.querySelector('.profile-image').style.border = '2px solid #0D47A1'; 
                 clone.querySelectorAll('.hero-contact-info span').forEach(span => span.style.color = '#000000'); // جعل المعلومات سوداء
                 clone.style.height = 'auto';
                 clone.style.textAlign = 'center';
                 
                 // إضافة النبذة القصيرة من قسم "من أنا" (لضمان وجودها في الصفحة الأولى)
                 const shortDescOriginal = document.querySelector('#about .description');
                 if(shortDescOriginal) {
                     const shortDesc = document.createElement('p');
                     shortDesc.textContent = shortDescOriginal.getAttribute(currentLang === 'ar' ? 'data-ar' : 'data-en');
                     shortDesc.style.color = '#333';
                     shortDesc.style.maxWidth = '600px';
                     shortDesc.style.margin = '15px auto 0';
                     shortDesc.style.padding = '0 10px';
                     clone.querySelector('.hero-content').appendChild(shortDesc);
                 }
            }
             // تخصيص قسم من أنا (#about) - إزالة العنوان فقط أو تخطيه إذا لم يُرغب في تكرار النبذة
             if (selector === '#about') {
                 clone.style.display = 'none'; // نخفي قسم من أنا لأنه تم نسخ نصه إلى قسم #home
             }
            // تخصيص قسم المهارات (#skills)
            if (selector === '#skills') {
                clone.querySelectorAll('.skill-group h4').forEach(h4 => h4.style.color = '#000000');
                clone.querySelectorAll('.skill-bar-container p').forEach(p => p.style.color = '#000000');
                clone.querySelectorAll('.skill-bar').forEach(bar => {
                    // إظهار الشريط باللون الأزرق الكحلي مباشرة
                    bar.style.width = bar.getAttribute('data-level') + '%';
                    bar.style.backgroundColor = '#0D47A1'; 
                    bar.style.height = '8px';
                    bar.style.position = 'static'; // إزالة الوضع المطلق لـ ::after
                    // يتم إنشاء عنصر وهمي بالـ JS لتقليد الـ ::after لـ html2canvas
                    const fillBar = document.createElement('div');
                    fillBar.style.height = '8px';
                    // 🔴 لون شريط المهارة في الـ PDF
                    fillBar.style.backgroundColor = '#0D47A1'; 
                    fillBar.style.width = bar.getAttribute('data-level') + '%';
                    if (currentLang === 'ar') {
                        fillBar.style.float = 'right';
                    } else {
                        fillBar.style.float = 'left';
                    }
                    bar.innerHTML = ''; 
                    bar.appendChild(fillBar);
                    bar.style.backgroundColor = '#ddd'; // خلفية شريط المهارة
                    bar.style.overflow = 'visible'; // للسماح للعنصر الوهمي بالظهور
                });
            }
            // تخصيص قسم معلومات الاتصال (#contact-info)
            if (selector === '#contact-info') {
                clone.querySelectorAll('.contact-item').forEach(item => {
                    item.style.backgroundColor = '#f4f4f4'; // خلفية فاتحة للبطاقة
                    item.style.color = '#000';
                });
                clone.querySelectorAll('.contact-item a').forEach(a => a.style.color = '#000');
                // 🔴 لون الأيقونات في الـ PDF
                clone.querySelectorAll('.contact-item i').forEach(i => i.style.color = '#0D47A1');
            }
            // تخصيص قسم الخبرة (#experience) وقسم التعليم (#education)
            if (selector === '#experience' || selector === '#education') {
                clone.querySelectorAll('.timeline-item h4').forEach(h4 => h4.style.color = '#333');
                // 🔴 لون الجهة المانحة في الـ PDF
                clone.querySelectorAll('.timeline-item h5').forEach(h5 => h5.style.color = '#0D47A1');
                clone.querySelectorAll('.timeline-item ul').forEach(ul => {
                     ul.style.color = '#555';
                     // إزالة نقطة الـ before التي لا تظهر بشكل جيد في الـ PDF
                     ul.querySelectorAll('li').forEach(li => li.style.padding = '0');
                });
                clone.querySelectorAll('.timeline-marker').forEach(marker => marker.style.display = 'none');
                clone.style.borderRight = 'none';
                clone.style.paddingRight = '0';
            }
            
            // تعديلات عامة
            clone.querySelectorAll('.section-title').forEach(title => {
                // 🔴 لون العنوان الرئيسي في الـ PDF
                title.style.color = '#0D47A1';
                title.style.borderBottom = '2px solid #0D47A1';
            });
            
            temporaryDiv.appendChild(clone);
        }
    });
    
    // إضافة Footer خاص بالـ PDF
    const pdfFooter = document.createElement('p');
    pdfFooter.textContent = currentLang === 'ar' 
        ? 'يمكنكم رؤية الموقع الإلكتروني الكامل على: https://ezz-pl.github.io/az.cv' 
        : 'View the full online CV at: https://ezz-pl.github.io/az.cv';
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
        scale: 2, // دقة عالية
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
        while (heightLeft >= -20) { 
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        const filename = currentLang === 'ar' ? 'السيرة_الذاتية_المختصرة_عبدالعزيز_العنزي.pdf' : 'Abdulaziz_Al-Enazi_Brief_CV.pdf';
        pdf.save(filename);
        
        // إزالة العنصر المؤقت من الـ Body بعد الانتهاء
        document.body.removeChild(temporaryDiv);
    }).catch(error => {
        console.error('PDF Generation Error:', error);
        alert('عفواً، حدث خطأ أثناء توليد السيرة الذاتية. يرجى المحاولة لاحقاً.');
        if (document.body.contains(temporaryDiv)) {
             document.body.removeChild(temporaryDiv);
        }
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
