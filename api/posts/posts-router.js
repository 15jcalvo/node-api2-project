// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find(req.query)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error retrieving the posts',
        })
      })
  })

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({ message: 'Post not found' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error retrieving the post',
        })
      })
  })

router.post('/', (req, res) => {
    Post.insert(req.body)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error adding the post',
        })
      })
  })

module.exports = router