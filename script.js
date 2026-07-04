document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // 1. Sticky Navigation Scroll Effect
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case user refreshes scrolled page

  // ==========================================
  // 2. Mobile Menu Toggler
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      
      // Transform hamburger into an 'X'
      const spans = menuToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ==========================================
  // 3. Scroll Reveal Animation using Intersection Observer
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // ==========================================
  // 4. FAQ Accordion Functionality
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    
    questionButton.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs for a clean accordion experience
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // 5. Interactive Medical Record Triage Panel Showcase
  // ==========================================
  const triageItems = document.querySelectorAll('.triage-item');
  const detailsTitle = document.getElementById('showcase-title');
  const detailsDesc = document.getElementById('showcase-desc');
  const detailsAuditor = document.getElementById('showcase-auditor');
  const detailsTime = document.getElementById('showcase-time');
  
  // Data for the interactive display
  const triageData = {
    'intake': {
      title: 'Step 1: Secure Record Receipt',
      desc: 'All medical records are securely ingested through our encrypted portals. We ensure complete data protection and maintain a secure repository to prevent unauthorized access.',
      auditor: 'Intake & Security Specialist',
      time: 'Real-time (upon transfer)'
    },
    'sorting': {
      title: 'Step 2: Sorting & Organization',
      desc: 'We clean and organize the records, sorting all pages chronologically. Documents are indexed by provider, clinical facility, and type, separating duplicates and non-medical clutter.',
      auditor: 'Medical Records Specialist',
      time: '2 - 4 Hours'
    },
    'extraction': {
      title: 'Step 3: Expert Review & Analysis',
      desc: 'Our clinical experts analyze clinical charts, laboratory metrics, medications, and physician comments. We extract diagnostic histories and care patterns with absolute accuracy.',
      auditor: 'Clinical Data Analyst',
      time: '4 - 8 Hours'
    },
    'auditing': {
      title: 'Step 4: Precise Summarization',
      desc: 'We draft structured summaries, chronologies, and narrative briefs. Important points are detailed, and complex files are distilled into legal- and clinical-ready insights.',
      auditor: 'Medical Scribe Coordinator',
      time: '4 - 6 Hours'
    },
    'delivery': {
      title: 'Step 5: Quality Assurance & Delivery',
      desc: 'A senior medical auditor reviews the summary against original records. After double-checking coding compliance and details, the finalized summary is delivered securely.',
      auditor: 'Senior Medical QA Lead',
      time: 'Instant upon validation'
    }
  };

  triageItems.forEach(item => {
    item.addEventListener('click', () => {
      triageItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      
      const phase = item.getAttribute('data-phase');
      const data = triageData[phase];
      
      if (data && detailsTitle && detailsDesc && detailsAuditor && detailsTime) {
        // Apply smooth transition
        const container = document.querySelector('.about-interactive-card');
        container.style.opacity = '0.9';
        container.style.transform = 'translateY(2px)';
        
        setTimeout(() => {
          detailsTitle.textContent = data.title;
          detailsDesc.textContent = data.desc;
          detailsAuditor.textContent = data.auditor;
          detailsTime.textContent = data.time;
          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });

  // ==========================================
  // 6. Interactive Contact Form Submission Handler
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="lucide-loader-2 animate-spin" style="margin-right: 8px;"></i> Ingesting Request...';
      submitBtn.style.opacity = '0.8';
      
      // Add loading spinner CSS on the fly to prevent external dependency issues
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-spin { display: inline-block; animation: spin 1s linear infinite; }
      `;
      document.head.appendChild(styleTag);
      
      setTimeout(() => {
        // Success state
        submitBtn.innerHTML = '<i class="lucide-check-circle2" style="margin-right: 8px;"></i> Securely Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Solid emerald success green
        submitBtn.style.color = '#ffffff';
        submitBtn.style.opacity = '1';
        
        contactForm.reset();
        
        // Return button to normal after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.opacity = '';
          styleTag.remove();
        }, 4000);
      }, 2000);
    });
  }

  // ==========================================
  // 7. Newsletter Form Submission Handler
  // ==========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');
      
      if (emailInput && emailInput.value) {
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="lucide-check"></i>';
        submitBtn.style.backgroundColor = '#10b981';
        
        emailInput.value = '';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }
});
