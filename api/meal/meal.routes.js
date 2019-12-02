const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getMeals,getMeal,addMeal,deleteMeal,updateMeal} = require('./meal.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',getMeals)
router.get('/:_id',getMeal)
router.post('/', addMeal)
router.delete('/:_id',deleteMeal)
router.put('/:_id', updateMeal)




module.exports = router 