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

router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({ message: 'The post could not be found' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error updating the post',
        })
      })
  })

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been nuked' })
        } else {
          res.status(404).json({ message: 'The post could not be found' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error removing the post',
        })
      })
  })

router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
      .then(comments => {
        if (comments.length > 0) {
          res.status(200).json(comments)
        } else {
          res.status(404).json({ message: 'No comments for this post' })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'Error retrieving the comments for this post',
        })
      })
  })

module.exports = router