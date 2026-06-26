/**
 * HYALU BRASIL - JAVASCRIPT
 * Funcionalidades de navegação e interatividade
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU MOBILE
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu ul');
    const headerCta = document.querySelector('.header-cta');
    
    if (mobileMenuToggle) {
        let menuOpen = false;
        
        mobileMenuToggle.addEventListener('click', function() {
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = 'white';
                navMenu.style.padding = 'var(--spacing-md)';
                navMenu.style.boxShadow = 'var(--shadow-lg)';
                navMenu.style.gap = 'var(--spacing-md)';
                
                // Esconde CTA no mobile quando menu aberto
                if (headerCta && window.innerWidth < 1024) {
                    headerCta.style.display = 'none';
                }
                
                // Animação do ícone hamburger
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                navMenu.style.display = '';
                navMenu.style.flexDirection = '';
                navMenu.style.position = '';
                navMenu.style.top = '';
                navMenu.style.left = '';
                navMenu.style.right = '';
                navMenu.style.backgroundColor = '';
                navMenu.style.padding = '';
                navMenu.style.boxShadow = '';
                navMenu.style.gap = '';
                
                if (headerCta && window.innerWidth < 1024) {
                    headerCta.style.display = '';
                }
                
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024 && mobileMenuToggle) {
                mobileMenuToggle.click();
            }
        });
    });
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScrollY = window.scrollY;
    });
    
    // ========================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Selecionar elementos para animar
    const animatedElements = document.querySelectorAll('.card, .diff-item, .stat-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // FORMULÁRIO DE CONTATO
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validação simples
            if (!data.nome || !data.empresa || !data.email || !data.mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!data.privacidade) {
                alert('Você precisa concordar com a Política de Privacidade.');
                return;
            }
            
            // Simulação de envio (substituir por integração real)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simular delay de envio
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // ========================================
    // MÁSCARA DE TELEFONE (OPCIONAL)
    // ========================================
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length >= 10) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length >= 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}-${value.substring(6)}`;
            } else if (value.length >= 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // ========================================
    // VALIDAÇÃO DE EMAIL CORPORATIVO (SUGESTÃO)
    // ========================================
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value;
            const commonDomains = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com'];
            const isCommonDomain = commonDomains.some(domain => value.toLowerCase().includes(domain));
            
            if (isCommonDomain && value.length > 0) {
                console.log('Sugestão: Use um e-mail corporativo para melhor atendimento.');
            }
        });
    }
    
    // ========================================
    // ANIMAÇÃO DOS NÚMEROS ESTATÍSTICOS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const duration = 1500;
                    const stepTime = duration / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(counter);
                        }
                        
                        let displayValue = Math.floor(current).toString();
                        if (hasPlus) displayValue = '+' + displayValue;
                        if (hasPercent) displayValue = displayValue + '%';
                        
                        target.textContent = displayValue;
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========================================
    // LAZY LOADING PARA IMAGENS (OPCIONAL)
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    console.log('Hyalu Brasil - Site carregado com sucesso!');
});
