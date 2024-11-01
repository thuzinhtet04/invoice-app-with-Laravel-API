import api from "./axiosInstance";



export const fetcher = async (  arg ) => {
    
    console.log('you fetching data')

if(typeof(arg) === 'object'){
    const res = await api.get( arg[0] , {headers : {
            Authorization : `Bearer ${arg[1]}`
         }});
         return res.data
}else{
    const res = await api.get( arg )

    return res.data
}


};

export const deleteProduct = async(url , {arg}) => {
    await api.delete(url+"/"+arg)
    
}
export const addNewProduct  =async (url  , arg , token) => {
    
    const res = await api.post(url ,arg , {
        headers : {
            Authorization : `Bearer ${token}`
        },
        
    } )
    return res.data

}
export const updateProduct = async (url , arg , token) => {
  console.log(url)
   const res = await api.put(url , arg , {
    headers : {
        Authorization : `Bearer ${token}`
    }
   })
     return res.data
    
}
export const createVoucher = async (url, {arg}) => {
    const res = await api.post(url , arg)
    return res.data
    
}
export const deleteVoucher =async (url , {arg}) => {
  
    await api.delete(`${url}/${arg}`)

}
export const registerUser = async (url , {arg}) => {
    const res = await api.post(url , arg);
    return res.data
    
}
export const changeName = async (url , arg) => {
    const res = await api.post(url , arg )
  
    return res
    
}

