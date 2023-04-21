const express = require("express");
const userModel = require("./users.model");

const app  = express();
app.use(express.json())

let userdetails = [
  {
    userid: 1, 
    name: 'arun',
    location: "chennai"
  },
  {
    userid: 2,
    name: "akash",
    location: "bangalore"
  }
]
const dbURL = "mongodb://localhost:27017";
const dbName = "userdb"

//Simple get request
app.get("/first", (req,res) => {
  res.send({
    msg: "First get API"
  })
});

//Using input body type
app.post("/first", (req,res) => {
  let userInput = req.body.name;
  res.send({
    name: userInput
  })
})

//Using input param type
app.post("/params/:id", (req,res) => {
  const userid = req.params.id;

  res.send({
    userid: userid
  })
});

//Using input query type
app.post("/query", (req, res) => {
  const projectInput = req.query.project;
  res.send({
    project: projectInput
  })
})

//Fetch particular user
app.post("/userdata/:userid", (req,res) => {
  let userid = parseInt(req.params.userid);
  let result;
  for (let user of userdetails) {
    if (user.userid === userid) {
      result = user
    }
  }

  res.send({
    user: result
  })
})

//API TO STORE USER DATA IN DB
app.post('/addUser', async (req,res) => {
  const userDetails = req.body;
  const addUser = await userModel.addUserDetails(dbURL, dbName, userDetails);
  res.send(addUser)
})

//GET AN USER FROM DB
app.get("/getUser/:id", async (req,res) => {
  console.log("inside get user")
  const userid = req.params.id;
  const result = await userModel.getUser(dbURL, dbName, userid)
  res.send(result)
})

app.listen(4000, () => {
  console.log("app running on port 4000")
})
