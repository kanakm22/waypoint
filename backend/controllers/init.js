const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

async function initRepo(){
  const repoPath = path.resolve(process.cwd(), '.waypoint'); // hidden folder
  const commitsPath = path.join(repoPath, "commits"); // commits folder is not hidden

  try{
    await fs.mkdir(repoPath, {recursive: true}) // nested folder structure
    await fs.mkdir(commitsPath, {recursive: true});

    // for hidden folder
    if (process.platform === "win32") {
      await execPromise(`attrib +h "${repoPath}"`);
    }

    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({bucket: process.env.S3_BUCKET})
    );
    console.log("repository initialised");
  }catch (err){
    console.error("error initialising repository",err);
  }
}

module.exports = {initRepo};