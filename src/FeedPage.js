import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MealCard from './MealCard';
import AppBottomNavigation from './AppBottomNavigation';

export default function FeedPage() {
  const [feedData, setFeedData] = useState([
    {
      title: 'Shrimp and Chorizo Paella',
      date: 'September 14, 2016',
      image: '/static/images/cards/paella.jpg',
      description: 'A delicious rice dish with shrimp and chorizo.',
      nutrients: {
        calories: 400,
        protein: 20,
        fat: 10,
        carbs: 30,
        protein: 30,
        fat: 15,
        carbs: 40,
      },
    },
    {
      title: 'Chicken Alfredo',
      date: 'September 15, 2016',
      image: '/static/images/cards/chicken-alfredo.jpg',
      description: 'A creamy pasta dish with chicken and parmesan cheese.',
      nutrients: {
          calories: 100,
          fat: 5,
          protein: 2,
          carbohydrates: 10,
          sugar: 5,
          fiber: 2,
          sodium: 10,
          cholesterol: 5,
      },
    },
  ]);

  // On load, make a request to the backend to get the feed data
  useEffect(() => {
    axios.get('http://localhost:5001/meals')
      .then((response) => {
        setFeedData(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
  <div>
    {feedData.map((meal) => {
      return <MealCard meal={meal} />;
    })}
    <AppBottomNavigation />
  </div>
  );
}
