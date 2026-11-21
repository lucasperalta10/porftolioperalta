# Portfolio Personal — Lucas Peralta

Sitio web estático de portfolio personal desarrollado para **Lucas Peralta**, basado en el prototipo de Figma y construido exclusivamente con **HTML5 semántico, CSS3 (Mobile-First) y JavaScript Vanilla**, sin frameworks ni pasos de compilación obligatorios.

---

## 1. Estructura del Proyecto

```text
portfolio/
├── index.html              # Documento principal con todas las secciones semánticas
├── css/
│   ├── reset.css           # Reset CSS moderno y soporte para prefers-reduced-motion
│   └── styles.css          # Variables del sistema visual, diseño Mobile-First y componentes
├── js/
│   └── main.js             # Navegación móvil accesible, observador de secciones y validación del formulario
├── assets/
│   ├── icons/              # Iconos SVG locales de las 12 tecnologías del prototipo
│   └── img/                # Marcadores SVG locales para avatar y capturas de proyectos
├── style.css               # Archivo conservado del workspace original (importa css/reset.css y css/styles.css)
├── java.js                 # Archivo conservado del workspace original (referencia a js/main.js)
└── README.md               # Documentación técnica, decisiones de diseño y lista de datos pendientes
```

---

## 2. Cómo Ejecutar el Proyecto Localmente

Al ser un sitio estático puro sin dependencias ni compilación (`build`):

1. **Opción directa:** Haz doble clic sobre `index.html` para abrirlo en cualquier navegador moderno.
2. **Opción con servidor local (recomendada para desarrollo):**
   - Con la extensión **Live Server** en VS Code ("Go Live").
   - O ejecutando en terminal desde la carpeta del proyecto:
     ```bash
     python -m http.server 8000
     ```
     Luego abre `http://localhost:8000` en el navegador.

---

## 3. Sistema Visual Implementado

Definido mediante variables CSS en `:root` (`css/styles.css`):

- **Fondo principal (`--color-bg`):** `#0D0B16`
- **Superficie oscura (`--color-surface` / `--color-surface-elevated`):** `#191525` / `#231C3A`
- **Color principal (`--color-primary`):** Violeta eléctrico `#8B5CF6`
- **Color secundario y destacados (`--color-accent`):** Verde neón `#39FF88` (aplicado exclusivamente en títulos, bordes de foco y acentos puntuales para cuidar el contraste y la legibilidad).
- **Texto principal (`--color-text`):** `#EAE7F2`
- **Texto secundario (`--color-text-muted`):** `#A7A1B5`
- **Tipografías:** `Orbitron` (títulos y encabezados), `Rajdhani` (subtítulos, botones y etiquetas de tarjetas) e `Inter` (párrafos y texto general), con fallbacks seguros del sistema.

---

## 4. Decisiones de Diseño e Implementación (para Revisión)

1. **Unificación en Single-Page con navegación por anclas (`#inicio`, `#proyectos`, `#resenas`, `#sobre-mi`, `#conocimientos`, `#educacion`, `#contacto`):**
   - Las tres pantallas del prototipo (*Inicio*, *Proyectos* y *Sobre mí*) comparten la misma barra superior (`Lucas Peralta Site`) y la misma columna lateral izquierda con el avatar (que funciona como enlace directo a `#inicio`), carpeta de Proyectos y Sobre Mí.
   - Se integraron todas las vistas en una arquitectura fluida de una sola página con `scroll-margin-top` para que ningún título quede oculto bajo la cabecera al navegar.
2. **Navegación móvil compacta y accesible:**
   - En la vista móvil del prototipo de Figma solo se mostraba el botón "Inicio" sin definir una navegación completa.
   - Se implementó una barra superior compacta con un botón **Menú** accesible (`aria-expanded`, `aria-controls`, soporte para tecla `Escape` y cierre automático al seleccionar una sección) que permite llegar a todas las secciones en pantallas móviles (~393 px), transformándose en la barra lateral fija a la izquierda en escritorio.
3. **Grilla de Proyectos y Tarjetas de Conocimientos:**
   - Siguiendo la especificación y la referencia visual de Figma, la sección de **Proyectos** utiliza una grilla de **2 columnas** tanto en vista móvil (393 px) como en escritorio (con fallback automático a 1 columna solo en pantallas menores a 330 px para evitar desbordamiento horizontal).
   - En **Sobre mí / Conocimientos**, las 12 tecnologías se organizan en las 4 categorías del prototipo (*Lenguajes de Programación*, *Frameworks y Tecnologías*, *Base de datos*, *Herramientas de desarrollo*) mediante tarjetas individuales con icono y estado del nivel pendiente.
4. **Niveles de Conocimientos sin inferencias inventadas:**
   - Se muestran las estrellas en tono atenuado únicamente como referencia estética del boceto (`aria-hidden="true"`), acompañadas de la etiqueta explícita `"Nivel pendiente de confirmar"`.
5. **Formulario sin simulación engañosa:**
   - Cuenta con validación HTML nativa reforzada por mensajes accesibles en JavaScript (`aria-invalid`, `role="alert"`).
   - Como GitHub Pages es alojamiento estático y el mecanismo definitivo está pendiente, al enviar un formulario válido se informa claramente que la recepción está pendiente de configurar el correo o servicio externo, sin simular un envío falso ni exponer credenciales.

---

## 5. Estado de Datos y Recursos Confirmados / Pendientes

### Confirmados e Integrados:
- [x] **Fotografía personal / Avatar:** Integrada desde `assets/icons/WhatsApp Image 2026-11-20 at 13.54.47.jpeg`.
- [x] **Iconos oficiales de tecnologías y carpeta de proyectos:** Integrados desde `assets/icons/`. *(El archivo `images.jpg` fue excluido del código por ser ajeno al diseño).*
- [x] **Perfil oficial de GitHub:** `https://github.com/lucasperalta10` vinculado en **Sobre Mí**, **Proyectos** y **Contacto**.
- [x] **Niveles de dominio de las 12 tecnologías:**
  - **Avanzado:** `HTML5`, `CSS3`, `VS Code`.
  - **Intermedio:** `JavaScript`, `Python`, `React Native`, `MySQL`, `Git`, `GitHub`.
  - **Básico:** `Vite`, `Node.JS`, `Figma`.
- [x] **Capturas reales de Proyectos Destacados, Logo y Repositorios:**
  - **ControlAR:** `Captura de pantalla 2026-11-19 201051.png` + logo `ControlARimagen.png` + repositorio (`https://github.com/lucasperalta10/ControlARsistema`).
  - **NightWatch:** `Captura de pantalla 2026-11-19 204404.png` + repositorio (`https://github.com/lucasperalta10/NightWatchJuego`).
  - **GPUflow:** `Captura de pantalla 2026-11-19 203819.png` + repositorio (`https://github.com/lucasperalta10/GPUflowRenovado`).
  - **GamerFest:** `Captura de pantalla 2026-11-19 205511.png` + repositorio (`https://github.com/lucasperalta10/GamerFest`).
- [x] **Educación y Cursos:**
  - *Formación Académica:* Instituto Superior de Formación Docente y Técnica Nº26 Dolores (Tecnicatura en Desarrollo de Software, 2do año, en curso) y Escuela Secundaria Nº1 Castelli (Completo).
  - *Cursos:* Desarrollo Web Full Stack JR (Generación T, Streambe) e Inglés — Nivel B2 (SELT).
- [x] **Reseñas:** Integradas para ControlAR y GPUflow.
- [x] **Correo electrónico oficial y formulario de contacto (`mailto:`):** Configurado con `lucas.peraltaa25@gmail.com` tanto en **Canales Directos** como en el formulario (`data-recipient-email="lucas.peraltaa25@gmail.com"`).
- [x] **Próximos Proyectos:** Subsección omitida de producción hasta contar con nuevos desarrollos definidos.

---

## 6. Cómo Publicar en GitHub Pages

1. Sube todos los archivos de este directorio a un repositorio de GitHub (por ejemplo, `lucas-peralta-portfolio` o `usuario.github.io`).
2. Entra al repositorio en GitHub y haz clic en **Settings** (Configuración).
3. En el menú lateral izquierdo, selecciona **Pages**.
4. En **Build and deployment** -> **Source**, elige **Deploy from a branch**.
5. En **Branch**, selecciona la rama principal (`main` o `master`) y la carpeta **`/ (root)`**, luego pulsa **Save**.
6. Espera entre 1 y 2 minutos; GitHub mostrará la URL pública del portfolio lista para compartir.
