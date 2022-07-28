# Notes App

Aplicación de notas creada como reto puesto de FullStack developer.

## [Portafolio](https://portfolio-jdsotoc.vercel.app/)

## IMPORTANTE

**Ejecutar `.\backend.sh` para instalar dependencias y ejecutar el servidor**

**Ejecutar `.\frontend.sh` para instalar dependencias y ejecutar la aplicación**

**Ingresar con el usuario *test@test.com* y contraseña _123456_**

[Notes App](https://notes-app-juandsoto.vercel.app/)

> Desafortunadamente no conseguí desplegar el servidor, por lo cual el frontend desplegado muestra solo la UI, sin embargo, tanto el backend como el frontend funcionan localmente, y para esto se recomienda ejecutar los scripts mencionados anteriormente.

_En caso de no funcionar los scripts, asegurarse de darle permisos con el comando `chmod + nombre-del-script.sh` y posteriormente ejecutar el ambos scripts asi: `.\nombre-del-script.sh`_

---

## Herramientas principales

- node@16.13.0
- npm@8.3.0
- express@4.18.1
- react@18.0.15
- typescript@4.7.4

## Dependencias Frontend

- "@testing-library/jest-dom": "^5.16.4",
- "@testing-library/react": "^13.3.0",
- "@testing-library/user-event": "^13.5.0",
- "formik": "^2.2.9",
- "framer-motion": "^6.5.1",
- "lodash": "^4.17.21",
- "moment": "^2.29.4",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-hot-toast": "^2.3.0",
- "react-icons": "^4.4.0",
- "react-router-dom": "^6.3.0",
- "react-scripts": "5.0.1",
- "react-spinners": "^0.13.3",
- "web-vitals": "^2.1.4",
- "yup": "^0.32.11"

### Dependencias de desarrollo Frontend

- "@types/jest": "^27.5.2",
- "@types/node": "^16.11.45",
- "@types/react": "^18.0.15",
- "@types/react-dom": "^18.0.6",
- "typescript": "^4.7.4",

## Dependencias Backend

- "argon2": "^0.28.7",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.0.1",
- "express": "^4.18.1",
- "helmet": "^5.1.1",
- "http-status-codes": "^2.2.0",
- "jsonwebtoken": "^8.5.1",
- "pg": "^8.7.3",
- "pg-hstore": "^2.3.4",
- "sequelize": "^6.21.3",
- "zod": "^3.17.10",
- "zod-express-middleware": "^1.4.0"

### Dependencias de desarrollo Backend

- "@types/cookie-parser": "^1.4.3",
- "@types/cors": "^2.8.12",
- "@types/express": "^4.17.13",
- "@types/helmet": "^4.0.0",
- "@types/jsonwebtoken": "^8.5.8",
- "@types/sequelize": "^4.28.14",
- "ts-node-dev": "^2.0.0",
- "typescript": "^4.7.4"
