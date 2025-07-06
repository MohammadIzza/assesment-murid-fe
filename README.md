# Assessment Murid Webapp

## Project Overview

Aplikasi web untuk sistem assessment murid sekolah yang dibangun dengan Vue.js 3. Aplikasi ini menyediakan platform untuk mengelola dan memantau assessment siswa dengan interface yang modern dan responsif.

## Tech Stack

- **Vue.js 3** - Progressive JavaScript Framework
- **Vue Router 4** - Official router untuk Vue.js
- **Pinia** - State management library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client untuk API calls
- **Chart.js** - Library untuk data visualization
- **Vite** - Build tool dan development server

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Features

- 🔐 **Authentication System** - Login/Register dengan role-based access
- 👤 **Multi-Role Support** - User dan Admin dengan akses berbeda
- 📊 **Dashboard Analytics** - Statistik dan grafik assessment
- 📝 **Assessment Management** - CRUD operations untuk assessment
- 🔍 **Filter & Search** - Pencarian dan filter assessment
- 📱 **Responsive Design** - Tampilan optimal di semua device
- ⚡ **Modern UI/UX** - Interface yang clean dan user-friendly

## Project Structure

```
src/
├── components/     # Reusable Vue components
├── layouts/        # Layout templates
├── views/          # Page components
├── stores/         # Pinia stores
├── router/         # Vue Router configuration
├── plugins/        # Third-party plugins
├── helpers/        # Utility functions
└── assets/         # Static assets
```
