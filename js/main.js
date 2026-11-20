/**
 * Portfolio Personal — Lucas Peralta
 * Script principal en JavaScript Vanilla
 *
 * Funcionalidades:
 * 1. Menú de navegación móvil accesible (aria-expanded, cierre con Escape y al navegar).
 * 2. Resaltado del enlace activo según la sección visible (IntersectionObserver).
 * 3. Animación discreta de entrada para tarjetas respetando prefers-reduced-motion.
 * 4. Validación accesible del formulario de contacto y preparación honesta sin simular envíos falsos.
 */

(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  /* ==========================================================================
     1. Navegación Móvil Accesible
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMobileMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open', !isExpanded);
    });

    // Cerrar menú al pulsar un enlace de sección en vista móvil
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 960) {
          closeMobileMenu();
        }
      });
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
        navToggle.focus();
      }
    });
  }

  /* ==========================================================================
     2. Indicador de Sección Activa en la Navegación y Barra de Estado
     ========================================================================== */
  const sections = document.querySelectorAll('main section[id]');
  const statusActiveView = document.getElementById('status-active-view');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            if (statusActiveView) {
              statusActiveView.textContent = 'VIEW: #' + activeId;
            }
            navLinks.forEach(function (link) {
              const isMatch = link.getAttribute('href') === '#' + activeId;
              link.classList.toggle('is-active', isMatch);
              if (isMatch) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ==========================================================================
     2B. Controles de Ventana y Reloj del Sistema (Interfaz tipo Software)
     ========================================================================== */
  const systemClock = document.getElementById('system-clock');
  const btnMinimize = document.getElementById('btn-win-minimize');
  const btnMaximize = document.getElementById('btn-win-maximize');
  const btnClose = document.getElementById('btn-win-close');
  const btnRestore = document.getElementById('btn-win-restore');
  const minimizedBanner = document.getElementById('minimized-banner');

  function updateSystemClock() {
    if (!systemClock) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    systemClock.textContent = hours + ':' + minutes;
  }

  if (systemClock) {
    updateSystemClock();
    setInterval(updateSystemClock, 15000);
  }

  function setWindowMinimized(minimized) {
    document.body.classList.toggle('is-window-minimized', minimized);
    if (minimizedBanner) {
      minimizedBanner.hidden = !minimized;
    }
    if (btnMinimize) {
      btnMinimize.setAttribute('aria-pressed', String(minimized));
    }
  }

  if (btnMinimize) {
    btnMinimize.addEventListener('click', function () {
      const isMinimized = document.body.classList.contains('is-window-minimized');
      setWindowMinimized(!isMinimized);
    });
  }

  if (btnRestore) {
    btnRestore.addEventListener('click', function () {
      setWindowMinimized(false);
    });
  }

  if (btnMaximize) {
    btnMaximize.addEventListener('click', function () {
      const isMaximized = document.body.classList.toggle('is-window-maximized');
      btnMaximize.setAttribute('aria-pressed', String(isMaximized));
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', function () {
      setWindowMinimized(false);
      document.body.classList.remove('is-window-maximized');
      if (btnMaximize) {
        btnMaximize.setAttribute('aria-pressed', 'false');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. Animación Discreta de Entrada (Respeta prefers-reduced-motion)
     ========================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal-item');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealItems.forEach(function (item) {
      item.classList.add('is-hidden');
    });

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* ==========================================================================
     4. Validación y Manejo Honesto del Formulario de Contacto
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    const fields = {
      nombre: {
        input: document.getElementById('contacto-nombre'),
        error: document.getElementById('error-nombre'),
        validate: function (value) {
          if (!value.trim()) return 'Por favor, ingresá tu nombre.';
          if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
          return '';
        }
      },
      correo: {
        input: document.getElementById('contacto-correo'),
        error: document.getElementById('error-correo'),
        validate: function (value) {
          if (!value.trim()) return 'Por favor, ingresá tu correo electrónico.';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) return 'Ingresá una dirección de correo electrónico válida.';
          return '';
        }
      },
      mensaje: {
        input: document.getElementById('contacto-mensaje'),
        error: document.getElementById('error-mensaje'),
        validate: function (value) {
          if (!value.trim()) return 'Por favor, escribí tu mensaje.';
          if (value.trim().length < 10) return 'El mensaje debe contener al menos 10 caracteres.';
          return '';
        }
      }
    };

    function validateField(fieldKey) {
      const field = fields[fieldKey];
      if (!field || !field.input || !field.error) return true;

      const errorMessage = field.validate(field.input.value);
      field.error.textContent = errorMessage;
      field.input.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
      return !errorMessage;
    }

    Object.keys(fields).forEach(function (key) {
      const field = fields[key];
      if (field.input) {
        field.input.addEventListener('blur', function () {
          validateField(key);
        });
        field.input.addEventListener('input', function () {
          if (field.input.getAttribute('aria-invalid') === 'true') {
            validateField(key);
          }
        });
      }
    });

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let isFormValid = true;
      let firstInvalidInput = null;

      Object.keys(fields).forEach(function (key) {
        const valid = validateField(key);
        if (!valid && isFormValid) {
          isFormValid = false;
          firstInvalidInput = fields[key].input;
        }
      });

      if (!isFormValid) {
        formStatus.className = 'form-status is-visible form-status--error';
        formStatus.textContent = 'Revisá los campos marcados con error antes de continuar.';
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Comprobación honesta: No se simula envío exitoso si el correo o endpoint sigue pendiente
      const configuredRecipient = contactForm.getAttribute('data-recipient-email') || '';
      const nombre = fields.nombre.input.value.trim();
      const correo = fields.correo.input.value.trim();
      const asuntoInput = document.getElementById('contacto-asunto');
      const asunto = asuntoInput && asuntoInput.value.trim()
        ? asuntoInput.value.trim()
        : 'Contacto desde Portfolio Web';
      const mensaje = fields.mensaje.input.value.trim();

      if (!configuredRecipient || configuredRecipient === 'PENDIENTE_CONFIRMAR_CORREO') {
        formStatus.className = 'form-status is-visible form-status--info';
        formStatus.textContent =
          'Formulario validado correctamente. Nota: El envío directo está pendiente de configuración (falta confirmar la dirección de correo oficial de Lucas Peralta o el endpoint del servicio de formularios en index.html). No se ha enviado ningún dato.';
        return;
      }

      // Si Lucas configura su correo en data-recipient-email, se abre el cliente de correo local (mailto:)
      const mailtoBody =
        'Nombre: ' + nombre + '\n' +
        'Correo: ' + correo + '\n\n' +
        'Mensaje:\n' + mensaje;

      const mailtoUrl =
        'mailto:' + encodeURIComponent(configuredRecipient) +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(mailtoBody);

      formStatus.className = 'form-status is-visible form-status--info';
      formStatus.textContent = 'Abriendo tu cliente de correo predeterminado para completar el envío...';
      window.location.href = mailtoUrl;
    });
  }
})();
