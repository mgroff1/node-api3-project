const express = require('express');

const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
router.use(express.json());

//    /api/user
router.post('/', validateUser, (req, res) => {
  const data = req.body;
  userDb.insert(data)
    .then(user => {
      res.status(201).json({user})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "No Luck Making That Post"})
    })
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  postDb.insert({...data, user_id: id})
    .then(post => {
      res.status(201).json({post})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "No Luck Making That Post"})
    })
});

router.get('/', (req, res) => {
  userDb.get()
  .then(user => {
    res.status(200).json({user})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage: "Did You Do Something Wrong No User Match"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.getById(id)
  .then( user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage: "No ID Match Tighten Your Game Up"})
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.getUserPosts(id)
  .then(user => {
    res.status(200).json({user})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage: "Ya That Post Is Not In Existance "})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  userDb.remove(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage: "Possibly, You Do Not Have The Power To Move Forward With This Task"})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  userDb.insert(id, data)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage: "Ya Things Are The Same!"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb.getById(id)
  .then(post => {
    if(!post) {
      res.status(404).json({error: 'No Id Of Match'})
    } else {
      next();
    }
  })
}

function validateUser(req, res, next) {
  const data = req.body;
  if(!data){
    res.status(400).json({message: "This User Has No Stuff"})
  } else if(!data.name){
    res.status(400).json({message: "Use The Empty Input Fields To Input Stuff, But Use Them All "})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const data = req.body;
  if(!data){
    res.status(400).json({message: 'No Post Data '})
  } else if(!data.text){
    res.status(400).json({message: "Use The Empty Input Fields To Input Stuff, But Use Them All"})
  } else {
    next();
  }
}

module.exports = router;
