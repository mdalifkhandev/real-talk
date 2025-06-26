import type { AuthUser } from "./auth.types";

// Example types (adjust based on your actual data structure)
type Message = {
  _id: string;
  text: string;
  image: string | null;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatTypes={
    message:Message[],
    users:AuthUser[] | null,
    selectedUser:AuthUser|null,
    isUsersLoading:boolean,
    isMessageLoading:boolean,

    getUser:()=>Promise<void>
    getMessage:(userId:string)=>Promise<void>
    setSelectedUser:(user:AuthUser|null)=>void
    sendMessage:(messageData:{text?:string,image?:string | null}|null)=>void,
    subscribeToNewMessage:()=>void,
    unsubscribeFromNewMessage:()=>void,
}