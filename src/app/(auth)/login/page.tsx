"use client"
import React from "react";
import {useAuthStore} from "@/store/Auth";
import { useState,useEffect } from "react";


function LoginPage() {
    const {login} = useAuthStore();
    const [isLoading,setIsLoading] = React.useState(false);
    const [error,setError] = React.useState("");
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collection form 
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        //validations
        if(!email || !password){
            setError(() =>"Please Enter all Fields Required")
            return
        }

        //handle Loading And Error:
        setIsLoading(() => true)
        setError(() =>"")

        //login to store
        const loginResponse = await login(email.toString(),password.toString())

        if(loginResponse.error){
            setError(() => loginResponse.error!.message)
        }
        setIsLoading(() => false)
        
    }
    return(
        <div>loginPage</div>
    )
}

export default LoginPage;
     