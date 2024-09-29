import React from 'react'
import { useParams } from 'react-router-dom'

const VoucherDetailPage = () => {
    const {id} = useParams()
  return (
    <div>VoucherDetailPage {id}</div>
  )
}

export default VoucherDetailPage