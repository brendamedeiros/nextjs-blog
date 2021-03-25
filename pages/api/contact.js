import { MongoClient } from "mongodb";

const env = process.env;

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !message ||
            message.trim() === ""
        ) {
            res.status(400).json({ status: "fail", message: "Invalid input." });
            return;
        }

        const newMessage = {
            email,
            name,
            message,
        };

        let client;

        const connectionString = `mongodb+srv://${env.mongodb_username}:${env.mongodb_password}@${env.mongodb_cluster}.auimn.mongodb.net/${env.mongodb_database}?retryWrites=true&w=majority`;

        try {
            client = await MongoClient.connect(connectionString);
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "Something went wrong",
            });
            return;
        }

        const db = client.db("my-site");

        try {
            const result = await db
                .collection("messages")
                .insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (err) {
            client.close();
            res.status(500).json({
                status: "fail",
                message: "Storing message failed",
            });
            return;
        }

        client.close();

        res.status(201).json({
            status: "success",
            data: newMessage,
            message: "Message successfully stored",
        });
    }
}

export default handler;
