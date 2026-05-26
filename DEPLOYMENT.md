# VeriChain Deployment

## Important Security Step

The local `backend/.env` contains secrets. Do not commit it or paste those values into public messages. Rotate the exposed blockchain private key before deploying, then add the new values only in your hosting provider dashboard.

## Recommended Hackathon Deployment

Use Render for both services:

- Backend: Node web service
- Frontend: static Create React App site
- MongoDB: MongoDB Atlas connection string

This repo includes `render.yaml`, so Render can create both services from one Blueprint.

## Render Blueprint Steps

1. Push the repo to GitHub.
2. Open Render and create a new Blueprint from the repo.
3. Render will detect `render.yaml`.
4. Add backend environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `RPC_URL`
   - `PRIVATE_KEY`
   - `CONTRACT_ADDRESS`
   - `CORS_ORIGIN`
   - `FRONTEND_URL`
5. Add frontend environment variable:
   - `REACT_APP_API_URL`
6. Deploy the backend first, then set:
   - `REACT_APP_API_URL=https://your-backend-service.onrender.com/api`
   - `CORS_ORIGIN=https://your-frontend-service.onrender.com`
   - `FRONTEND_URL=https://your-frontend-service.onrender.com`
7. Redeploy both services.

## Manual Render Settings

Backend service:

```txt
Root Directory: backend
Build Command: npm install
Start Command: npm start
Health Check Path: /health
```

Frontend static site:

```txt
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build
```

Add a rewrite for React Router:

```txt
/* -> /index.html
```

## Local Production Check

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run build
```

## Environment Examples

Copy examples locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

For Create React App, browser-visible environment variables must start with `REACT_APP_`.
