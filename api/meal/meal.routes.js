const express = require('express')

const { getMeals, getMeal, addMeal, deleteMeal, updateMeal } = require('./meal.controller')
const router = express.Router()



router.get('/', getMeals)
router.get('/:_id', getMeal)
router.post('/', addMeal)
router.delete('/:_id', deleteMeal)
router.put('/:_id', updateMeal)




module.exports = router