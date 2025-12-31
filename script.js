 // Default configuration
    const defaultConfig = {
      hero_headline: 'PORTFOLIO',
      hero_subtitle: 'Create with a purpose.',
      about_title: 'About Me',
      about_description: "I'm a passionate creative professional specializing in graphic design and web development. With expertise in poster design, branding, and modern web technologies, I bring ideas to life through compelling visuals and seamless digital experiences. Every project is an opportunity to blend creativity with functionality.",
      contact_headline: "Let's create something amazing together",
      contact_email: 'hello@portfolio.com'
    };

     // Portfolio data - Replace these URLs with your own project images
    const portfolioItems = [
      { title: 'Birthday Poster', category: 'illustrations', image: '/images/7.jpeg', color: '#1a1a1a' },
      { title: 'Birthday Poster', category: 'illustrations', image: '/images/8.jpeg', color: '#1a1a1a' },
      { title: 'Brand Identity', category: 'illustrations', image: '/images/16.jpeg', color: '#2d2d2d' },
      { title: 'Social Graphics', category: 'illustrations', image: '/images/5.jpeg', color: '#404040' },
      { title: 'Digital Art', category: 'illustrations', image: '/images/13.jpg', color: '#404040' },
      { title: 'Digital Art', category: 'illustrations', image: '/images/10.jpeg', color: '#404040' },
      { title: 'Event Poster', category: 'posters', image: '/images/11.jpeg', color: '#2d2d2d' },
      { title: 'Logo Design', category: 'branding', image: '/images/15.jpeg', color: '#404040' },
      { title: 'Product Poster', category: 'posters', image: '/images/2.jpeg', color: '#1a1a1a' },
      { title: 'Marketing Kit', category: 'posters', image: '/images/14.jpeg', color: '#2d2d2d' },
      { title: 'Product Poster', category: 'posters', image: '/images/6.jpeg', color: '#1a1a1a' },
      { title: 'Event Poster', category: 'posters', image: '/images/1.jpg', color: '#2d2d2d' },


    ];

    // Modern collage carousel data - use your own image URLs
    const collageSlides = [
      [
        { image: '/images/15.jpeg'},
        { image: '/images/14.jpeg'},
        { image: '/images/6.jpeg'},
        { image: '/images/1.jpg'}
      ],
      [
        { image: '/images/14.jpeg'},
        { image: '/images/6.jpeg'},
        { image: '/images/15.jpeg'},
        { image: '/images/1.jpg'}
      ],
      [
        { image: '/images/6.jpeg'},
        { image: '/images/15.jpeg'},
        { image: '/images/1.jpg'},
        { image: '/images/14.jpeg'}
        
      ]
    ];

    let currentSlideIndex = 0;
    let currentFilter = 'all';

    // Initialize modern collage carousel
    function initCollageCarousel() {
      updateCollage();
      
      // Auto-rotate every 5 seconds
      setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % collageSlides.length;
        updateCollage();
      }, 5000);
    }

    function updateCollage() {
      const container = document.getElementById('hero-collage');
      const currentSlide = collageSlides[currentSlideIndex];
      
      // Fade out existing items
      const existingItems = container.querySelectorAll('.collage-item');
      existingItems.forEach(item => {
        item.classList.add('fade-out');
      });

      // Wait for fade out, then update content
      setTimeout(() => {
        container.innerHTML = '';
        
        currentSlide.forEach((item, index) => {
          const div = document.createElement('div');
          div.className = 'collage-item animate fade-in';
          div.innerHTML = `
            <img src="${item.image}" alt=" " 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                 style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">
            
          `;
          container.appendChild(div);
        });
      }, 600);
    }

     // Generate portfolio grid
    function renderPortfolio() {
      const grid = document.getElementById('portfolio-grid');
      grid.innerHTML = '';

      const filtered = currentFilter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === currentFilter);

      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'project-card rounded-2xl overflow-hidden border-2 border-white/20';
        card.style.backgroundColor = item.color;
        card.style.minHeight = '300px';
        card.innerHTML = `
          <img src="${item.image}" alt="" 
               onerror="this.style.display='none';"
               style="width: 100%; height: 100%; object-fit: cover; min-height: 300px;">
          <div class="project-info">
            
            <p class="text-gray-300">${item.category}</p>
          </div>
        `;
        card.addEventListener('click', () => openModal(item));
        grid.appendChild(card);
      });
    }

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderPortfolio();
      });
    });

    // Modal
    function openModal(item) {
      const modal = document.getElementById('modal');
      const modalImage = document.getElementById('modal-image');
      modalImage.src = item.image;
      modalImage.alt = item.title;
      modal.classList.add('active');
    }

    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('modal').classList.remove('active');
    });

    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('active');
      }
    });
 
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate skill bars
          if (entry.target.querySelector('.skill-bar')) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
              bar.classList.add('animate');
            });
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .scale-in').forEach(el => {
      observer.observe(el);
    });

    // Contact form
    

    // Smooth scroll
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        const btn = contactForm.querySelector('button');
        btn.textContent = 'Sending...';
      });
    }

    // Element SDK implementation
    async function onConfigChange(config) {
      document.getElementById('hero-headline').textContent = config.hero_headline || defaultConfig.hero_headline;
      document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
      document.getElementById('about-title').textContent = config.about_title || defaultConfig.about_title;
      document.getElementById('about-description').textContent = config.about_description || defaultConfig.about_description;
      document.getElementById('contact-headline').textContent = config.contact_headline || defaultConfig.contact_headline;
      
      const email = config.contact_email || defaultConfig.contact_email;
      const emailDisplay = document.getElementById('email-display');
      emailDisplay.href = `mailto:${email}`;
      emailDisplay.textContent = email;
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
        ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
        ['about_title', config.about_title || defaultConfig.about_title],
        ['about_description', config.about_description || defaultConfig.about_description],
        ['contact_headline', config.contact_headline || defaultConfig.contact_headline],
        ['contact_email', config.contact_email || defaultConfig.contact_email]
      ]);
    }

    // Initialize
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }

    // Start everything
    initCollageCarousel();
    renderPortfolio();
 




