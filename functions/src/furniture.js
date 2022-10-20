//import { FindCursor } from "mongodb";
import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req,res) {
//connnect to the datbase
const db = dbConnect();
// get the whole furniture collection
const collection = await db.collection('furniture').find().toArray()
// cqtch qny errors--> status 500 
.catch(err => {
    res.status(500).send(err);
    return;
})
// send back the array of furniture 

res.send(collection);

}
