//import { FindCursor } from "mongodb";
import { ObjectId } from "mongodb";
import dbConnect from "./dbConnect.js";


export async function getAllFurniture(req, res) {
    //connnect to the datbase
    const db = dbConnect();
    // get the whole furniture collection
    const collection = await db.collection('furniture').find().toArray()
        // catch qny errors--> status 500 
        .catch(err => {
            res.status(500).send(err);
            return;
        })
    // send back the array of furniture 
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.send(collection);

}

export async function addNewFurniture(req, res) {

    //get new furniture from the body of the request 
    const { name, type, color } = (req.body)
    const newFurniture = { name, type, color }

    //connect to database 
    const db = dbConnect()

    //put this new furniture into our furniture collection in our db 
    await db.collection('furniture').insertOne(newFurniture)

        //catch errors wend with status 500 
        .catch(err => {
            res.status(500).send(err)
            return
        })
    //return response with 201 all bueno 
    res.status(201).send({ message: 'Furniture added' })

}

export async function updateFurniture(req, res) {
    const { furnitureId } = req.params
    const db = dbConnect()
    await db.collection('furniture')
        .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, { $set: req.body })
        .catch(err => {
            res.status(500).send(err)
            return
        })
    res.status(202).send({ message: 'Updated furniture' })

}