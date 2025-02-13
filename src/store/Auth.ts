import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer'; 
import { AppwriteException,ID,Models } from 'appwrite';
import { Account } from '@models/client/config';
import { account } from '@/models/client/config';

export interface UserPrefs{
    reputation:number

}
interface AuthStore{
    session:Models.Session|null
    jwt:string|null
    userPrefs:UserPrefs|null
    hydrate:boolean

    setHydrate():void;
    verifySession():Promise<void>
    login(
        email:string,
        password:string
    ):Promise<
    {
        success:boolean,
        error?:AppwriteException|null
    }>
    createAccount(
        name:string,
        email:string,
        password:string
    ):Promise<{
        success:boolean,
        error?:AppwriteException|null
    }>
    logout():Promise<void>
    
}    
export const useAuthStore = create<AuthStore>()(persist(
    immer((set) =>){
        session:null,
        user:null,
        jwt:null,
        hydrate:false,
        setHydrate(){

         set({hydrate:true })
        },
        async verifySession(){
        try {
           const session = await Account.getSession("current");
           set({session})
        } catch (error) {
            console.log("verify session error",error);
        }},
        async login(email:string, password:string){
            try {
                const session = await account.createEmailPasswordSession(email,password);
                const [users,{jwt}] = await Promise.all([
                    account.get<UserPrefs>(),
                    account.createJWT()
                ])
                if(!users.prefs?.reputation)
                    await account.updatePrefs<UserPrefs>({
                      reputation:0
                })
                return {
                    success:true,
                    error:null
                }
            } catch (error) {
                console.log("login error",error);
            }
        },
        async createAccount(name:string,email:string,password:string){
            try {
                await account.create(ID.unique(),name,email,password);
                return{success:true}
            } catch (error) {
                console.log("create account error",error)
                return{
                    success:false,
                    error: error instanceof AppwriteException ? error : null,
                }
            }
        },
        async logout(){
            try {
                await account.deleteSession()
                set({session:null,jwt:null,user:null})
            } catch (error) {
                console.log("logout error",error);
            }
        }
    },
    {   
        name:'auth',            onRehydrateStorage:(){
            return (state,error) =>{
                if(!error) state?.setHydrate()    
            }
        }
    }
)
)