# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Build and Development
```powershell
# Install dependencies
bun install

# Start development server (default port: 5173)
bun dev

# Build for production
bun build

# Preview production build
bun run preview

# Run linting
bun run lint
```

### Environment Setup
```powershell
# Copy environment template (if exists)
cp .env.example .env

# Create environment file manually
New-Item -ItemType File -Name ".env"

# Edit environment variables (required before running)
notepad .env
```

### Essential Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_ENV=development
```

## Architecture Overview

### Technology Stack
- **React 19.0.0** - Modern UI framework with concurrent features
- **Vite 6.2.0** - Fast build tool and development server
- **TailwindCSS 4.1.4** - Utility-first CSS framework
- **Redux Toolkit** - State management with RTK Query
- **TanStack Query** - Server state management and caching
- **React Router v7** - Client-side routing with data loading
- **Motion (Framer Motion)** - Animation and gesture library

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base components (Input, Select, etc.)
│   ├── maps/            # Google Maps integration
│   ├── LoginForm.jsx    # Authentication components
│   ├── SignupForm.jsx
│   ├── CaptainForm.jsx
│   └── Navbar.jsx
├── pages/               # Route-level page components
│   ├── user/            # User-specific pages (UserHome, Profile)
│   ├── captain/         # Captain-specific pages (CaptainHome)
│   ├── Home.jsx         # Landing page
│   └── AuthPage.jsx     # Authentication wrapper
├── router/              # Routing configuration
│   ├── AppRoutes.jsx    # Main routes and nesting
│   └── ProtectedRoutes.jsx # Authentication guards
├── context/             # Redux state management
│   ├── store.js         # Redux store setup
│   └── slices/          # Feature-based slices
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useLogin.js      # Login flow management
│   ├── useSendOtp.js    # OTP sending logic
│   ├── usePostData.js   # Generic API mutations
│   └── useCurrentLocation.js # Geolocation hook
├── config/              # Configuration utilities
│   ├── axiosInstance.js # HTTP client with interceptors
│   └── apiService.js    # API service functions
├── lib/                 # Utility libraries
│   ├── utils.js         # General utilities (cn helper)
│   └── toast.js         # Toast notification helpers
└── assets/              # Static assets
```

### Key Architecture Patterns

**Component Composition**
- Higher-order components for authentication (`ProtectedRoute`)
- Compound components for complex UI (OTP inputs, form containers)
- Render prop pattern for data fetching hooks

**State Management Strategy**
- **Redux Toolkit** for global application state (auth, user data)
- **TanStack Query** for server state (API data, caching, background sync)
- **Local State** for component-specific UI state

**Routing Architecture**
- **Nested Routes** with outlet pattern for layout composition
- **Protected Routes** with role-based access control (user vs captain)
- **Route Guards** for authentication and authorization

**Data Fetching Patterns**
- **Custom Hooks** wrapping TanStack Query for reusable API calls
- **Optimistic Updates** for immediate UI feedback
- **Background Refetching** for data freshness

## Authentication Flow

### Registration Process
1. **Phone Input** → OTP generation and sending
2. **OTP Verification** → Phone number validation
3. **User Details** → Name, email, gender, country selection
4. **Account Creation** → JWT token generation and storage
5. **Auto-Login** → Redirect to appropriate dashboard

### Login Process
1. **Phone Entry** → Primary authentication method
2. **OTP Request** → Server generates and sends OTP
3. **OTP Validation** → Token-based authentication
4. **Role Detection** → Automatic routing (user/captain)

### Authentication State
```javascript
// Redux auth slice structure
{
  user: UserObject | null,           // User profile data
  token: string | null,             // JWT authentication token
  loading: boolean,                 // Request loading state
  error: string | null,             // Error messages
  isAuthenticated: boolean,         // Authentication status
  role: 'user' | 'captain' | null  // User role
}
```

## API Integration

### HTTP Client Setup
```javascript
// Axios instance with interceptors
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000
});

// Automatic token injection
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints Structure
- **Authentication** - `/auth/*` (login, registration, OTP)
- **Maps** - `/map/*` (geocoding, suggestions, routing)
- **Rides** - `/ride/*` (booking, tracking, fare calculation)
- **User/Captain** - `/user/*`, `/captain/*` (profile management)

### Data Fetching Hooks
```javascript
// Generic mutation hook
const { mutate, isLoading, error } = usePostData('/endpoint');

// Authentication-specific hooks
const loginMutation = useLoginWithOtp({ phone, otp });
const otpMutation = useSendOtp({ phone, setClicks, setDisabled });
```

## Maps Integration

### Google Maps Features
- **Interactive Map Display** with custom styling
- **Real-time Location Tracking** for users and captains
- **Autocomplete Search** for addresses
- **Distance/Time Calculation** for fare estimation
- **Route Visualization** with pickup/destination markers

### Location Services
```javascript
// Custom geolocation hook
const { location, error } = useCurrentLocation();

// Location data structure
{
  lat: number,      // Latitude
  lng: number,      // Longitude  
  accuracy: number  // GPS accuracy in meters
}
```

## UI Component System

### Design Tokens
```css
/* Primary color palette */
--color-primary: #7c3aed;      /* purple-600 */
--color-secondary: #a855f7;    /* purple-500 */
--color-accent: #ec4899;       /* pink-500 */
--color-bg: #1e1b4b;          /* purple-950 */
```

### Component Categories
- **Form Components** - Input, Select, OTP, Labels with validation
- **Layout Components** - Navbar, Footer, Page containers
- **Interactive Components** - Buttons, Links with hover states
- **Feedback Components** - Toasts, Loading spinners, Error states
- **Map Components** - MapView, LocationSearch, Vehicle tracking

### Animation System
```javascript
// Motion variants for consistent animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const slideIn = {
  initial: { translateY: '100%' },
  animate: { translateY: '0%' },
  exit: { translateY: '100%' }
};
```

## Common Development Tasks

### Adding New Routes
1. Create page component in appropriate `pages/` subdirectory
2. Add route definition in `AppRoutes.jsx`
3. Add authentication protection if needed
4. Update navigation links in `Navbar.jsx`

### Creating New Components
```javascript
// Component template
import React from 'react';
import { cn } from '../lib/utils';

const ComponentName = ({ className, children, ...props }) => {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
};

export default ComponentName;
```

### Adding API Integration
1. Create custom hook in `hooks/` directory
2. Use `usePostData` or create specific mutation
3. Handle loading, error, and success states
4. Update Redux store if needed for global state

### Styling Guidelines
- Use TailwindCSS utility classes
- Create custom CSS variables for brand colors
- Use `cn()` utility for conditional classes
- Mobile-first responsive design approach

## PWA Configuration

### Service Worker Features
- **Offline Caching** for essential app shell
- **Background Sync** for ride requests
- **Push Notifications** for ride updates (planned)

### Manifest Configuration
```javascript
{
  name: 'Yaatrika - Women-Safe Cab Service',
  short_name: 'Yaatrika',
  theme_color: '#E91E63',
  background_color: '#FFFFFF',
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/'
}
```

## Performance Optimization

### Code Splitting
- **Route-level splitting** with React.lazy()
- **Component-level splitting** for heavy components
- **Bundle analysis** with Vite's built-in tools

### Image Optimization
- Use modern formats (WebP, AVIF) when possible
- Implement lazy loading for images
- Optimize asset sizes and compress images

### Bundle Optimization
```powershell
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Performance audit
npm run preview
# Use Chrome DevTools Lighthouse
```

## Development Workflow

### Code Quality
- **ESLint** configuration with React and hooks rules
- **Prettier** for consistent code formatting (if configured)
- **Husky** for pre-commit hooks (if configured)

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/ride-booking-ui

# Make changes and commit
git add .
git commit -m "feat: add ride booking interface with fare estimation"

# Push and create PR
git push origin feature/ride-booking-ui
```

### Testing Strategy
- **Component testing** with React Testing Library (to be implemented)
- **E2E testing** with Playwright (to be implemented)
- **API mocking** with MSW for development

## Troubleshooting

### Common Issues
- **CORS errors**: Check API server CORS configuration
- **Map not loading**: Verify Google Maps API key and billing
- **Build failures**: Clear node_modules and reinstall dependencies
- **Auth token issues**: Check localStorage and token expiration

### Debug Commands
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Check environment variables
echo $env:VITE_API_BASE_URL
echo $env:VITE_GOOGLE_MAPS_API_KEY

# View build output
npm run build -- --debug
```

## Production Deployment

### Build Optimization
```powershell
# Production build with optimization
npm run build

# Check bundle size
ls -la dist/assets/

# Test production build locally
npm run preview
```

### Environment Configuration
```env
# Production environment
VITE_API_BASE_URL=https://api.yaatrika.com/api/v1
VITE_GOOGLE_MAPS_API_KEY=production_key_here
VITE_ENV=production
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Google Maps API key updated for production domain
- [ ] CORS allowed origins updated on backend
- [ ] SSL certificate configured
- [ ] Service worker and PWA features tested
- [ ] Performance audit completed