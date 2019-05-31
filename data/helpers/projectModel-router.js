const express = require("express");
const project = require("./projectModel");

const router = express.Router();


router.get("/", (req, res) => {
    project
      .get()
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ err: "no projects to get" });
      });
  });

  router.get("/:id", (req, res) => {
    const projectId = req.params.id;
    project
      .get(projectId)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ err: "no such id" });
      });
  });


  router.delete("/:id", (req, res) => {
    const postid = req.params.id;
    project.remove(postid)
    .then(post =>{
        if(post){
            project.remove(postid).then(removepost => {
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
    const projectId = req.params.id;
    const updatedProject = req.body;
  
    project
      .update(projectId, updatedProject)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ err: "no updating here" });
      });
  });

  router.post("/", (req, res) => {
    const newAction = req.body;
    project
      .insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({ err: "cannot insert" });
      });
  });




  module.exports = router;