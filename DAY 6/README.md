# 🔥 Recharge Management System

A complete React-based mobile recharge management system with admin dashboard, user authentication, and MockAPI integration.

## ✨ Features

### User Features
- **Card-Based Dashboard** - Clean, glassmorphism design with hover effects
- **Recharge Plans** - Browse and select from various mobile plans
- **Payment Processing** - Simulated payment with multiple methods
- **Payment History** - View all transaction history
- **SIM Details** - Check balance, validity, and data usage
- **Quick Recharge** - Instant recharge with preset amounts
- **Support & Help** - Contact support and FAQ section

### Admin Features
- **Plan Management** - Add, edit, delete recharge plans
- **Payment Monitoring** - View all user payments
- **User Management** - View registered users
- **Dashboard Analytics** - Overview of system statistics

### Technical Features
- **Authentication** - Role-based access (User/Admin)
- **Protected Routes** - Secure navigation
- **MockAPI Integration** - RESTful API operations
- **Responsive Design** - Desktop-first layout
- **Modern UI** - Purple gradient theme with glassmorphism

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-recharge-claude
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔐 Demo Credentials

### User Login
- **Username:** `user`
- **Password:** `user123`

### Admin Login
- **Username:** `admin`
- **Password:** `admin123`

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Lucide React
- **API:** Axios + MockAPI
- **State Management:** React Context API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   └── ProtectedRoute.jsx
├── context/            # React Context providers
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Plans.jsx
│   ├── Payment.jsx
│   ├── History.jsx
│   ├── AdminDashboard.jsx
│   ├── SimDetails.jsx
│   ├── QuickRecharge.jsx
│   └── Support.jsx
├── services/           # API services
│   └── api.js
└── App.jsx            # Main app component
```

## 🎨 Design System

### Colors
- **Primary:** `#6A35FF` (Purple)
- **Accent:** `#FF6B35` (Orange)
- **Dark:** `#1a1a2e`
- **Darker:** `#16213e`

### Components
- **Glass Cards** - Backdrop blur with transparency
- **Gradient Backgrounds** - Multi-color gradients
- **Hover Effects** - Smooth transitions
- **Responsive Grid** - Flexbox layouts

## 🔌 API Integration

The app uses MockAPI for backend simulation:

### Endpoints
- `/users` - User management
- `/plans` - Recharge plans CRUD
- `/payments` - Payment transactions

### Sample API Setup
1. Create account at [MockAPI.io](https://mockapi.io)
2. Update `BASE_URL` in `src/services/api.js`
3. Create the required collections

## 📱 Pages Overview

### User Pages
1. **Login** - Authentication with role selection
2. **Dashboard** - Card-based navigation hub
3. **Plans** - Browse recharge plans with filters
4. **Payment** - Secure payment processing
5. **History** - Transaction history with stats
6. **SIM Details** - Account information
7. **Quick Recharge** - Fast recharge options
8. **Support** - Help and contact options

### Admin Pages
1. **Admin Dashboard** - Management interface with sidebar
2. **Plan Management** - CRUD operations for plans
3. **Payment Monitoring** - View all transactions
4. **User Management** - User overview

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Customization

### Changing Colors
Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      accent: '#YOUR_ACCENT',
    }
  }
}
```

### Adding New Features
1. Create component in `src/components/`
2. Add page in `src/pages/`
3. Update routing in `src/App.jsx`
4. Add API endpoints in `src/services/api.js`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support and questions:
- Email: support@recharge.com
- Phone: 1800-123-4567
- Live Chat: Available in app

---

**Built with ❤️ using React + Vite**