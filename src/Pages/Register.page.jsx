import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { z } from 'zod'
import { registerUser } from '../Api/Services'
import toast, { Toaster } from 'react-hot-toast'

const RegisterPage = () => {
  const nav = useNavigate()

    const createFormSchema = z.object({
        name : z.string().min(5 , "please make your name at least 5 letters").max(20 , "your name is too long"),
        email : z.string().email("please check your input should be email format").min(1 , "pleale fill this is not opitional "),
        password : z.string().min(5, "your password should be at least 5 letter").max(20 , "your password is too long to remember for you , please use shorter password"),
        password_confirmation : z.string().min(5, "your password should be at least 5 letter").max(20 , "your password is too long to remember for you , please use shorter password"),
        checkbox : z.boolean().refine( (val) => val === true , {message : "you need to agree our terms and conditions"})

    }).refine((data) => data.password === data.password_confirmation , {
        message : "passwords do not match",
        path : ["password_confirmation"]
    })
    const { handleSubmit ,reset  , register , formState : {errors} } = useForm({
        resolver:zodResolver(createFormSchema),
    mode : onblur 
    })
    const { trigger , isMutating , error , data } = useSWRMutation(`${import.meta.env.VITE_BASE_URL}/register` , registerUser)
   
    const onRegisterSubmit = async(data) => {
  
        console.log(data)
        const newUserData = JSON.stringify({
            name : data.name,
            email : data.email,
            password : data.password,
            password_confirmation : data.password_confirmation
        })
         const res = await trigger(newUserData)
         if(res.status = 200){
          toast.success("register successfully")
          nav("/")
         }
         
    
    }

        
  return (
<section className="bg-gray-50 dark:bg-gray-900">
  <Toaster position="top-right" />

  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
      TakeMichi app    
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-4 md:space-y-6" action="#">
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input {...register("name")} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg.Aung Kyaw"  />
            {errors.name && <p className=' text-red-500 italic'>{errors.name.mess}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input {...register("email")} autoComplete='current-email'  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  />
            {errors.email && <p className=' text-red-500 italic'>{errors.email.message}</p>}

          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input {...register("password")} autoComplete='current-password' type="password" name="password" id="password" placeholder="asdfjkk123" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {errors.password && <p className=' text-red-500 italic'>{errors.password.message}</p>}

          </div>
          <div>
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input {...register("password_confirmation")} autoComplete='current-password'  type="password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="asdfjkk123" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {errors.password_confirmation && <p className=' text-red-500 italic'>{errors.password_confirmation.message}</p>}

          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input {...register("checkbox")} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
            {errors.checkbox && <p className=' text-red-500 italic'>{errors.checkbox.message}</p>}
              
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
            </div>
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

  )
}

export default RegisterPage