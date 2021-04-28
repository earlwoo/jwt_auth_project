const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Review } = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
    let results = await Review.findAll()
    res.json(results)
}))

router.post('/', asyncHandler(async (req, res) => {
    const { title, content, rating, userId, restId } = req.body

    try {
        const addedReview = await Review.create({
            title, content, rating, userId, restId
        })
        res.json(addedReview)
    } catch(err) {
        console.log(err)
    }
}))

router.post('/:id', asyncHandler(async (req, res) => {
    const { id, title, content, rating, userId, restId } = req.body
    const review = await Review.findByPk(id)

    try {
        const updatedReview = await review.update({title, content, rating})
        // const addedReview = await Review.update({
        //     title, content, rating
        // })
        res.json(updatedReview)
    } catch(err) {
        console.log(err)
    }
}))

router.delete('/', asyncHandler(async(req, res) => {
    const { id } = req.body
    await Review.destroy({
        where: {
            id
        }
    })
    res.json({id})
}))


module.exports = router
