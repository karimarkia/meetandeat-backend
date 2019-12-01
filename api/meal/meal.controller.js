const mealService = require('./meal.service')

async function getMeals(req, res) {
    // console.log('getting toys')
    let filterBy = req.body
    const meals = await mealService.query(filterBy)
    res.json(meals)
}

async function getMeal(req, res) {
    try {
        const meal = await mealService.getById(req.params._id)
        res.json(meal)
    } catch (err) {
        return res.status(404).send('Toy not found')
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
    // console.log(meal);
    try {
        await mealService.update(meal);
        return res.json({});
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