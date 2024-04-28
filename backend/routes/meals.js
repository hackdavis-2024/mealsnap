const Router = require('express');
const Meal = require('../schemas/meal.js');

const router = Router();

// CRUD routes

// Create a new meal
router.post('/', (req, res) => {
    console.log("req.body: ", req.body);
    const { name, description, date, nutrients } = req.body;
    const meal = new Meal({
      name,
      description,
      date,
      nutrients
    });
    meal.save()
    .then(savedMeal => {
        return res.status(201).json(savedMeal);
    })
    .catch(err => {
        return res.status(500).json({ error: err });
    });
});

// Get all meals
router.get("/", (req, res) => {
    Meal.find()
        .then(meals => {
            res.json(meals); // Send all the meals as the response
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

// Get a single meal by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    console.log("id: " + id);
    console.log(Meal.collection.name);

    Meal.findById(id)
        .then(meal => {
            console.log("meal: " + meal);
            if (!meal) {
                return res.status(404).json({error: 'Meal not found'});
            }
            return res.json(meal);
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });

    return;
});

// Update a meal by ID
// Note: Will partially update, does not completely replace
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, image, nutrients } = req.body;
    
    // Case: If any of the params are missing, handle this

    Meal.findById(id)
        .then(meal => {
            if (!meal) {
                return res.status(404).json({ error: "Meal not found" });
            }
            meal.name = name;
            meal.description = description;
            meal.image = image;
            meal.nutrients = nutrients;
            meal.save()
                .then(updatedMeal => {
                    return res.status(201).json(updatedMeal);
                })
                .catch(err => {
                    return res.status(500).json({ error: err });
                })
            return;
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        })

    return;
});

// Delete a meal by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Meal.findByIdAndDelete(id) 
        .then(meal => {
            if (!meal) {
                return res.status(404).json({error: 'Meal not found'});
            }
            // 204: No content
            return res.sendStatus(204);
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
});

module.exports = router;