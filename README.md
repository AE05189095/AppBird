# AppBird  Grabaciones de Aves (Guatemala)

Pequeña aplicación React + Vite que consume grabaciones de aves desde XenoCanto (vía un proxy local).

## Resumen
- Frontend: React + Vite (carpeta raíz).
- Backend (proxy): un pequeño servidor Express en `server/` que reenvía peticiones a la API pública de XenoCanto usando una API key.

## Requisitos
- Node.js >= 18
- npm (viene con Node)

## Variables de entorno importantes (backend)
Crea un archivo `server/.env` o exporta en el entorno la variable:

- `XENOCANTO_KEY`  tu clave de API para XenoCanto (si no la pones, el proxy mostrará un aviso y la ruta `/api/recordings` fallará).
- `PORT`  (opcional) puerto donde correrá el proxy (por defecto `5175`).
- `CORS_ORIGIN`  (opcional) orígenes permitidos para CORS (por defecto `*`).

Ejemplo `server/.env`:

```
XENOCANTO_KEY=tu_clave_aqui  (Debes registrarte en la web de xeno canto y en la seccion https://xeno-canto.org/account tendras la api Key)
PORT=5175
CORS_ORIGIN=http://localhost:5173
```

## Ejecutar en desarrollo (recomendado)
1. Abrir una terminal y arrancar el backend (proxy):

```powershell
cd AppBird/server
npm install
npm run dev
```

2. En otra terminal, arrancar el frontend (Vite):

```powershell
cd AppBird
npm install
npm run dev
```

- El frontend por defecto correrá en `http://localhost:5173` (Vite puede usar otro puerto si está ocupado).
- El proxy escucha en `http://localhost:5175` por defecto. El frontend hace peticiones a `/api/recordings` que son atendidas por el proxy.

## Scripts útiles
Desde la carpeta raíz `AppBird`:

- `npm run dev`  arranca Vite (frontend).
- `npm run build`  construye el frontend para producción.
- `npm run preview`  previsualiza la build localmente.
- `npm run start:proxy`  arranca el proxy (`server/index.js`) desde la raíz (usa `node server/index.js`).

Desde `AppBird/server`:

- `npm run dev`  arranca el servidor en modo desarrollo.
- `npm start`  arranca el servidor en modo producción.

## Estructura relevante del proyecto
```
AppBird/
  src/                # código frontend (React)
  public/             # assets estáticos
  server/             # pequeño proxy Express para Xeno-Canto
    index.js
    package.json
  package.json        # scripts del frontend
  README.md
```

## Notas y recomendaciones
- Si ves errores relacionados con la API de XenoCanto, revisa que `XENOCANTO_KEY` esté configurada en `server/.env` y que el backend se esté ejecutando.
- En desarrollo el scroll se maneja en el contenedor principal para que el header quede fijo y el scroll comience debajo del header.
- Para depuración de overflow horizontal (si ves espacios blancos a derecha): abre DevTools en `Elements` y ejecuta en la consola:

```javascript
document.body.scrollWidth > window.innerWidth
Array.from(document.querySelectorAll('*')).filter(el => el.scrollWidth > window.innerWidth).map(el => el.tagName + (el.id?('#'+el.id):'') + (el.className?('.'+el.className.replace(/\s+/g,'.')):''))
```






