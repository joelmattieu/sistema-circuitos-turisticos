#!/bin/bash

# Levanta backend (FastAPI) y frontend (Next.js) en paralelo.
# Uso: ./dev.sh

cd "$(dirname "$0")"

cleanup() {
  echo ""
  echo "Deteniendo servidores..."
  pkill -P $BACKEND_PID 2>/dev/null
  pkill -P $FRONTEND_PID 2>/dev/null
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}
trap cleanup INT TERM

LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
echo "Iniciando backend en https://${LOCAL_IP:-127.0.0.1}:8000 ..."
cd backend
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 \
  --ssl-keyfile ../frontend/localhost+ip-key.pem \
  --ssl-certfile ../frontend/localhost+ip.pem &
BACKEND_PID=$!
cd ..

echo "Iniciando frontend en https://localhost:3000 ..."
cd frontend
npm run dev:https &
FRONTEND_PID=$!
cd ..

echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Ctrl+C para detener ambos."

wait
