// const dbService = require('./db.service')
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
        const meals = await collection.find(criteria).toArray();
        return meals
    } catch (err) {
        console.log('ERROR: cannot find meals')
        throw err;
    }
}


async function getById(mealId) {
    // console.log(mealId);

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
            //const _id = ObjectId(strMealId)
            //delete meal._id
        const { _id, ...mealData } = meal
        const id = ObjectId(_id)
        console.log(id);

        return await collection.updateOne({ _id: id }, { $set: mealData })
            //return await collection.updateOne({_id}, {$set : meal}) 
            // bug here 
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