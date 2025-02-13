import React from "react";
import {useAuthStore} from "@/store/Auth";
import { request } from "http";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
 
function RegisterPage() {
    const {createAccount} = useAuthStore();
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState("");
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Collect the form data
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") 
        const lastName = formData.get("lastName")  
        const email = formData.get("email")  
        const password = formData.get("password")  

        // Validate
        if(!firstName || !lastName || !email || !password){
            setError("Please Alert! All fields are required");
            return;
        }
        // Call the store
        setIsLoading(true);
        setError("");
         
        await createAccount(
            `${firstName} ${lastName}`,
            email?.toString() ,
            password?.toString()
        )
        if (response.error) {
            setError(() => response.error!.message);
        }else{
            const loginResponse = await Login(email?.toString() || "",password?.toString() || "");
            if(loginResponse.error){
                setError(() => loginResponse.error!.message);
            }
        }
        setIsLoading(false);
    }
    return (
        <div>
            {error && (
                <p>{error}</p>
            )}
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" />
                <input type="text" name="lastName" placeholder="Last Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <h1>Register Page</h1>
        </div>
    )
}

export default RegisterPage;