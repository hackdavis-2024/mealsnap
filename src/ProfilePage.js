//Boiler Plate
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBottomNavigation from './AppBottomNavigation';

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: johndoe</p>
      <p>Email:</p>
      <AppBottomNavigation />
    </div> 
  );
}


