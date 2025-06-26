import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AuthState } from "../types/auth.types";
import   { io } from "socket.io-client";

export const useAuthStore=create<AuthState>((set,get)=>({
    authUser:null,
    isSignInUp:false,

    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try{
            const res= await axiosInstance.get(`/auth/check`)
            set({
                authUser: res.data.user,
            })
            get().connectSocket()
        }catch(err){
            console.log(err)
            set({
                authUser: null,
            })
        }finally{
            set({
                isCheckingAuth:false,
            })
        }
    },
    signup: async (data) => {
        try {
            const res= await axiosInstance.post(`/auth/signup`,data)
            set({
                authUser: res.data,
            })
            toast.success("Account created successfully")
            get().connectSocket()
            
        } catch (err:any) {
            console.log(err);
            toast.error(err.response.data.error);
        } finally {
            set({ isSignInUp: false });
        }
    },
    logout:async()=>{
        try{
            await axiosInstance.post(`/auth/logout`)
            set({
                authUser:null,
            })
            get().disConnectSocket()
            toast.success("Logged out successfully");
        }catch(err:any){
            toast.error(err.response.data.message);
        }
    },
    login:async(data)=>{
        try{
            const res = await axiosInstance.post(`/auth/login`,data)
            set({
                authUser: res.data,
            })
            toast.success("Logged in successfully")
            get().connectSocket()
        }catch(err:any){
            toast.error(err.response.data.message);
            console.log(err);   
        }finally{
            set({ isLoggingIn: false });
        }
    },
    updateProfile:async(data)=>{
        set({
            isUpdatingProfile:true
        })
        try{
            const res=await axiosInstance.put(`/auth/update-profile`,data)
            set({
                authUser: res.data,
            })
            console.log(res);
            toast.success("Profile updated successfully")
            

        }catch(err:any){
            toast.error(err.response.data.message);
            console.log(err);
        }finally{
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket:async()=>{
        const {authUser}=get()
        if(!authUser) return
       const socket=io(`http://localhost:5000`,{
        query:{
            userId:authUser._id
        }
       })
       socket.connect()

       set({
        socket:socket
       })

       socket.on('getOnlineUsers',(userIds)=>{
        console.log(userIds);
        
        set({
           onlineUsers:userIds 
        })
       })
       
    },
    disConnectSocket:()=>{
        if(get().socket.connected) get().socket.disconnect()

    }
    

}))