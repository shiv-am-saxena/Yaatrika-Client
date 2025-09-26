# Yaatrika - Women-Safe Cab Service

**HerWay - Client** is the frontend application for Yaatrika, a women-oriented safe and secure cab service platform. This React-based Progressive Web App (PWA) provides an intuitive interface for both passengers and drivers with a focus on safety, real-time tracking, and seamless user experience.

## 🚀 Features

### Core Features
- **Dual User Experience**: Separate interfaces for passengers and drivers (captains)
- **OTP-Based Authentication**: Secure phone number verification system
- **Real-Time Map Integration**: Google Maps API integration for location services
- **Progressive Web App**: Offline capabilities and native app-like experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### User Features
- **Ride Booking**: Search and book rides with fare estimation
- **Location Services**: Pickup/destination selection with autocomplete
- **Vehicle Selection**: Multiple vehicle types (bike, auto, sedan, SUV)
- **Real-Time Tracking**: Live driver location and ride status
- **Safety Features**: Emergency sharing and trip monitoring

### Captain Features
- **Driver Dashboard**: Real-time ride requests and navigation
- **Profile Management**: Vehicle details and driver information
- **Earnings Tracking**: Ride history and financial overview

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.0.0** - Modern UI library with hooks
- **Vite 6.2.0** - Fast build tool and development server

### State Management & Data Fetching
- **Redux Toolkit** - Predictable state container
- **TanStack Query** - Server state management and caching
- **React Router v7** - Client-side routing

### UI & Styling
- **TailwindCSS 4.1.4** - Utility-first CSS framework
- **Motion (Framer Motion)** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Maps & Location
- **@react-google-maps/api** - Google Maps integration
- **Browser Geolocation API** - Location services

### Form Handling & Validation
- **React Hook Form** - Performant forms with validation
- **input-otp** - OTP input component

### Additional Libraries
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Cobe** - 3D globe visualization

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Maps API key
- Backend API server running

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HerWay-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_ENV=development
   ```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🏗️ Project Architecture

### Folder Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Input, Select, etc.)
│   ├── maps/            # Map-related components
│   ├── LoginForm.jsx    # Authentication forms
│   ├── SignupForm.jsx
│   ├── CaptainForm.jsx
│   ├── Navbar.jsx       # Navigation component
│   └── Footer.jsx
├── pages/               # Page components
│   ├── user/            # User-specific pages
│   ├── captain/         # Captain-specific pages
│   ├── Home.jsx         # Landing page
│   └── AuthPage.jsx     # Authentication wrapper
├── router/              # Routing configuration
│   ├── AppRoutes.jsx    # Main route definitions
│   └── ProtectedRoutes.jsx # Auth-protected routes
├── context/             # Redux store and slices
│   ├── store.js         # Redux store configuration
│   └── slices/          # Redux slices
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useLogin.js      # Login functionality
│   ├── useSendOtp.js    # OTP sending logic
│   ├── usePostData.js   # API request hook
│   └── useCurrentLocation.js # Geolocation hook
├── config/              # Configuration files
│   ├── axiosInstance.js # HTTP client setup
│   └── apiService.js    # API utility functions
├── lib/                 # Utility functions
│   ├── utils.js         # General utilities
│   └── toast.js         # Toast notification helpers
├── assets/              # Static assets
├── App.jsx              # Root component
└── main.jsx             # Application entry point
```

### Component Architecture

**Higher-Order Components**
- `ProtectedRoute` - Handles authentication-based routing
- `Auth` - Redirects authenticated users

**Page Components**
- `Home` - Landing page with hero section and features
- `UserHome` - Main dashboard for passengers
- `CaptainHome` - Main dashboard for drivers
- `AuthPage` - Authentication flow wrapper

**Feature Components**
- `MapView` - Google Maps integration with real-time tracking
- `LocationSearchPanel` - Address search and suggestions
- `VehiclePanel` - Vehicle type selection
- `ConfirmRide` - Ride confirmation interface

## 🔐 Authentication Flow

### Registration Process
1. **User Information**: Name, email, phone, gender selection
2. **Phone Verification**: OTP sent via SMS
3. **OTP Validation**: 6-digit code verification
4. **Account Creation**: JWT token generation and storage

### Login Process
1. **Phone Number Entry**: Primary authentication method
2. **OTP Request**: Secure code generation
3. **OTP Verification**: Token-based authentication
4. **Role Detection**: Automatic user/captain routing

### State Management
```javascript
// Auth state structure
{
  user: null,                    // User profile data
  token: localStorage.token,     // JWT authentication token
  loading: false,               // Loading state
  error: null,                  // Error messages
  isAuthenticated: boolean,     // Authentication status
  role: 'user' | 'captain'     // User role
}
```

## 🗺️ Maps Integration

### Google Maps Features
- **Interactive Map Display**: Real-time map with custom styling
- **Location Search**: Autocomplete address suggestions
- **Geocoding**: Address to coordinates conversion
- **Route Calculation**: Distance and time estimation
- **Live Tracking**: Real-time position updates

### Location Services
```javascript
// Custom hook for current location
const { location, error } = useCurrentLocation();

// Location data structure
{
  lat: number,    // Latitude
  lng: number,    // Longitude
  accuracy: number // GPS accuracy in meters
}
```

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Purple-based theme (`purple-950`, `purple-900`)
- **Typography**: Montserrat font family
- **Animation**: Motion (Framer Motion) for smooth transitions
- **Responsive**: Mobile-first approach with breakpoints

### Component Library
- **Input Components**: Custom styled form elements
- **Selection Components**: Dropdowns and radio groups
- **Interactive Components**: Buttons with hover states
- **Feedback Components**: Toast notifications and loading states

### Progressive Web App Features
```javascript
// PWA Configuration
{
  registerType: 'autoUpdate',
  manifest: {
    name: 'Yaatrika - Women-Safe Cab Service',
    short_name: 'Yaatrika',
    theme_color: '#E91E63',
    display: 'standalone',
    orientation: 'portrait'
  }
}
```

## 📱 State Management

### Redux Store Structure
```javascript
// Store configuration
{
  auth: {
    user: UserObject,
    token: string,
    loading: boolean,
    error: string,
    isAuthenticated: boolean,
    role: 'user' | 'captain'
  }
}
```

### Data Fetching Strategy
- **TanStack Query**: Server state caching and synchronization
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Centralized error management
- **Background Refetching**: Automatic data freshening

## 🔧 Development Workflow

### Code Quality
- **ESLint**: JavaScript/React linting rules
- **React Hooks Rules**: Hook usage validation
- **Component Refresh**: Fast refresh for development

### Performance Optimization
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Asset compression and lazy loading
- **Bundle Analysis**: Vite's built-in analysis tools

### Testing Strategy
- **Component Testing**: React Testing Library (to be implemented)
- **E2E Testing**: Cypress or Playwright (to be implemented)
- **API Mocking**: MSW for development and testing

## 🌐 API Integration

### HTTP Client Configuration
```javascript
// Axios instance with interceptors
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000
});

// Request interceptor for auth tokens
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints
- **Authentication**: `/auth/*` - Login, registration, OTP
- **Maps**: `/map/*` - Geocoding, suggestions, routing
- **Rides**: `/ride/*` - Booking, tracking, fare calculation
- **User**: `/user/*` - Profile management, history

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Build artifacts in dist/ directory
# Static assets optimized and minified
# Service worker for PWA functionality
```

### Environment Variables
```env
# Production configuration
VITE_API_BASE_URL=https://api.yaatrika.com/api/v1
VITE_GOOGLE_MAPS_API_KEY=production_maps_key
VITE_ENV=production
```

### Deployment Platforms
- **Vercel**: Zero-config deployment with auto-builds
- **Netlify**: JAMstack deployment with form handling
- **AWS S3 + CloudFront**: Static hosting with CDN

## 🛡️ Security Considerations

### Client-Side Security
- **JWT Storage**: Secure token handling in localStorage
- **HTTPS Only**: Enforce secure connections
- **XSS Protection**: Content Security Policy headers
- **Input Validation**: Form validation and sanitization

### Privacy & Data Protection
- **Location Permissions**: User consent for GPS access
- **Data Minimization**: Only collect necessary information
- **Secure Transmission**: All API calls over HTTPS

## 🔄 Future Enhancements

### Planned Features
- **Real-Time Chat**: In-app messaging between users and drivers
- **Payment Integration**: Razorpay/Stripe payment gateway
- **Push Notifications**: Web push for ride updates
- **Offline Support**: Enhanced PWA capabilities
- **Multi-Language**: Internationalization support

### Technical Improvements
- **TypeScript Migration**: Type safety across the codebase
- **Testing Suite**: Comprehensive test coverage
- **Performance Monitoring**: Analytics and error tracking
- **A/B Testing**: Feature flag implementation

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding standards and ESLint rules
4. Test your changes thoroughly
5. Submit a pull request with detailed description

### Code Standards
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Document complex logic with comments

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions about the codebase:
- Create an issue in the repository
- Contact the development team
- Refer to API documentation for backend integration

---

**Built with ❤️ for women's safety and empowerment**
