import express from 'express';
import db from './db.js';

let usersRouter = express.Router();

usersRouter.get("/",
  (req, res, next) => {
    db.users.find({}, (err, docs) => {
      res.json({users: docs});
    });
  }
)

usersRouter.get("/:id",
  (req, res, next) => {
    db.users.find({_id: req.params.id}, (err, docs) => {
      res.json({user: docs ? docs[0] : {}});
    });
  }
)

usersRouter.post("/",
  (req, res, next) => {
    let user = Object.assign({name: ""}, req.body.user);
    db.users.insert(user, (err, doc)=>{
      if(err !== null) {
        res.status(422).json({user: user, errors: [err]});
      }
      else {
        res.json({user: doc});
      }
    })
  }
)

usersRouter.put("/:id",
  (req, res, next) => {
    let user = Object.assign({name: ""}, req.body.user);
    db.users.update({_id: req.params.id}, user, {}, (err, num, doc)=>{
      console.log(num);
      if(err !== null) {
        res.status(422).json({user: user, errors: [err]});
      }
      else {
        db.users.find({_id: req.params.id}, (err, docs) => {
          res.json({user: docs ? docs[0] : {}});
        });
      }
    })
  }
)

usersRouter.delete("/:id",
  (req, res, next) => {
    let user = Object.assign({name: ""}, req.body.user);
    db.users.remove({_id: req.params.id}, {}, (err, num, doc)=>{
      console.log(num);
      if(err !== null) {
        res.status(422).json({user: user, errors: [err]});
      }
      else {
        res.status(200).json({user: {_id: user._id}})
      }
    })
  }
)

export default usersRouter;
