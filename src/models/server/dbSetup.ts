import {db} from "../name";
import { Permission } from "node-appwrite";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { Storage } from "node-appwrite";
import databases  from "./config";

export default async function getOrCreateDB() {
    try{
        await databases.get(db)
        console.log("Database Connected");
    }catch(error){
        try {
            await databases.createDatabase(db,db)
            console.log("Database Created");
            await Promise.all([
            await createQuestionCollection(),
            await createAnswerCollection(),
            await createCommentCollection(),
            await createVoteCollection(),

        ])
        console.log("Collections Created");
        console.log("Database Connected");
        } catch (error) {
            console.log('Database error occured catched',error);
        }
    }
    return databases;
}