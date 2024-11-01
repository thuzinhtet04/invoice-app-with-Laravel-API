import React from 'react'
import ProductEditCard from '../components/ProductEditCard'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const ProductEditPage = () => {
    const {id} = useParams()
    console.log(id)
  return (
<section>
        <Breadcrumb currentPage="ProductEdit" link={[{name : "product" , path : "/dashboard/products"}]} />
        <h1 className=' text-2xl font-bold '>Edit Product</h1>
        <p className=' text-stone-300 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum laborum inventore voluptatum cupiditate deserunt est, unde commodi possimus repellat esse asperiores dicta ut recusandae sed quos culpa maiores distinctio dignissimos.</p>
        <ProductEditCard id={id}   />

    </section>
  )
}

export default ProductEditPage