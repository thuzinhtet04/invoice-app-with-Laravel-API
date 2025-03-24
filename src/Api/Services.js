import api from "./axiosInstance";



export const fetcher = async (url, token) => {


console.log(url , token)
    const res = await api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data



};

export const deleteProduct = async (url, { arg }) => {
    await api.delete(url, {
        headers: {
            Authorization: `Bearer ${arg.token}`
        }
    })





}
export const addNewProduct = async (url, arg, token) => {

    const res = await api.post(url, arg, {
        headers: {
            Authorization: `Bearer ${token}`
        },

    })
    return res.data

}
export const updateProduct = async (url, arg, token) => {
    const res = await api.put(url, arg, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data

}
export const createVoucher = async (url, { arg }) => {
    const res = await api.post(url, arg.currentVoucher, {
        headers: {
            Authorization: `Bearer ${arg.token}`
        }
    })
    return res.data

}
export const deleteVoucher = async (url, { arg }) => {

    await api.delete(`${url}/${arg}`)

}
export const registerUser = async (url, { arg }) => {
    try {

        const res = await api.post(url, arg);

        return res.data
    } catch (e) {
        return e.response;
    }

}
export const changeName = async (url, arg, token) => {
    const res = await api.post(url, arg, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res

}

