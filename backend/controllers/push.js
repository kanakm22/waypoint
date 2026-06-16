const fs = require("fs").promises;
const path = require("path");
const supabase = require("../config/supabase-config")

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), '.waypoint');
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);

        const bucketName = 'waypointbucket';
        const supabaseKeyPath = `commits/${commitDir}/${file}`;

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(supabaseKeyPath, fileContent, {
            upsert: true,
            contentType: 'application/octet-stream',
            duplex: 'half'
          });
        if (error) throw error;

      }
    }
    console.log("All commits pushed to supabase.")

  } catch (err) {
    console.error("Error while pushing: ", err);
  }
}

module.exports = { pushRepo };