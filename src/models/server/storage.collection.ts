import { Permission } from "node-appwrite";
import  storage  from "./config";
import  { questionAttachmentBucket } from "../name"
try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Connected");
} catch (error) {
    try {
        await storage.createBucket(
            questionAttachmentBucket,
            questionAttachmentBucket,
            [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
            false,undefined,undefined,
            ["jpg","jpeg","png","gif","svg",]
 
        );
        console.log("storage Connected");
        }catch(e){
            console.log('Storage error occured',e);
    }
    
}
