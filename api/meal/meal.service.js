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
        console.log(`ERROR: cannot remove customer ${mealId}`)
        throw err;
    }
}

async function update(meal) {
    console.log(meal._id);

    const collection = await dbService.getCollection('meals')
        // const id = meal._id;
        // delete meal._id;
    try {
        await collection.updateOne({ "_id": ObjectId(meal._id) }, { $set: meal })
        return meal
    } catch (err) {
        console.log(`ERROR: cannot update customer ${meal._id}`)
        throw err;
    }
}

async function add(meal) {
    const collection = await dbService.getCollection('meals')
    try {
        await collection.insertOne(meal);
        return meal;
    } catch (err) {
        console.log(`ERROR: cannot insert customer`)
        throw err;
    }
}