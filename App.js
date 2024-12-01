import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import React from 'react';
// import Navigation from './Navigation'; // Import Navigation Component
import Profile from './components/Profile';

export default function App() {
  return (
    <NavigationContainer>
      {/* <Navigation /> */}
    <Profile  />

    </NavigationContainer>
  );
}