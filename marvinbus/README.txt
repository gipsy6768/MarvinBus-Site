MARVINBUS INTERNACIONAL TSP — SITIO WEB
=========================================

CONTENIDO DEL ZIP
------------------
index.html        -> Página de inicio (home)
destinos.html      -> Listado completo de destinos
horarios.html       -> Horarios de salida por ruta (con pestañas)
encomiendas.html    -> Información y formulario para envío de encomiendas
servicios.html      -> Servicios de la empresa
nosotros.html       -> Historia, valores y línea de tiempo
contacto.html       -> Formulario de contacto + mapa + datos
css/style.css        -> Todos los estilos del sitio
js/script.js          -> Menú móvil, slider, animaciones, formularios
img/                     -> Carpeta vacía lista para tus propias fotos

CÓMO VERLO
-----------
1. Descomprime el archivo.
2. Haz doble clic en "index.html" para abrirlo en tu navegador.
   (No necesitas servidor ni instalar nada).

CÓMO CAMBIAR LAS IMÁGENES
---------------------------
Actualmente las fotos (bus, destinos, fondos) están tomadas de Unsplash
(banco de imágenes gratuito) y se cargan directo desde internet, por eso
necesitas conexión para verlas bien.

Para poner tus propias fotos:
1. Copia tus imágenes dentro de la carpeta "img/" (ej: img/bus-hero.jpg).
2. En cada archivo .html busca las líneas que dicen:
   src="https://images.unsplash.com/..."
   background-image:url('https://images.unsplash.com/...')
3. Reemplaza esa URL por la ruta local, por ejemplo:
   src="img/bus-hero.jpg"
   background-image:url('img/bus-hero.jpg')

Recomendación de tamaños:
- Fotos de hero / fondos grandes: 1600x900px o más, formato .jpg
- Fotos de tarjetas de destino: 800x600px, formato .jpg

CÓMO CAMBIAR TEXTOS, TELÉFONOS Y DIRECCIÓN
---------------------------------------------
Busca y reemplaza en todos los .html:
- "+51 987 654 321" y "+51 930 123 456" -> tus teléfonos reales
- "Terminal Terrestre, Óvalo Mochica..." -> tu dirección real
- El enlace de WhatsApp: href="https://wa.me/51987654321"
  (cambia el número después de "wa.me/", sin espacios ni "+")

FUNCIONALIDAD INCLUIDA
------------------------
- Menú responsive (hamburguesa en celular)
- Slider de imágenes en el hero (automático + flechas + puntos)
- Buscador de pasajes: valida el formulario y muestra resultados
  de ejemplo en pantalla (no está conectado a un sistema de reservas real)
- Formularios de Contacto y Encomiendas: validan campos obligatorios
  y muestran un mensaje de éxito (no envían correos reales; si quieres
  que sí envíen correos, se puede conectar a un servicio como Formspree,
  EmailJS o tu propio backend)
- Animaciones al hacer scroll, botón flotante de WhatsApp, tabs de horarios

SIGUIENTE PASO SUGERIDO
--------------------------
Si más adelante quieres que las reservas y el formulario de contacto
funcionen de verdad (con envío de correos o conexión a una base de datos),
cuéntame y lo conectamos.
