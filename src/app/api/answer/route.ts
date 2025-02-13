"use client"
import { answerCollection } from "@/models/name";
import { NextResponse, NextRequest } from "next/server";
import { databases } from "@/models/client/config";
import { db } from "@/models/server/config";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import { users } from "@/models/client/config";
import { UserPrefs } from "@/store/Auth";
import { Content } from "next/font/google";

export async function POST(request: Request) {
try {
   const {questionId,answer,authorId} = await request.json();

   const response = await databases.createDocument(
       db,
       answerCollection,
       ID.unique(),
       {
           questionId:questionId,
           Content:answer,
           authorId:authorId,
       }
   )
   // Increasing Author Id reputations:
    const prefs = await users.getPrefs<UserPrefs>(authorId)
    await users.updatePrefs(authorId,{
        reputation:Number(prefs.reputation)+1
    })
    return NextResponse.json({
        status:200,
    })
}

export async function DELETE(request:NextRequest){
    try {
      const {answerId} = await request.json()

      const answer = await databases.getDocument(
          db,
          answerCollection,
          answerId
      )
      const response = await databases.getDocument(db,answerCollection,answerId)

      /// Decreasing The Reputations:
      const prefs = await Users.getPrefs<UserPrefs>(answer.authorId)
      await Users.updatePrefs(answer.authorId,{
        reputation:Number(prefs.reputation)-1
      })

      return NextResponse.json({
          status:204
      },
         { data:response}
    )
    } catch (error:any) {
        return NextResponse.json(
            {error:error?.message || "Error Creting Answer"},
            {status: error?.status || error?.message || 500}
        )
    }
}}