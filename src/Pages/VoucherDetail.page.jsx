import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import VoucherCard from '../components/VoucherCard '



const VoucherDetailPage = () => {
    const {id} = useParams()
   
  return (
    <section>
    <Container >
<Breadcrumb 
        currentPage={"Voucher Detail"}
        link={[{ name: "Voucher", path: "/voucher" }]}
        />
   

       <VoucherCard id={id}  />
 
   
    </Container>
  </section>
  )
}

export default VoucherDetailPage