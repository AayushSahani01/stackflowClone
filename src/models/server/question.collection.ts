import { IndexType, Permission } from "node-appwrite"
import {db, questionCollection} from "../name";
import databases from "./config";

export default async function createQuestionCollection(){
    /// Creating Collection:
    await databases.createCollection(db,questionCollection,
        questionCollection,[
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),

        ])
        console.log("Collection created successfully");

        // Creating  Attributes:
        await Promise.all([
               databases.createStringAttribute(db,questionCollection,
                "title",100,true),
                databases.createStringAttribute(db,questionCollection,
                    "content",10000,true),
                databases.createStringAttribute(db,questionCollection,
                 "authorId",50,true),
                databases.createStringAttribute(db,questionCollection,
                 "tags",100,true,undefined,true),
                 databases.createStringAttribute(db,questionCollection,
                    "attachmentsId",50,false),
                

        ])
        console.log("Attributes created successfully");

        /// Creating indexes:
        await Promise.all([
            databases.createIndex(db,questionCollection,
                "title",
                    IndexType.Fulltext,
                    ["title"],['asd']
                ),
                databases.createIndex(db,questionCollection,
                    "content",
                        IndexType.Fulltext,
                        ["content"],['asd']
                    ),
                    databases.createIndex(db,questionCollection,
                        "authorId",
                            IndexType.Unique,
                            ["authorId"],['asd']
                        ),
                        databases.createIndex(db,questionCollection,
                            "tags",
                                IndexType.Fulltext,
                                ["tags"],['asd']
                            ),
                databases.createIndex(db,questionCollection,
                                "attachmentsId",
                                    IndexType.Fulltext,
                                    ["attachmentsId"],['asd']
                                ),
        ])
    }
