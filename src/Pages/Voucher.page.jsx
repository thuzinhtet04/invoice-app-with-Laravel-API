import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import VoucherList from '../components/VoucherList'
const VoucherPage = () => {
  return (
    <section>

        <Breadcrumb currentPage='Voucher' />
        <VoucherList />
    </section>
  )
}

export default VoucherPage