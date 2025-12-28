# ShareFly - Social Media Application

> **Tugas Besar Pemeliharaan Perangkat Lunak**  
> Semester 7 - 2024/2025

## 📋 Deskripsi

ShareFly adalah aplikasi **media sosial** berbasis web yang memungkinkan pengguna untuk berbagi posts, stories, dan berinteraksi dengan pengguna lain melalui likes dan comments.

## 🛠️ Tech Stack

| Layer              | Technology                                           |
| ------------------ | ---------------------------------------------------- |
| **Backend**        | Laravel 11 (PHP 8.2+)                                |
| **Frontend**       | React 18 + TypeScript                                |
| **Bridge**         | Inertia.js                                           |
| **Styling**        | TailwindCSS                                          |
| **UI Components**  | Radix UI / Shadcn UI                                 |
| **Database**       | SQLite / MySQL                                       |
| **Authentication** | Laravel Breeze + Socialstream (Google, TikTok OAuth) |

## ✨ Features

-   🔐 **Authentication** - Register, Login, OAuth (Google & TikTok)
-   📝 **Posts** - Create, view, like, dan comment
-   📖 **Stories** - Story sementara seperti Instagram
-   👤 **Profile** - Edit profil, bio, avatar
-   📊 **Admin Dashboard** - Kelola users dan posts
-   💬 **Chat** - Fitur messaging (in development)

## 🚀 Installation

### Prerequisites

-   PHP 8.2+
-   Composer
-   Node.js 18+
-   npm

### Setup

```bash
# Clone repository
git clone https://github.com/herdysh30/ShareFly-PPL.git
cd ShareFly-PPL

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations with seeder
php artisan migrate --seed

# Start development server
composer run dev
```

Aplikasi akan berjalan di `http://127.0.0.1:8000`

## 📁 Project Structure

```
ShareFly-PPL/
├── app/
│   ├── Http/Controllers/    # Controller classes
│   ├── Models/              # Eloquent models
│   └── Actions/             # Action classes
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/             # Database seeders
│   └── factories/           # Model factories
├── resources/
│   ├── js/
│   │   ├── components/      # React components
│   │   ├── pages/           # Inertia pages
│   │   ├── layouts/         # Layout components
│   │   └── hooks/           # Custom React hooks
│   └── css/                 # Stylesheets
├── routes/
│   ├── web.php              # Web routes
│   ├── auth.php             # Authentication routes
│   └── api.php              # API routes
└── tests/                   # Test files
```

## 🔧 Software Maintenance

Repository ini digunakan untuk **Tugas Besar Pemeliharaan Perangkat Lunak** dengan fokus pada:

### Corrective Maintenance

-   Fix bugs dan errors yang ditemukan

### Adaptive Maintenance

-   Update dependencies dan library
-   Penyesuaian environment

### Perfective Maintenance

-   Peningkatan kualitas kode
-   Penambahan fitur
-   Optimasi performa

## 📝 License

MIT License

## 👥 Contributors

-   Cookie-Army Team (Original Development)
-   Herdy (Software Maintenance)
