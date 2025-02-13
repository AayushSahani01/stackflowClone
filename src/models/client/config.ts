import env from "@/app/env"
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) 
    // // Your API Endpoint
    .setProject(env.appwrite.projectID);
     // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

//const result = await account.get();
//console.log(result);

export {client, account, databases, storage, avatar}