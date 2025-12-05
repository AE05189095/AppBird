# AppBird — Grabaciones de Aves (Guatemala)

Aplicación web móvil en React + Vite que consume la API pública de Xeno-Canto para mostrar grabaciones de aves en Guatemala.

---

**Enlace API usada:** https://xeno-canto.org/api/2/recordings?query=cnt:guatemala

## Requisitos del sistema

- Node.js >= 16 (recomendado) y npm
- Windows / macOS / Linux
- Conexión a internet para consumir la API pública

## Instalación

Desde la carpeta del proyecto (`AppBird`):

```powershell
npm install
npm run dev
```

Comandos principales:

- `npm install` — instala dependencias
- `npm run dev` — inicia servidor de desarrollo Vite
- `npm run build` — crea build de producción
- `npm run preview` — sirve el build localmente

## Estructura del proyecto

- `index.html` — entrada HTML
- `src/main.jsx` — montaje de React
- `src/App.jsx` — componente raíz (header/footer)
- `src/components/RecordingsList.jsx` — lista, búsqueda y paginación
- `src/components/RecordingCard.jsx` — tarjeta de cada grabación
- `src/styles/App.css` — estilos principales (diseño móvil)
- `src/index.css` — estilos base

## Qué hace la app

- Obtiene grabaciones desde Xeno-Canto filtradas por `cnt:guatemala`.
- Muestra por cada grabación: nombre (común y científico), ubicación, quién la grabó, reproductor de audio y enlace a Xeno-Canto.
- Incluye paginación (navegar entre páginas devueltas por la API).
- Búsqueda opcional por texto (filtra la consulta a la API).
- Muestra mensajes de carga y errores cuando la API falla.

## Capturas de pantalla

(Agregar capturas aquí antes de entregar)

- Pantalla principal (móvil): `screenshots/main-mobile.png`
- Tarjeta de grabación: `screenshots/card.png`

## Notas de desarrollo y decisiones

- La búsqueda envía el texto como término adicional a la query `cnt:guatemala {termino}`. Xeno-Canto realiza búsquedas libres entre campos relevantes.
- Se gestionan `numPages` y `numRecordings` devueltos por la API para controlar la paginación.
- Se añadieron mensajes de error y un fallback cuando no hay audio disponible.

## Cómo entregar

- Comprimir la carpeta `AppBird` con el código y el `README.md` completo.
- Asegurarse de incluir capturas en `screenshots/` si son solicitadas.

---

Si quieres, puedo:

- Ejecutar la app localmente aquí y reportar errores de consola.
- Añadir test básico o preparar un build de producción.
- Insertar marcadores de imagen reales en README o generar screenshots.

