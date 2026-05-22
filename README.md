# Coup Frontend

A React + Vite frontend for the Coup card game.

## Development

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:8080` |
| `VITE_WEBSOCKET_URL` | WebSocket URL (optional, derived from BACKEND_URL if not set) | `ws://localhost:8080/ws` |

### Example `.env` file

```env
VITE_BACKEND_URL=https://backend.coup.example.com
VITE_WEBSOCKET_URL=wss://backend.coup.example.com/ws
```

## Production Build

```bash
npm run build
```

The built files will be in `dist/`. Serve with any static file server (nginx, etc).

### Example nginx config

```nginx
server {
    server_name coup.example.com;
    root /path/to/coup-frontend/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Mobile Support

The UI is responsive and works on mobile devices.
