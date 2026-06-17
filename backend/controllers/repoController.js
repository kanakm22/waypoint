const createRepo = (req, res) =>{
  res.send("repository_created");
}

const getAllRepos = (req, res) =>{
  res.send("all_repos_fetched");
}

const fetchRepoById = (req, res) =>{
  res.send("repo_id_fetched");
}

const fetchRepoByName = (req, res) =>{
  res.send("repo_details_fetched");
}

const fetchRepoForCurrentUser = (req, res) =>{
  res.send("repos_for_logged_in_user_fetched");
}

const updateRepoById = (req, res) =>{
  res.send("repo_updated");
}

const toggleVisibilityById = (req, res) =>{
  res.send("visibility_toggled ");
}

const deleteRepoById = (req, res) =>{
  res.send("repo_deleted");
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