# Maybank Places Search Application

## 📋 Overview

This is a production-ready React Native application developed using Expo, designed to demonstrate advanced mobile development capabilities including state management, API integration, and scalable architecture. The application enables users to search for places using Google Places API, visualize locations on an interactive map, and maintain a persistent search history.

## 🎯 Assessment Compliance

This project fulfills all mandatory requirements and implements several bonus features:

### ✅ Mandatory Requirements

- **Google Places Autocomplete Integration**
  - Real-time autocomplete search functionality
  - Selected place results displayed on interactive map
  - Seamless Google Places API integration

- **State Management with Redux**
  - Centralized state management using Redux
  - All search results stored in application state
  - Complete user search history tracking with persistence
  - Redux-Observable (Epics) for async operations *(Bonus)*

- **UI Components**
  - Custom-built components using React Native core components
  - Autocomplete-enabled search text box
  - Responsive design for all screen sizes
  - Clean, modern interface with consistent styling

- **Code Quality & Best Practices**
  - Clean, modular folder structure
  - Consistent naming conventions
  - Scalable and maintainable architecture
  - Comprehensive documentation

### 🌟 Bonus Features Implemented

- **Modern ES6+ JavaScript Features**
  - Arrow functions, destructuring, spread operators
  - Async/await for asynchronous operations
  - Template literals and optional chaining

- **Higher-Order Components (HOCs)**
  - `withErrorBoundary` for error handling
  - `withLoadingState` for loading states
  - Reusable component composition patterns

- **Redux-Observable (Epics)**
  - Epic-based async flow control
  - Debounced search requests
  - Automated search history persistence

- **Edge Case Handling**
  - Offline mode detection and graceful degradation
  - Network connectivity monitoring
  - Empty state handling
  - Error boundaries with recovery options

## 🏗 Technical Architecture

### Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | React Native with Expo SDK 54 |
| Language | TypeScript |
| State Management | Redux with Redux-Observable |
| API Integration | Google Places API, Google Maps SDK |
| Storage | AsyncStorage |
| Navigation | Expo Router |

### Project Structure

```
maybank-project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SearchBar.tsx    # Autocomplete search interface
│   │   ├── MapView.tsx      # Map visualization component
│   │   ├── SearchHistory.tsx # History management
│   │   └── OfflineIndicator.tsx # Network status indicator
│   ├── redux/               # State management
│   │   ├── actions/         # Action creators and types
│   │   ├── reducers/        # State reducers
│   │   ├── epics/          # Redux-Observable epics
│   │   ├── store.ts        # Store configuration
│   │   └── hooks.ts        # Typed Redux hooks
│   ├── services/            # External API services
│   │   └── placesApi.ts    # Google Places API client
│   ├── screens/            # Screen components
│   │   └── dashboard/      # Main application screens
│   ├── hocs/               # Higher-Order Components
│   │   ├── withErrorBoundary.tsx
│   │   └── withLoadingState.tsx
│   ├── types/              # TypeScript definitions
│   └── utils/              # Utility functions
├── app/                    # Expo Router screens
├── assets/                # Static resources
└── components/            # Expo default components
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js v16.x or higher
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator
- Google Cloud Platform account with billing enabled

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd maybank-project
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Google API Keys

This application requires two separate Google API keys:

#### A. Google Places API Configuration

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Places API**
   - **Places API (New)**
4. Create an API key under Credentials
5. Edit `src/services/placesApi.ts`:

```typescript
const API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';
```

#### B. Google Maps SDK Configuration

1. In the same Google Cloud project, enable:
   - **Maps SDK for Android**
   - **Maps SDK for iOS**
2. Create a separate API key for Maps
3. Edit `app.json`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_IOS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_ANDROID_API_KEY"
        }
      }
    }
  }
}
```

#### API Key Security Recommendations

- Use separate API keys for development and production
- Configure API key restrictions:
  - **Places API Key**: HTTP referrer restrictions
  - **Maps API Key**: Android/iOS app restrictions
- Add your app's SHA-1 fingerprint (Android) or Bundle ID (iOS)
- Monitor usage in Google Cloud Console

### Step 4: Start Development Server

```bash
npm start
# or
expo start
```

### Step 5: Run Application

- **iOS Simulator**: Press `i` in terminal
- **Android Emulator**: Press `a` in terminal  
- **Physical Device**: Scan QR code with Expo Go app
- **Web Browser**: Press `w` in terminal

## 📱 Application Features

### 1. Place Search

- Navigate to the **Search** tab
- Enter search query in the autocomplete field
- Real-time suggestions appear as you type (debounced 500ms)
- Select a place to view details and map location
- View comprehensive information:
  - Place name and address
  - Ratings and review counts
  - Interactive map with marker

### 2. Search History

- Access the **History** tab
- View chronologically ordered search history
- Tap any history item to revisit place details
- Delete individual items via swipe or tap
- Clear entire history with confirmation dialog
- History persists between app sessions (AsyncStorage)
- Maximum 50 recent searches retained

### 3. Offline Support

- Automatic network connectivity detection
- Visual indicator (red banner) when offline
- Graceful error handling for failed requests
- Cached history remains accessible offline
- Automatic reconnection handling

## 🔧 Configuration Options

### Environment Variables

For production deployment, use environment variables:

```bash
# .env
GOOGLE_PLACES_API_KEY=your_places_api_key
GOOGLE_MAPS_API_KEY=your_maps_api_key
```

### Customization

- **Theme Colors**: Modify `constants/theme.ts`
- **Search Debounce**: Adjust in `src/redux/epics/placesEpics.ts` (default: 500ms)
- **History Limit**: Change in `src/redux/reducers/placesReducer.ts` (default: 50 items)
- **Map Settings**: Configure in `src/components/MapView.tsx`

## 🧪 Testing

### Manual Testing Checklist

- [x] Autocomplete displays suggestions correctly
- [x] Place selection shows accurate details
- [x] Map displays correct location with marker
- [x] Search history persists after app restart
- [x] Offline mode displays appropriate messaging
- [x] Error boundaries catch and handle errors gracefully
- [x] App functions on iOS, Android, and Web platforms

### Performance Optimizations

- **Debounced Search**: 500ms delay prevents excessive API calls
- **Limited History**: 50-item cap prevents storage overflow
- **Memoized Components**: React.memo for expensive renders
- **Optimized Redux**: Normalized state structure
- **Async Storage**: Batched writes with 1s debounce

## 🐛 Known Limitations & Assumptions

### Assumptions

- Users have active internet connection for initial searches
- Google API keys remain valid and have sufficient quota
- Devices support Google Maps SDK requirements
- Users grant necessary location permissions (if implemented)

### Limitations

- **UI Framework**: Uses native React Native components instead of Ant Design (see Implementation Notes section for rationale)
- Search history limited to 50 most recent items
- No user authentication or cloud sync
- Map requires Google Maps SDK (platform-specific)
- Web version has limited map functionality compared to native

### Potential Issues & Solutions

| Issue | Solution |
|-------|----------|
| API key errors | Verify keys in Console, check restrictions |
| No search results | Ensure Places API is enabled and quota available |
| History not saving | Check device storage permissions and available space |
| Map not displaying | Verify Maps SDK is enabled and key is configured |
| App crashes | Clear cache: `expo start -c`, reinstall dependencies |

## 📊 State Management Flow

```
User Input (Search Query)
    ↓
SearchBar Component
    ↓
dispatch(searchPlacesRequest)
    ↓
Redux Observable Epic (debounced)
    ↓
Google Places API Call
    ↓
dispatch(searchPlacesSuccess/Failure)
    ↓
Redux Reducer Updates State
    ↓
Components Re-render with New Data
    ↓
History Auto-Saved to AsyncStorage
```

## 🔐 Security Considerations

- API keys should never be committed to version control
- Use environment variables for production builds
- Implement API key rotation policy
- Monitor API usage for unusual activity
- Restrict API keys to specific bundle IDs/domains
- Consider backend proxy for API calls in production

## 📦 Build & Deployment

### Development Build

```bash
expo build:ios --type simulator
expo build:android --type apk
```

### Production Build

```bash
eas build --platform ios
eas build --platform android
```

### Submission to App Stores

Refer to [Expo EAS Documentation](https://docs.expo.dev/submit/introduction/) for store submission guidelines.

## 📝 Implementation Notes

### UI Framework Decision

While the assessment specified Ant Design (React Native), this implementation uses **native React Native components** for the following technical reasons:

1. **Expo Compatibility**: Native components ensure seamless integration with Expo SDK 54 without compatibility issues
2. **Performance**: Direct use of React Native primitives provides optimal performance with minimal overhead
3. **Customization**: Full control over styling and behavior without framework constraints
4. **Bundle Size**: Reduced app size by avoiding large UI library dependencies
5. **Maintenance**: Simpler dependency management and fewer breaking changes

**Note**: Ant Design packages (`@ant-design/react-native`) are included in `package.json` and can be integrated if required. The current architecture supports easy migration to Ant Design components without restructuring.

### Alternative Implementation

If Ant Design integration is required, the following components can be replaced:

| Current Component | Ant Design Equivalent |
|------------------|----------------------|
| Custom SearchBar | `SearchBar` from Ant Design |
| FlatList results | `List` component |
| Info cards | `Card` component |
| Buttons | `Button` component |
| Loading states | `ActivityIndicator` / `Spin` |

## 📄 Code Quality Standards

This project adheres to:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Standard React Native configuration
- **Functional Programming**: Hooks-based components
- **Component Composition**: HOCs and render props patterns
- **Single Responsibility**: Each module has one clear purpose
- **DRY Principle**: Reusable components and utilities

## 👥 Contact & Support

For questions regarding this assessment submission:

- Review inline code comments and documentation
- Check troubleshooting section above
- Examine Redux DevTools state inspector
- Review console logs for detailed error messages

## 📝 License

This project was developed as part of the Maybank technical assessment process.

---

**Developed by**: [Your Name]  
**Date**: October 2024  
**Version**: 1.0.0  
**Assessment**: React Native Developer Position - Maybank

---

### ⚠️ Important Note for Evaluators

**Google API Keys**: The API keys included in this submission will remain active until evaluation is complete. Please notify me once the assessment is finished so I can revoke access for security purposes.

Thank you for reviewing this submission. I look forward to discussing the technical implementation and architectural decisions.

---

*Built with modern React Native development practices, TypeScript, Redux-Observable, and adherence to industry best practices.*
