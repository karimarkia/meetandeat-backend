const mealService = require('./meal.service.js') 

//GET LIST MEALS
async function getMeals(req, res) {
    console.log('getting meals')
    let filterBy = req.body
    const meals = await mealService.query(filterBy)
    res.json(meals)
    //res.send(meals)
}

//GET MEAL
async function getMeal(req, res) {
    try {
        const meal = await mealService.getById(req.params._id)
       res.json(meal)
        //res.send(meal)
    } catch (err) {
        return res.status(404).send('Meal not found')
    }
}


async function addMeal(req, res) {
    const meal = req.body
    try {
        await mealService.add(meal)
        res.json(meal)
    } catch (err) {
        return res.status(418).send('I am a teapot, and something went wrong with adding a new meal')
    }
}


async function deleteMeal(req, res) {
    try {
        await mealService.remove(req.params._id)
        // console.log('deleted', req.params._id)
        res.json({})
    } catch (err) {
        return res.status(404).send('meal not found')
    }
}
 
async function updateMeal(req, res) {
    const meal = req.body;
     console.log(' banana 3',meal);
    try {
        
        await mealService.update(meal);
        console.log('banana 4: ', meal)
        return res.json(meal);
    } catch (err) {
        res.status(404).send(`meal for update not found. Error: ${err}`)
    }
}

 

module.exports = {
    getMeals,
    addMeal,
    deleteMeal,
    updateMeal,
    getMeal
}