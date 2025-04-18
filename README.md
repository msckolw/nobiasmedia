# Nobias Media Website

A full-stack news website with React frontend and Node.js backend, featuring a main news portal and an admin panel for content management.

## Project Structure

```
media-website/
├── backend/          # Node.js backend API
│   ├── src/         # Source files
│   └── package.json # Backend dependencies
│
└── frontend/        # React frontend application
    ├── src/         # Source files
    │   ├── pages/   # Page components
    │   │   ├── Home.js        # Main website
    │   │   └── AdminPanel.js  # Admin panel
    │   ├── components/        # Reusable components
    │   └── services/         # API services
    ├── public/      # Static files
    └── package.json # Frontend dependencies
```

## Features

### Main Website (www.thenobiasmedia.com)
- Responsive news portal
- Category-based news browsing
- Article detail pages
- Search functionality
- User authentication

### Admin Panel (www.thenobiasmedia.com/admin)
- Secure login system
- News article management
  - Create new articles
  - Edit existing articles
  - Delete articles
  - Upload images
- Category management
- User management
- Analytics dashboard

## Setup Instructions

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Access the application:
   - Main website: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Deployment
- Frontend (Main Website + Admin Panel) is deployed on Vercel
  - Main website: www.thenobiasmedia.com
  - Admin panel: www.thenobiasmedia.com/admin
- Backend is deployed on Render

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5002
REACT_APP_MAIN_DOMAIN=https://www.thenobiasmedia.com
REACT_APP_ADMIN_PATH=/admin
```

### Backend (.env)
```
PORT=5002
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Security
- Admin panel is protected with JWT authentication
- Role-based access control for admin features
- Secure API endpoints
- Environment variables for sensitive data

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
