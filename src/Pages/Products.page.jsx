import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import ProductList from '../components/ProductList'

const ProductsPage = () => {
  return (
    <section>
        <Breadcrumb currentPage="product" />
        <ProductList/>

    </section>
  )
}

export default ProductsPage