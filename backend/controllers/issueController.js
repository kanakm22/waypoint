const createIssue = (req, res) =>{
  res.send("issue_created");
}

const updateIssueById = (req, res) =>{
  res.send("issue_updated");
}

const deleteIssueById = (req, res) =>{
  res.send("issue_deleted");
}

const getAllIssues = (req, res) =>{
  res.send("all_issues_fetched");
}

const getIssueById = (req, res) =>{
  res.send("issue_details_fetched");
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById
}

