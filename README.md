# 🏪 Local Shop Registry

> A modern, full-stack web application that empowers users to **discover, register, and search** local shops with real-time location intelligence powered by the Google Places API.

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure Sign Up, Log In, and Log Out with persistent sessions via Supabase Auth |
| 🛡️ **Protected Routes** | Unauthorized users are automatically redirected to the login page |
| 🏬 **Shop Registration** | Register shops with Google Places Autocomplete — auto-captures full address, lat/lng & Place ID |
| 🔍 **Smart Search** | Search shops by name, category, or location with real-time distance calculation |
| 🌙 **Dark Mode** | System preference detection with a manual toggle for full control |
| 📱 **Responsive Design** | Mobile-first layout that works beautifully on all screen sizes |
| 💎 **Modern UI** | Glassmorphism effects, smooth gradients, and polished micro-animations |
| ⚠️ **Error Boundary** | Graceful error handling with a dedicated Error Boundary component |
| 🍞 **Toast Notifications** | User-friendly feedback for all actions via `react-hot-toast` |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React + Vite | 19 / 6 |
| **Styling** | Tailwind CSS | v4 |
| **Routing** | React Router DOM | v7 |
| **Backend / Auth** | Supabase (Auth + PostgreSQL) | Latest |
| **Location** | Google Places API (New) | — |
| **Notifications** | react-hot-toast | v2 |
| **Deployment** | Vercel | — |

---

## 📁 Project Structure

```
local-shop-registry/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ErrorBoundary.jsx   # Global error boundary
│   │   ├── Loader.jsx          # Loading spinner
│   │   ├── Navbar.jsx          # Top navigation bar with dark mode toggle
│   │   ├── PlacesAutocomplete.jsx  # Google Places input widget
│   │   ├── ProtectedRoute.jsx  # Auth guard for private routes
│   │   ├── SearchBar.jsx       # Search input with filters
│   │   ├── ShopCard.jsx        # Individual shop card display
│   │   ├── ShopForm.jsx        # Shop registration/edit form
│   │   └── Toast.jsx           # Toast notification provider
│   ├── context/              # React Context providers
│   │   └── AuthContext.jsx     # Global authentication state
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.jsx         # Auth state hook
│   │   ├── useDebounce.js      # Input debounce hook
│   │   └── useShops.js         # Shops data fetching hook
│   ├── pages/                # Route-level page components
│   │   ├── Dashboard.jsx       # Home page — lists all registered shops
│   │   ├── Login.jsx           # Login page
│   │   ├── NotFound.jsx        # 404 page
│   │   ├── RegisterShop.jsx    # Shop registration page
│   │   ├── SearchShop.jsx      # Shop search & discovery page
│   │   └── Signup.jsx          # New user registration page
│   ├── services/             # External service integrations
│   │   ├── googlePlaces.js     # Google Places API client
│   │   └── supabase.js         # Supabase client initialization
│   ├── utils/                # Utilities and constants
│   │   ├── constants.js        # App-wide constants
│   │   └── validators.js       # Form validation helpers
│   ├── App.jsx               # Root component with routing setup
│   ├── index.css             # Global styles & Tailwind directives
│   └── main.jsx              # App entry point
├── supabase_migration.sql    # Database schema & RLS policies
├── .env.example              # Environment variable template
├── vercel.json               # Vercel deployment config
├── vite.config.js            # Vite build config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- A **[Supabase](https://supabase.com)** project (free tier works great)
- A **[Google Cloud](https://console.cloud.google.com)** project with **Maps JavaScript API** and **Places API (New)** enabled

---

### 1. Clone the repository

```bash
git clone https://github.com/rojinroyjo24/Local_shop_registry.git
cd Local_shop_registry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

> **Where to find these:**
> - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` → Supabase Dashboard → Project Settings → API
> - `VITE_GOOGLE_MAPS_API_KEY` → Google Cloud Console → APIs & Services → Credentials

### 4. Set up the database

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Paste and run the contents of [`supabase_migration.sql`](./supabase_migration.sql)

This creates the `shops` table, indexes, Row Level Security policies, and the `updated_at` trigger.

### 5. Start the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

---

## 🗄️ Database Schema

### `shops` table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PRIMARY KEY | Auto-generated unique identifier |
| `user_id` | `UUID` | NOT NULL, FK → `auth.users` | Owner of the shop |
| `shop_name` | `TEXT` | NOT NULL | Name of the shop |
| `description` | `TEXT` | — | Optional shop description |
| `category` | `TEXT` | NOT NULL | Business category |
| `address` | `TEXT` | NOT NULL | Full address from Google Places |
| `latitude` | `DOUBLE PRECISION` | NOT NULL | GPS latitude coordinate |
| `longitude` | `DOUBLE PRECISION` | NOT NULL | GPS longitude coordinate |
| `place_id` | `TEXT` | NOT NULL | Google Place ID |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `now()` | Auto-updated on every change |

### Indexes

| Index | Column | Type | Purpose |
|-------|--------|------|---------|
| `idx_shops_user_id` | `user_id` | B-tree | Fast user-specific queries |
| `idx_shops_category` | `category` | B-tree | Category filtering |
| `idx_shops_place_id` | `place_id` | B-tree | Place ID lookups |
| `idx_shops_shop_name` | `shop_name` | GIN (full-text) | Fast text search |

### Row Level Security (RLS) Policies

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can view shops | `SELECT` | `true` (public read) |
| Users can insert own shops | `INSERT` | `auth.uid() = user_id` |
| Users can update own shops | `UPDATE` | `auth.uid() = user_id` |
| Users can delete own shops | `DELETE` | `auth.uid() = user_id` |

---

## 🌐 Deployment on Vercel

1. **Push** your code to GitHub
2. Go to **[Vercel](https://vercel.com)** → **New Project** → Import your repository
3. Add the following **Environment Variables** in the Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`
4. Click **Deploy** — Vercel auto-detects Vite and handles the build

The included [`vercel.json`](./vercel.json) ensures all routes are properly redirected to `index.html` for client-side routing.

---

## 🔑 Application Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | 🔒 Protected | Dashboard — view all registered shops |
| `/register` | 🔒 Protected | Register a new shop |
| `/search` | 🔒 Protected | Search and discover shops |
| `/login` | 🌐 Public | User login |
| `/signup` | 🌐 Public | New user registration |
| `*` | 🌐 Public | 404 Not Found page |

---

## 📜 Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## 📝 License

This project is open source and available under the [MIT License](./LICENSE).

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/rojinroyjo24">rojinroyjo24</a></p>
</div>