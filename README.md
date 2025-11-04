# Creative Survey Application

A modern, engaging survey application built with React, TypeScript, and creative interactive mechanics.

## 🚀 Quick Deploy to Vercel

### Option 1: Direct Vercel Deployment (Recommended)
1. **Clone** this repository
2. **Connect** to Vercel dashboard
3. **Import** project  
4. **Configure Environment Variables** (see below)
5. **Deploy**

### Option 2: V0 Deployment
1. **Download** this project as a ZIP file
2. **Upload** to [V0.dev](https://v0.dev)
3. **Deploy** directly to Vercel
4. **Add Environment Variables** in Vercel dashboard

## ⚙️ Environment Variables

Create a `.env.local` file in your project root with:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key  
VITE_GROQ_API_KEY=your_groq_api_key
```

For Vercel deployment, set these in your project settings.

## 📦 Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build:prod

# Preview production build
pnpm preview
```

## 🎨 Features

- **Creative Survey Mechanics**: Interactive question types with rich animations
- **Flip Card Animations**: 3D flip animations for personality assessments
- **Drag & Drop Ranking**: Intuitive priority sorting interface
- **Timed Decisions**: Urgency-based question mechanics
- **Visual Preferences**: Image-based choice selection
- **Confetti Celebrations**: Achievement and progress celebrations
- **Mobile Optimized**: Touch-friendly interactions and responsive design
- **Authentication**: Secure user accounts with Supabase
- **AI Integration**: Groq AI for personalized insights

## 🛠️ Build & Deployment

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Animations**: Framer Motion + Canvas Confetti
- **Backend**: Supabase (Database, Auth, Storage)
- **AI**: Groq API integration
- **Deployment**: Vercel (optimized)

## 📊 Bundle Size

- **Current Build**: ~1.8MB (optimized for deployment)
- **Code Splitting**: Vendor, router, UI, motion, and supabase chunks
- **Performance**: 60fps animations, optimized loading

**Ready to deploy!** 🚀

Simply connect this repository to Vercel for instant deployment.