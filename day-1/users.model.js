const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");


module.exports.addUserDetails = async (url, dbName, userData) => {
  const client = await MongoClient.connect(url);
  const addUser = client 
    .db(dbName)
    .collection("users")
    .insertOne(userData)
  return addUser
}

module.exports.getUser = async (url, dbName, userid) => {
  const client = await MongoClient.connect(url);
  const getUser = client 
    .db(dbName)
    .collection("users")
    .find({_id: new ObjectId(userid)})
    .toArray()
  return getUser
}