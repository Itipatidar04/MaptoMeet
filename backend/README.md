MapToMeet Frontend
Overview

MapToMeet is a smart urban route optimization and geospatial intelligence platform.

The frontend is currently focused on building the foundational geospatial interface using:

React
TypeScript
Vite
TailwindCSS
Mapbox GL

The current implementation supports:

interactive map rendering,
geospatial visualization,
and frontend infrastructure setup.

Context-aware route optimization
Frontend Folder Structure
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts

3. Install Dependencies

npm install
Required Dependencies
Install Core Dependencies
npm install axios mapbox-gl react-map-gl
Install TailwindCSS
npm install -D tailwindcss@3 postcss autoprefixer
Initialize Tailwind
npx tailwindcss init -p
Tailwind Configuration
Update tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Update src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
Mapbox Setup
1. Create .env

Inside frontend/.env

VITE_MAPBOX_TOKEN=your_mapbox_token
2. Get Token

Create free token from:

https://account.mapbox.com

Run Development Server
npm run dev

Frontend runs at:

http://localhost:5173
