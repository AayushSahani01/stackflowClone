import { IndexType, Permission } from "node-appwrite"
import {db, answerCollection} from "../name";
import databases from "./config";
import {} from "@/models/client/config";

export default async function createAnswerCollection() {
    // Creating Collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Answer Collection Created");

        // Creating  Attributes:
        await Promise.all([
               databases.createStringAttribute(db,answerCollection,
                "content",1000,true),
                databases.createStringAttribute(db,answerCollection,
                    "questionId",100,true),
                databases.createStringAttribute(db,answerCollection,
                 "authorId",50,true),
        ])
        console.log("Attributes created successfully");
 
    }
