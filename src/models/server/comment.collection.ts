import env from "@/app/env";
import {db, commentCollection} from "../name";
import { IndexType, Permission } from "node-appwrite";
import databases  from "./config";

export default async function createCommentCollection(){
    await databases.createCollection(db,commentCollection,
    commentCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]
)
console.log("Collection created successfully");

// Creating  Attributes:
await Promise.all([
    databases.createStringAttribute(db,commentCollection,
        "content",1000,true),
    databases.createEnumAttribute(db,commentCollection,
        "type",["question","answer"], true),
    databases.createStringAttribute(db,commentCollection,
        "authorId",50,true),
])
console.log("Attributes created successfully");

}
