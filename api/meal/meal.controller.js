const mealService = require('./meal.service.js')

async function getMeals(req, res) {
    let filterBy = req.body
    const meals = await mealService.query(filterBy)
    res.json(meals)

}

async function getMeal(req, res) {
    try {
        const meal = await mealService.getById(req.params._id)
        res.json(meal)
    } catch (err) {
        return res.status(404).send('Meal not found')
    }
}


async function deleteMeal(req, res) {
    try {
        await mealService.remove(req.params._id)
        res.json({})
    } catch (err) {
        return res.status(404).send('meal not found')
    }
}

async function updateMeal(req, res) {
    const meal = req.body;
    try {
        await mealService.update(meal);
        console.log('banana 4: ', meal)
        return res.json(meal);
    } catch (err) {
        res.status(404).send(`meal for update not found. Error: ${err}`)
    }
}


async function addMeal(req, res) {
    const meal = req.body
    try {
        await mealService.add(meal)
        res.json(meal)
    } catch (err) {
        return res.status(404).send('I am a teapot, and something went wrong with adding a new meal')
    }
}

module.exports = {
    getMeals,
    addMeal,
    deleteMeal,
    updateMeal,
    getMeal
}