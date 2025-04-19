# GoInvesto Deployment Guide for cPanel

## Frontend (Next.js)

1. Build static frontend:

```bash
cd goinvesto-frontend
npm install
npm run build
npm run export
```

2. The static files will be in `out/` directory.

3. Upload the contents of `out/` to your cPanel `public_html/` directory.

## Backend (Node.js + Express)

1. Upload the `goinvesto-backend` folder to your cPanel server.

2. Use cPanel's "Setup Node.js App" feature:

- Create a new Node.js app.
- Set the app root to the backend folder.
- Set the startup file to `server.js`.
- Set environment variables like `MONGO_URI` and `JWT_SECRET`.

3. Install dependencies via cPanel terminal or SSH:

```bash
npm install
```

4. Start the app using cPanel's Node.js app manager.

## Database

- Use MongoDB Atlas or any external MongoDB service.
- Configure `MONGO_URI` environment variable accordingly.

## Notes

- Frontend is served as static files.
- Backend runs as a separate Node.js app.
- Ensure CORS is configured properly in backend to allow frontend requests.
- Use PM2 or cPanel's app manager to keep backend running.
