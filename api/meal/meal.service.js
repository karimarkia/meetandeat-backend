const dbService = require('../../services/dbService')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    const collection = await dbService.getCollection('meals')
    try {
        let meals = await collection.find(criteria).toArray();
        meals = await meals.map(meal => {
            if (meal.atDate < Date.now()) {
                meal.atDate = Date.now() + 60000 * 60 * 24 * 2;
                update(meal)
            }
            return meal
        })
        return meals
    } catch (err) {
        console.log('ERROR: cannot find meals')
        throw err;
    }
}


async function getById(mealId) {
    const collection = await dbService.getCollection('meals')
    try {
        const meal = await collection.findOne({ "_id": ObjectId(mealId) })
        return meal
    } catch (err) {
        console.log(`ERROR: cannot find customer ${mealId}`)
        throw err;
    }
}


async function remove(mealId) {
    // console.log(customerId);

    const collection = await dbService.getCollection('meals')
    try {
        return await collection.deleteOne({ "_id": ObjectId(mealId) })
    } catch (err) {
        console.log(`ERROR: cannot remove meal ${mealId}`)
        throw err;
    }
}

async function update(meal) {
    console.log('backend update service id:', meal._id);
    const collection = await dbService.getCollection('meals')
    try {
        const strMealId = meal._id
        const { _id, ...mealData } = meal
        const id = ObjectId(_id)
        return await collection.updateOne({ _id: id }, { $set: mealData })
    } catch (err) {
        console.log(`ERROR: cannot update meal ${meal._id}`)
        throw err;
    }
}


async function add(meal) {
    const collection = await dbService.getCollection('meals')
    try {
        await collection.insertOne(meal);
        return meal;
    } catch (err) {
        console.log(`ERROR: cannot insert meal`)
        throw err;
    }
}