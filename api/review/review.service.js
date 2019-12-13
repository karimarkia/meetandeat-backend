const dbService = require('../../services/dbService')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    add

}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('reviews')
    try {
        var reviews = await collection.aggregate([{
                $match: filterBy
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup: {
                    from: 'meals',
                    localField: 'aboutMealId',
                    foreignField: '_id',
                    as: 'aboutMeal'
                }
            },
            {
                $unwind: '$aboutMeal'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username, imgUrl: review.byUser.imgUrl }
            review.aboutMeal = { _id: review.aboutMeal._id }
            delete review.byUserId;
            delete review.aboutMealId;
            return review;
        })

        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('reviews')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}

async function add(review) {

    review.byUserId = ObjectId(review.byUserId);
    review.aboutMealId = ObjectId(review.aboutMealId);
    const collection = await dbService.getCollection('reviews')
    try {

        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}