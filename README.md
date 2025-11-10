# Sistema Integral de Circuitos Turísticos Interactivos

Sistema para recorrer circuitos turísticos interactivos en la ciudad de Córdoba, incluyendo funcionalidades como visualización de mapas, información de puntos de interés y modo de realidad aumentada.

## Requisitos previos

- Git y Visual Studio Code
- Node.js ≥ 18
- Python 3.10+
- PostgreSQL + pgAdmin (asegurarse de agregar al Path durante la instalación)

## Guía para levantar el proyecto localmente (desarrollo)

1. Clonar el repositorio

```bash
git clone https://github.com/joelmattieu/sistema-circuitos-turisticos.git
cd sistema-circuitos-turisticos
```

2. Backend

```bash
cd backend
```

- macOS

```bash
# Creación de entorno virtual y activación
python -m venv .venv
source .venv/bin/activate

# Instalación de dependencias en el entorno
pip install -r requirements.txt

# Asegurarse de que PostgreSQL esté corriendo y que exista la base de datos (ver nota abajo)
uvicorn main:app --reload --port 8000
```

- Windows (CMD)

```bash
# Creación de entorno virtual y activación
python -m venv .venv
.venv\Scripts\activate

# Instalación de dependencias en el entorno
pip install -r requirements.txt

# Asegurarse de que PostgreSQL esté corriendo y que exista la base de datos (ver nota abajo)
uvicorn main:app --reload --port 8000
```

## Nota sobre PostgreSQL

Asegurarse de que PostgreSQL esté en ejecución y crear la base de datos con el nombre que se vaya a usar (se puede crear desde pgAdmin). Definir la URL de conexión con las credenciales propias en `backend/.env` usando la variable DATABASE_URL (reemplazar usuario:contraseña y nombre_de_la_bd):

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_de_la_bd
```

Levantar el backend con Uvicorn; las tablas se crearán automáticamente si la base de datos existe.

1. Frontend

```bash
cd ../frontend
```

- Con npm

```bash
npm install
npm run dev   # abre: http://localhost:3000
```

- Con yarn

```bash
yarn install
yarn dev      # abre: http://localhost:3000
```

## Variables de entorno

- Copiar y completar con las credenciales:
  - `backend/.env.example` → `backend/.env`
  - `frontend/.env.local.example` → `frontend/.env.local`
- IMPORTANTE: No subir archivos con credenciales al repositorio público.

## URLs locales

- Frontend: http://localhost:3000
- Documentación FastAPI: http://127.0.0.1:8000/docs

## Autor y repositorio

- Autor: Joel Mattieu
- Repositorio: https://github.com/joelmattieu/sistema-circuitos-turisticos

## Demo

- [Ver prototipo interactivo en Figma](https://www.figma.com/proto/EavpxAYgOYFviEqzJpPl9A/DISE%C3%91O-PROTOTIPOS-PANTALLAS?node-id=25-2259&p=f&t=RR8qoAfF202GKbvc-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=28%3A134)
