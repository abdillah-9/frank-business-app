"use client";
import { useQuery } from "@node_modules/@tanstack/react-query";
import { getCurrentUser } from "@utils/apiAuth";

export default function useUser(){
    const {isLoading, data:user} = useQuery({
        queryKey:["user"],
        queryFn:getCurrentUser
    });
    console.log("user fetched from cache: "+user)

    return {isLoading, user, isAuthenticated: user?.role === "authenticated"}
}
