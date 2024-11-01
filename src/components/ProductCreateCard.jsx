import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { z } from 'zod'
import { addNewProduct } from '../Api/Services'
import 'ldrs/leapfrog'
import useCookie from 'react-use-cookie'

const ProductCreateCard = () => {
  const [token] = useCookie("my-token")

  const createFormSchema = z.object({
    createName : z.string().min(3 ,"too short").max(10 , "too long"),
    createPrice : z.number({ invalid_type_error : "please fill number"}).max(10000 , "too expensive").min(100, "too cheap").positive("enter positive number"),
    createCheck : z.boolean().refine((val) => val === true , { message : " please check "}),
    goback : z.boolean().optional()

 
  })
  const nav = useNavigate()
  const { handleSubmit ,reset  , register , formState : {errors} } = useForm( {
    resolver: zodResolver(createFormSchema), mode : "onSubmit" , reValidateMode : "onBlur"
  })
  const {trigger , isMutating } = useSWRMutation(`${import.meta.env.VITE_BASE_URL}/products` , (url , {arg} ) =>  addNewProduct(url , arg , token) )
  const onCreateSubmit =async (data) => {
    
const newProduct ={
  product_name : data.createName.trim(),
  price: data.createPrice,
  create_at : new Date().toISOString(),
}

    await trigger(newProduct)
    reset()
if(data.goback) nav("/dashboard/products")
    toast.success("create successfully")
  }

  return (
    <form onSubmit={handleSubmit(onCreateSubmit)} className=' w-full md:w-1/2 bg-violet-300 p-5 mt-5 rounded-md '> 
         <div className= "flex flex-col justify-center mb-4">
            <label htmlFor="createName"> Product Name</label>
            <input
            {...register("createName" 
              // {
              //   required: {
              //     value : true,
              //     message : "required"
              //   },
              //   minLength : {
              //     value : 5 ,
              //     message : "need more characters"
              //   }
              // }

            )}
            type="text"
            id="createName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your product name ..."
            
          />
          {errors.createName && (<p className=' text-red-400 italic'> {errors.createName.message}</p>)}
            
         </div>
         <div className= "flex flex-col justify-center mb-4">
            <label htmlFor="createPrice"> Product Price</label>
            <input
            {...register("createPrice" , {valueAsNumber : true}) }
            type="number"
            id="createPrice"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your product Price ..."
            
          />
          {errors.createPrice && ( <p className=' text-red-400 italic'>{errors.createPrice.message}</p>)}
            
         </div>
         <div className= "flex items-center mb-2">

         <input {...register("createCheck")}  id='createCheck' type="checkbox" className=' w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:border-blue-500 me-3' />
         {errors.createCheck && (<p className=' text-red-400 italic'> {errors.createCheck.message}</p>)}

         <label htmlFor="createCheck">Make all fields are sure</label>
         </div>
         <div className= "flex items-center mb-4">

<input {...register("goback")}  id='goback' type="checkbox" className=' w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:border-blue-500 me-3' />
{errors.goback && (<p className=' text-red-400 italic'> {errors.createName.message}</p>)}

<label htmlFor="goback">Go back to products Page after create new Product</label>
</div>
<div className='flex items-center'   >
    <Link className="p-2.5  ms-2 text-sm inline-flex items-center gap-3 font-medium  bg-white rounded-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/products">Cancel</Link>
    <button type='submit' disabled={isMutating} className=" size-20 !h-10 inline-flex justify-center  ms-2 text-sm items-center gap-3 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {isMutating ? <l-leapfrog
           size="20"
            speed="2.5"
            color="black" 
          ></l-leapfrog> : "Creating" }</button>
</div>
    </form>
  )
}

export default ProductCreateCard