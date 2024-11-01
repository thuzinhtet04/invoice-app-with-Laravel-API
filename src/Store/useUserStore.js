
import { create } from "zustand";

export  const useUserStore = create( (set) => ({
    user : {},
    setUser : (userobj) => set({ user : userobj}) ,
    removeTokenLocal : () => set({user: {}})
}))