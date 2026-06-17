const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors"); // used when server is not secure
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // json to js and vice versa
const http = require("http"); //server
const {Server} = require("socket.io");



const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");
require('dotenv').config()

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { commitRepo } = require("./controllers/commit");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command('start', "Start a new server", {}, startServer)
  .command(
    'init', // command
    "Initialise a new repository", // description 
    {}, // parameter
    initRepo // control passed to this function
  )
  .command("add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command("commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command('push', "Push commits to supabase", {}, pushRepo)
  .command('pull', "Pull commits from supabase", {}, pullRepo)
  .command("revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

  function startServer(){
    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;

    mongoose.connect(mongoURI).then(() =>{
      console.log("mongodb connected");
    })
    .catch((err)=>{
      console.error("unable to connect: ", err);
    })

    app.use(cors({origin: "*"}))

    app.get("/", (req, res)=>{
      res.send("welcome");
    });

    
    const user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
    });

    io.on("connection", (socket)=>{
      socket.on("joinRoom", (userID)=>{
        user = userID;
        console.log("======");
        console.log(user);
        console.log("======");
        socket.join(userID);
      });
    })

    const db = mongoose.connection;

    db.once("open", async() =>{
      console.log("CRUD operations called");
    })

    httpServer.listen(port, ()=>{
      console.log(`server is running on port ${port}`);
    })

  }