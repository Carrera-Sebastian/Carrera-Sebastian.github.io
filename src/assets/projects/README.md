# Capturas de proyectos / Project screenshots

Dejá acá tus capturas. Se toman automáticamente en el build — no hace falta tocar código.

## Cómo funciona

1. **Una carpeta por proyecto**, con el mismo nombre que el `slug` del proyecto en
   [`src/data/projects.json`](../../data/projects.json).

   ```
   src/assets/projects/
   ├── cya/
   ├── antecedentes/
   ├── my-mind/
   └── plantitapp/
   ```

2. **Copiá los archivos adentro.** Se aceptan `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`.
   No hace falta redimensionar ni comprimir nada: todas pasan por el pipeline `<Image>` de
   Astro (Sharp), que genera versiones optimizadas en el tamaño correcto durante el build.

3. **El nombre del archivo define el orden.** Se ordenan naturalmente por nombre, así que
   conviene numerarlas:

   ```
   plantitapp/
   ├── 01-plantitapp.png
   ├── 02-colecciones.png
   ├── 03-planta.png
   └── 04-planta-diagnóstico.png
   ```

4. **La primera imagen es también la portada de la tarjeta** en la home. Para usar otra,
   poné `"cover"` en `projects.json` con ese nombre de archivo
   (por ejemplo `"cover": "03-planta.png"`).

5. **Las leyendas son opcionales y bilingües.** Por defecto el texto alternativo es
   `"<Proyecto> captura N"` / `"<Project> screenshot N"`. Para darle una leyenda real
   (se muestra en el lightbox y se usa como `alt`), agregá el nombre del archivo dentro de
   `captions` en `projects.json`:

   ```json
   "captions": {
     "02-colecciones.png": {
       "es": "Colecciones de plantas del usuario",
       "en": "The user's plant collections"
     }
   }
   ```

   Solo necesitan entrada los archivos que quieras describir. Si una leyenda es igual en los
   dos idiomas, alcanza con poner el string suelto: `"07-mapa.png": "Google Maps"`.

## Notas

- Un proyecto con la carpeta vacía simplemente no muestra galería, y su tarjeta cae al
  `public/placeholder.jpeg`. No se rompe nada.
- Los archivos `.gitkeep` existen solo para que git registre las carpetas vacías. Una vez que
  la carpeta tiene capturas reales, se puede borrar su `.gitkeep`.
- Para sumar capturas de un proyecto **nuevo**, creá una carpeta con el `slug` de ese proyecto.
- Las capturas quedan públicas en el sitio: asegurate de que no tengan datos personales reales
  (nombres de pacientes, emails, tokens, datos de ciudadanos). Usá datos de demo.
