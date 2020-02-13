const express = require('express');

const router = express.Router();
const Posts = require("./postDb");

// custom middleware

function validatePostId(req, res, next) {

  Posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.response = post;
        next();
      } else {
        res.status(400).json({
          message: "The specified post ID does not exist."
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
}

router.get('/', (req, res) => {

  Posts.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Unable to retrieve posts"
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {

  res.send(req.response);
});

router.delete('/:id', validatePostId, (req, res) => {

  const postToBeDeleted = [{
    ...req.response
  }];

  Posts.remove(req.response.id)
    .then(deletedPost => {
      res.status(200).json(postToBeDeleted);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Unable to delete the specified post."
      });
    });

});

router.put('/:id', validatePostId, (req, res) => {
  res.send(req.body);

  Posts.update(req.params.id, req.body)
    .then(updatedPost => {
      res.status(200).json(updatedPost)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Unable to update the post"
      })
    })
});

module.exports = router;
