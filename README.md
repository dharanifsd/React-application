# React Native Assessment

A React Native application that fetches posts from an API, allows real-time searching, and persists the search query using AsyncStorage.

## Features

- **Fetch & Display Posts**: Fetches 100 posts from JSONPlaceholder and displays them in a FlatList.
- **Real-time Search**: Filters posts by title as you type.
- **Persistence**: Remembers your last search query even after you close the app.
- **Pull-to-Refresh**: Pull down on the list to refresh data.
- **Error Handling**: Displays friendly messages for network errors or empty results.
- **Mobile Optimized**: Handles status bar overlap on Android.

## Folder Structure

```
src/
  components/
    PostCard.tsx       # UI for a single post
  hooks/
    usePosts.ts        # Logic for fetching posts
    usePersistentSearch.ts # Logic for saving search text
  screens/
    HomeScreen.tsx     # Main screen combining logic and UI
  services/
    api.ts             # API client
App.tsx                # Entry point
```

## How to Run

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    cd react-app
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npx expo start
    ```
4.  **Run on Device/Emulator**:
    -   Scan the QR code with your phone (using Expo Go app).
    -   Press `a` to run on Android Emulator.
    -   Press `i` to run on iOS Simulator.

## Tech Stack

-   **React Native** (Expo)
-   **TypeScript**
-   **AsyncStorage** (`@react-native-async-storage/async-storage`)
