import { MongoClient } from "mongodb";

const connectionString = 'mongodb+srv://cs3750:Password1@cluster0.spduehw.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("speed_server");

export default db;