import api from "./axiosInstance";

export const fetcher = async (url) => {
    console.log(url)
 const res = await api.get(url);
 return res.data
};

export const deleteProduct = async(url , {arg}) => {
    await api.delete(url+"/"+arg)
    
}
export const addNewProduct  =async (url  , {arg}) => {
    const res = await api.post(url , arg)
    return res.data

}
export const updateProduct = async (url , {arg}) => {
  
   const res = await api.put(url+'/'+arg.id , arg)
     return res.data
    
}

