# FaceTrace AI - Frontend

React + Vite frontend for FaceTrace AI OSINT platform.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Configure environment variables:
   - `VITE_API_URL` = Your backend URL

### Environment Variables

- **Development**: `.env` (localhost:3000)
- **Production**: Set `VITE_API_URL` in Vercel dashboard

Example:
```
VITE_API_URL=https://your-backend-api.com
```

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Icons
