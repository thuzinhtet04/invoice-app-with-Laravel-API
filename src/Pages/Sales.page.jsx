import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import VoucherInfo from '../components/VoucherInfo'

const SalesPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPage={"Sale"} />
        <VoucherInfo />
      </Container>
    </section>
  )
}

export default SalesPage