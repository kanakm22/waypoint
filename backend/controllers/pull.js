const fs = require("fs").promises;
const path = require("path");
const supabase = require("../config/supabase-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), '.waypoint');
  const commitsPath = path.join(repoPath, "commits");

  try {
    const { data: commitDirs, error: listError } = await supabase.storage
      .from('waypointbucket')
      .list('commits');

    if (listError) throw listError;

    for (const dir of commitDirs) {
      const commitDir = path.join(commitsPath, dir.name);
      await fs.mkdir(commitDir, { recursive: true });

      const { data: files, error: fileError } = await supabase.storage
        .from('waypointbucket')
        .list(`commits/${dir.name}`);

      if (fileError) throw fileError;

      for (const file of files) {
        const { data: blob, error: downloadError } = await supabase.storage
          .from('waypointbucket')
          .download(`commits/${dir.name}/${file.name}`);

        if (downloadError) throw downloadError;

        const fileContent = Buffer.from(await blob.arrayBuffer());
        await fs.writeFile(path.join(commitDir, file.name), fileContent);

        console.log(`Pulled: ${dir.name}/${file.name}`);
      }
    }

    console.log("All commits pulled successfully");

  } catch (err) {
    console.error("unable to pull: ", err);
  }
}

module.exports = { pullRepo };