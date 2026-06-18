const mongoose = require("mongoose");
const { Schema } = mongoose;
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");



async function createRepo(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "repository name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "invalid user id" });
    }

    const newRepo = new Repository({
      name,
      owner,
      description,
      content,
      visibility,
      issues

    })

    const result = await newRepo.save();

    res.status(201).json({
      message: "repository created! ",
      repoId: result._id
    })

  } catch (err) {
    console.error("error during repository creation: ", err.message);
    res.status(500).send("server error!");
  }
}

async function getAllRepos(req, res) {

  try {
    const repos = await Repository.find({}).populate("owner").populate("issues");
    res.json(repos);
  } catch (err) {
    console.error("error during repository creation: ", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchRepoById(req, res) {
  const  repoID  = req.params.id;

  try {
    const repo = await Repository.findById(repoID)
      .populate("owner")
      .populate("issues");
      

    res.json(repo);

  } catch (err) {
    console.error("error during repository creation: ", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchRepoByName(req, res) {
  const repoName = req.params.name;

  try {
    const repo = await Repository.findOne({ name: repoName })
      .populate("owner")
      .populate("issues");

    if (!repo) {
      return res.status(404).json({ message: "Repository not found!" });
    }

    res.json(repo);
  } catch (err) {
    console.error("error during repository fetching: ", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchRepoForCurrentUser(req, res) {
  const userId = req.user;

  try{
    const repos = await Repository.find({owner: userId});

    if(!repos || repos.length == 0){
      return res.staus(404).json({error: "user repositories not found"});
    }

    res.json({message: "repositories found",repositories })

  } catch (err) {
    console.error("error during repository fetching: ", err.message);
    res.status(500).send("server error!");
  }
}

async function updateRepoById(req, res) {
  const {id} = req.params;
  const {content, description} = req.body;

  try{
    const repo = await Repository.findById(id);

    if(!repo){
      return res.staus(404).json({error: "repository not found"});
    }  

    repo.content.push(content);
    repo.description = description;

    const updatedRepo = await repo.save();
    res.json({
      message: "repository updated successfully",
      repository: updatedRepo
    })


  } catch (err) {
    console.error("error during updating repository: ", err.message);
    res.status(500).send("server error!");
  }
}

async function toggleVisibilityById(req, res) {
  const {id} = req.params;
  

  try{
    const repo = await Repository.findById(id);

    if(!repo){
      return res.staus(404).json({error: "repository not found"});
    }  

    repo.visibility = !repo.visibility;

    const updatedRepo = await repo.save();
    res.json({
      message: "repository visibility toggled successfully",
      repository: updatedRepo
    })


  } catch (err) {
    console.error("error during toggling visibility: ", err.message);
    res.status(500).send("server error!");
  }
}

async function deleteRepoById(req, res) {
  const {id} = req.params;

  try{
    const repo = await Repository.findByIdAndDelete(id);

    if(!repo){
      return res.staus(404).json({error: "repository not found"});
    }  

    res.json({message: "repository deleted successfully"})


  }catch (err) {
    console.error("error during deleting repository ", err.message);
    res.status(500).send("server error!");
  }
}

module.exports = {
  createRepo,
  getAllRepos,
  fetchRepoById,
  fetchRepoByName,
  fetchRepoForCurrentUser,
  updateRepoById,
  toggleVisibilityById,
  deleteRepoById
}