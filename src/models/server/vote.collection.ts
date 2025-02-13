import { IndexType,Permission } from "node-appwrite";
import {db,voteCollection} from "../name";
import { databases } from "../client/config";
import  questionAttachmentBucket  from "./storage.collection";

export default async function  createVoteCollection(){
  
            await Storage.getBucket(questionAttachmentBucket,questionAttachmentBucket,[
                Permission.read("any"),
                Permission.read("users"),
                Permission.write("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ]);
             
        console.log("Vote Collection Connected");

        // Creating  Attributes:
        await Promise.all([
            databases.createEnumAttribute(db,voteCollection,
                "type",["answer","question"], true),
            databases.createStringAttribute(db,voteCollection,
                "typeId",50,true),
            databases.createEnumAttribute(db,voteCollection,
                "voteStatus",["up","down"], true),
            databases.createStringAttribute(db,voteCollection,
                "voteById",50,true),
        ])

        console.log("Vote Collection Connected");
    }
   