import { create } from "zustand";
import type { ChatTypes } from "../types/chat.types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatTypes>((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUser: async () => {
        set({
            isUsersLoading: true
        })
        try {
            const res = await axiosInstance.get('/messages/users')
            set({
                users: res.data.users
            })
            toast.success('Users fetched successfully')

        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        } finally {
            set({
                isUsersLoading: false
            })
        }
    },
    getMessage: async (userId) => {
        set({
            isMessageLoading: true
        })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({
                message: res.data.data
            })
            toast.success('Messages fetched successfully')
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        } finally {
            set({
                isMessageLoading: false
            })
        }
    },
    sendMessage: async (messageData: any) => {
        const { selectedUser, message } = useChatStore.getState()
        console.log(messageData);

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData)
            set({
                message: [...message, res.data.data],

            })
            toast.success('Message sent successfully')
        } catch (err) {
            toast.error('Something went wrong')
            console.log(err)
        }
    },
    setSelectedUser: (selectedUser) => set({
        selectedUser
    }),
    subscribeToNewMessage: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage: any) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSentFromSelectedUser) return;
            set({
                message: [...get().message, newMessage]
            })
        })

    },
    unsubscribeFromNewMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage')
    }
}))