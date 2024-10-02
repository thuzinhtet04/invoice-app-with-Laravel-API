import { record } from "zod";
import { create } from "zustand";

const useRecordStore = create((set) => ({
    records : [],
    addRecord : (record) => set( (state) => ({records : [ ...state.records ,  record]}) ) ,
    removeRecord : (id) => set((state) => ({records : state.records.filter( record => record.id != id)})),
    changeQuantity : (id , quantity ) => set( (state) => ({
        records : state.records.map( record => {
            if(record.id === id){
                const newQuentity = record.quantity + quantity 
                const newCost = record.product.price * newQuentity
                return {...record , quantity : newQuentity , cost : newCost}
            }else {
                return record
            }
        })
    }) ),
    resetRecord : () => set( () => ({
        records : []
    }) )

}) )
export default useRecordStore;

