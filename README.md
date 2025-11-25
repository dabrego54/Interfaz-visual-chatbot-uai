# Interfaz visual para chatbot UAI

Interfaz web creada con Next.js 14 y Tailwind CSS que funciona como frontend para un flujo de automatización en n8n. Permite a estudiantes y personal de la UAI interactuar con el asistente, enviar prompts rápidos y visualizar el estado de conexión con el workflow remoto.

## Requisitos previos
- Node.js 18 o superior
- npm o pnpm (ejemplos de comandos usan `npm`)
- URL pública del webhook de n8n al que se conectará la aplicación

## Instalación y puesta en marcha
1. Clona el repositorio y accede al directorio del proyecto:
   ```bash
   git clone https://github.com/<tu-usuario>/Interfaz-visual-chatbot-uai.git
   cd Interfaz-visual-chatbot-uai
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` en la raíz con la variable de entorno requerida por el proxy hacia n8n:
   ```bash
   N8N_WEBHOOK_URL=https://mi-instancia-n8n.com/webhook/mi-flujo
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La app quedará disponible en `http://localhost:3000`.

## Conexión con un flujo de n8n
- La API interna `app/api/chat/route.ts` hace de proxy y envía las solicitudes al webhook configurado en `N8N_WEBHOOK_URL`.
- El panel lateral muestra el estado de conectividad con el workflow y ofrece atajos de prompts.
- Asegúrate de que el webhook de n8n acepte peticiones `POST` con cuerpo JSON y devuelva una respuesta JSON que la interfaz pueda renderizar.

## Contribución
¡Las contribuciones son bienvenidas! Para proponer mejoras o correcciones:
1. Haz un fork del repositorio y crea una rama descriptiva desde `main` (por ejemplo, `feature/mejora-sidebar`).
2. Aplica tus cambios siguiendo el estilo del proyecto (Next.js + TypeScript + Tailwind CSS).
3. Ejecuta las comprobaciones locales antes de enviar tu PR:
   ```bash
   npm run lint
   npm run build
   ```
4. Abre un Pull Request detallando el cambio, su motivación y cómo probarlo. Incluye capturas si la modificación afecta a la UI.

## Scripts útiles
- `npm run dev`: arranca el entorno de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run start`: levanta el servidor con el build generado.
- `npm run lint`: ejecuta ESLint para asegurar la calidad del código.

## Estructura breve del proyecto
- `app/`: rutas y APIs de Next.js.
- `components/`: componentes UI reutilizables (incluye `Sidebar` con el indicador de conexión a n8n).
- `lib/` y `types/`: utilidades y definiciones compartidas.

## Licencia
Este proyecto se distribuye para uso académico. Asegúrate de revisar y respetar las políticas institucionales aplicables.
