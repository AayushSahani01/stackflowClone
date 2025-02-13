import { databases } from "@/models/client/config";
import { voteCollection,answerCollection,questionCollection } from "@/models/name";
import { ID } from "node-appwrite";
import { Permission } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import { Query } from "appwrite";
import { NextResponse, NextRequest } from "next/server";
import React from "react";
import {db} from "@/models/name";
import { users } from  "./config/client";
import {QuestionOrAnswer} from "@/models/client/config";
import authorPrefs from "./config/client";
export async function POST (request:NextRequest){
    try {
        // data Grabbing:First
        const {votedById,voteStatus,type,typeId} = await request.json();

        // List Documents
        const response = await databases.listDocuments(db,voteCollection,[
            Query.equal("type",type),
            Query.equal("typeId",typeId),
            Query.equal("voteById",votedById)
        ])

        if(response.documents.length > 0){
            // Deleting The Document
            await databases.deleteDocument(db,voteCollection,
                response.documents[0].$id
            )

            // decrease vote reputations:
            const QuestionOrAnswer = await databases.getDocument( db, type ==="question"?questionCollection:answerCollection,typeId

            );
            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId,{
                reputation:response.documents[0].voteStatus === "upvoted" ? Number(authorPrefs.reputation) - 1:
                Number(authorPrefs.reputation) + 1
            })


        } 
        if(response.documents[0]?.voteStatus !== voteStatus){
            // Creating The Document
            const doc = await databases.createDocument(db,voteCollection,ID.unique(),{
                type,typeId,voteStatus,votedById
            });

            // Inceasing Or Decreasing vote reputation:
            const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)
             
            // if vote was present:
            if(response.documents[0])
                {
                await users.updatePrefs<UserPrefs>
                (QuestionOrAnswer.authorId,{
                    reputation:
                    //that means previous vote was "upvoted" & new value is "downvoted" so we have to decrease vote reputation:
                    response.documents[0].voteStatus === "upvote"
                    ? Number(authorPrefs.reputation) - 1:
                    Number(authorPrefs.reputation) +1,
                })
            
            
            }else{
                await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId,{
                    reputation:
                    voteStatus === "upvote"
                    ? Number(authorPrefs.reputation) +1
                    : Number (authorPrefs.reputation) -1,
                });
            }
        
        }

        const [upvote,downvote] = await Promise.all([
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","upvote"),
                Query.equal("voteById",votedById),
                Query.limit(1)
            ]),
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","downvote"),
                Query.equal("voteById",votedById),
                Query.limit(1)
            ]),
        ])

        return NextResponse.json(
            {
                data:{
                    document:null,voteResult:upvote.total = downvote.total

                },
               
               
            }, {status:200},
          
        )        
    } catch (error:any) {
        return NextResponse.json({
            error: error?.message ||"Something went wrong"
        },
        {status: error?.status || error?.message || 500}
    )
        
    }
}