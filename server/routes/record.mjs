import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
// import User from "../db/models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let result = await collection.findOne({});
    console.log(result);
    res.send(result).status(200);
});

export default router;