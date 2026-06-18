const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
  const { title, descripti9on } = req.body;
  const { id } = req.params;

  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    })

    await issue.save();

    res.staus(201).json(issue);
  } catch (err) {
    console.error("error during issue creation: ", err.message);
    res.status(500).send("server error!");
  }

}

async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, descripti9on, status } = req.body;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found" })
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json(issue, { message: "issue updated" });

  } catch (err) {
    console.error("error during issue updation: ", err.message);
    res.status(500).send("server error!");
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await  Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found" })
    }

    res.json({ message: "issue deleted!" });

  } catch (err) {
    console.error("error during issue deletion: ", err.message);
    res.status(500).send("server error!");
  }
}

async function getAllIssues(req, res) {
  const { id} = req.params;
  try{

    const issues = await  Issue.find({repository: id});

    if (!issues) {
      return res.status(404).json({ error: "issue not found" })
    }
    res.status(200).json(issues);

  }catch (err) {
    console.error("error during issue fetching: ", err.message);
    res.status(500).send("server error!");
  }
}

async function getIssueById(req, res) {
  const { id} = req.params;
  try{
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found" })
    }

    res.json(issue);

  }catch (err) {
    console.error("error during issue fetching: ", err.message);
    res.status(500).send("server error!");
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById
}

