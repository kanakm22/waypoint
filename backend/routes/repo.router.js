const express = require("express");

const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepo);
repoRouter.get("/repo/all", repoController.getAllRepos);
repoRouter.get("/repo/:id", repoController.fetchRepoById);
repoRouter.get("/repo/name/:name", repoController.fetchRepoByName);
repoRouter.get("/repo/user/:userId", repoController.fetchRepoForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepoById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepoById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

module.exports = repoRouter;
