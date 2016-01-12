import express from 'express';
import db from './db.js';

let listsRouter = express.Router();

const emptyList = {name: "", content: "", user_id: null};

listsRouter.get("/",
  (req, res, next) => {
    db.lists.find({}).sort({ createdAt: 1 }).exec((err, docs) => {
      res.json({lists: docs});
    });
  }
)

listsRouter.get("/:id",
  (req, res, next) => {
    db.lists.find({_id: req.params.id}, (err, docs) => {
      res.json({list: docs ? docs[0] : {}});
    });
  }
)

listsRouter.post("/",
  (req, res, next) => {
    let list = Object.assign(emptyList, req.body.list);
    db.lists.insert(list, (err, doc)=>{
      if(err !== null) {
        res.status(422).json({list: list, errors: [err]});
      }
      else {
        res.json({list: doc});
      }
    })
  }
)

listsRouter.put("/:id",
  (req, res, next) => {
    db.lists.find({_id: req.params.id}, (err, docs) => {
      let list = Object.assign(docs[0]||emptyList, req.body.list);
      db.lists.update({_id: req.params.id}, list, {}, (err, num, doc)=>{
        if(err !== null) {
          res.status(422).json({list: list, errors: [err]});
        }
        else {
          db.lists.find({_id: req.params.id}, (err, docs) => {
            res.json({list: docs ? docs[0] : {}});
          });
        }
      })
    });
  }
)

listsRouter.delete("/:id",
  (req, res, next) => {
    let list = Object.assign(emptyList, req.body.list);
    db.lists.remove({_id: req.params.id}, {}, (err, num, doc)=>{
      if(err !== null) {
        res.status(422).json({list: list, errors: [err]});
      }
      else {
        res.status(200).json({list: {_id: list._id}})
      }
    })
  }
)

export default listsRouter;
