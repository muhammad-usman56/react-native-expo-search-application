# Places Search App

React Native application built with Expo SDK 54, featuring Google Places API integration, Redux state management, and interactive maps.

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | React Native + Expo SDK 54 |
| Language | TypeScript |
| State | Redux + Redux-Observable |
| API | Google Places API, Maps SDK |
| Storage | AsyncStorage |
| Navigation | Expo Router |

## 🚀 Setup & Installation

### Prerequisites
- Node.js v16.x or higher
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### 1. Clone and Install
```bash
git clone <repository-url>
cd maybank-project
npm install
```

### 2. Configure Google API Keys

#### Google Places API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable **Places API**
3. Create an API key
4. Edit `src/services/placesApi.ts`:
```typescript
const API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';
```

#### Google Maps SDK
1. In the same project, enable **Maps SDK for Android/iOS**
2. Create separate API key for Maps
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

## 🏃‍♂️ Run Project

### Development
```bash
npm start
```

### Run on Devices
- **iOS Simulator**: Press `i` in terminal
- **Android Emulator**: Press `a` in terminal  
- **Physical Device**: Scan QR code with Expo Go app
- **Web Browser**: Press `w` in terminal

### Production Builds
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## 📁 Project Structure

```
src/
├── components/          # UI components (SearchBar, MapView, SearchHistory)
├── redux/              # State management (actions, reducers, epics)
├── services/           # API layer (Google Places integration)
├── screens/            # Screen components
├── hocs/               # Higher-order components
└── types/              # TypeScript definitions
```

## 🔧 Features

- **Search**: Debounced autocomplete with Google Places API
- **Maps**: Interactive Google Maps with place markers
- **History**: Persistent search history with AsyncStorage
- **State**: Redux with Redux-Observable for async operations
- **Offline**: Network detection and graceful error handling

## 🧪 Testing

- [x] Autocomplete functionality
- [x] Place selection and map display
- [x] Search history persistence
- [x] Offline mode handling
- [x] Cross-platform compatibility

## 📝 Notes

- Uses native React Native components for optimal performance
- Redux-Observable handles async operations with debouncing
- Search history limited to 50 items
- Requires Google Maps SDK for map functionality