# Sitio web — Nombre Apellido (página de artista)

Sitio web estático para una pintora española, moderno, elegante y responsive. Incluye páginas: inicio, galería, biografía y contacto. Ya están añadidos los archivos base: `index.html`, `gallery.html`, `about.html`, `contact.html`, `assets/css/style.css` y `assets/js/main.js`.

## Estructura del repositorio

- index.html
- gallery.html
- about.html
- contact.html
- assets/
  - css/style.css
  - js/main.js


## Personalización rápida

1. Reemplaza "Nombre Apellido" en los HTML por el nombre real de la artista.
2. Cambia el correo `artista@example.com` por la dirección real en `assets/js/main.js` y en `contact.html`.
3. Sustituye las imágenes de ejemplo por las obras reales (optimiza tamaño: 1200–1600px para las imágenes a pantalla completa, y 800px para miniaturas).
4. Añade favicon y Google Fonts en `<head>` de los HTML si lo deseas:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="/assets/favicon.ico">
```

## Previsualizar en local

Opción 1 — abrir archivo:
- Abre `index.html` directamente en el navegador (útil para comprobar diseño estático).

Opción 2 — servidor local (recomendado):
- Con Python 3: `python -m http.server 8000` (desde la raíz del repo) y abre `http://localhost:8000`.
- Con Node (http-server): `npx http-server -c-1`.
- Con Visual Studio Code: instala la extensión Live Server y pulsa "Go Live".

## Publicar con GitHub Pages (guía rápida)

Opción A — (rápida, sin CI)
1. Sube todos los archivos al branch `main` (o a la rama por defecto del repositorio).
2. En GitHub, ve a Settings → Pages.
3. En "Source" selecciona `main` branch y raíz (`/ (root)`) o la carpeta `docs/` si prefieres mantener la web en `/docs`.
4. Guarda. GitHub publicará el sitio en unos minutos en: `https://<usuario>.github.io/<repositorio>` — por ejemplo: `https://pablena.github.io/michelinesamaey`.

Notas:
- Si eliges `docs/`, mueve los archivos estáticos a la carpeta `docs/` en la rama seleccionada.
- Para que la URL sea `https://pablena.github.io/michelinesamaey`, el repositorio debe ser público o Pages debe estar configurado para permitirlo.

Opción B — Automático con workflow (recomendado para despliegues continuos)
- Puedo añadir un GitHub Action que despliegue automáticamente a `gh-pages` cada vez que hagas push a `main`. Ejemplo de flujo:

  - name: Deploy to GitHub Pages
    uses: peaceiris/actions-gh-pages@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./

Si quieres, lo puedo crear (archivo `.github/workflows/deploy.yml`) y configurarlo para publicar en la rama `gh-pages`.

## Formularios / correo

- Actualmente el formulario usa `mailto:` como fallback.
- Si quieres envío por backend (fetch a una API), integraciones (Formspree, Netlify Forms o Google Sheets) o un pequeño serverless (Vercel/Netlify), dime cuál y preparo el ejemplo.

## SEO y mejoras recomendadas

- Añade meta tags principales en `<head>`: title, description, og:image, og:title, og:description.
- Añade `rel="preload"` para las imágenes importantes si lo deseas.
- Comprueba accesibilidad: textos alternativos en todas las imágenes y labels en inputs.

## Licencia y créditos

Añade una licencia si deseas (por ejemplo MIT) y un archivo `LICENSE` si quieres permitir su uso público. Por defecto, el contenido del repositorio no tiene licencia explícita.

---

He creado este README en la raíz del repositorio para que tengas la guía y los pasos de despliegue. ¿Quieres que también añada el workflow de GitHub Actions para desplegar automáticamente (y lo cree ahora mismo) o prefieres hacerlo manualmente desde Settings > Pages?