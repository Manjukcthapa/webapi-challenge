const express = require("express");
const db = require("./actionModel.js");
const router = express.Router();


router.get("/", (req, res) => {
    db.get()
    .then(action =>{
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({err: "cannot get the data"})
    })
})

router.get("/:id", (req, res) => {
    const actionId = req.params.id;
    db
      .get(actionId)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        res.status(500).json({ err: "no such id" });
      });
  });



  router.delete("/:id", (req, res) => {
    const postid = req.params.id;
    db.remove(postid)
    .then(post =>{
        if(post){
            db.remove(postid).then(removepost => {
                res.status(201).json(removepost);
            });
        } else{
            res.status(404).json({
                error:err,
                message:"The user with specified ID does no exist"

            })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user could not be removed" });
    })
});






router.put("/:id", (req, res) => {
    const actionId = req.params.id;
    const updatedAction = req.body;
    db
      .update(actionId, updatedAction)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        res.status(500).json({ err: "cannot update" });
      });
  });



  router.post("/", (req, res) => {
    const newAction = req.body;
    db
      .insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({ err: "cannot insert" });
      });
  });














module.exports = router;