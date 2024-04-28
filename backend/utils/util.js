// import { Request, Response, NextFunction } from 'express';
// import Meal from '../schemas/meal.js'; 

// // Middleware function that gets the meal with the given id
// export async function getMeal(req: Request, res: Response, next: NextFunction) {
//   try {
//     const meal = await Meal.findById(req.params.id);
//     if (meal == null) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }
//     //res.meal = meal;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }