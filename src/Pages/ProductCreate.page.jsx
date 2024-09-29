import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import ProductCreateCard from '../components/ProductCreateCard'

const ProductCreatePage = () => {
  return (
<section>
        <Breadcrumb currentPage="product" link={[{name : "product" , path : "/products"}]} />
        <h1 className=' text-2xl font-bold '>Create Product</h1>
        <p className=' text-stone-300 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum laborum inventore voluptatum cupiditate deserunt est, unde commodi possimus repellat esse asperiores dicta ut recusandae sed quos culpa maiores distinctio dignissimos.</p>
        <ProductCreateCard/>

    </section>
  )
}

export default ProductCreatePage