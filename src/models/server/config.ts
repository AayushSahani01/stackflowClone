import env from "@/app/env";
import { Client, Users, Avatars, Databases, Storage } from "node-appwrite";
const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint)
     // Your API Endpoint
    .setProject(env.appwrite.projectID)
     // Your project ID
    .setKey(env.appwrite.apikey) 
    // Your secret API key

const databases = new Databases(client);
const users = new Users (client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export default {client,users, databases, storage, avatar}