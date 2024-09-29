import React from 'react'
import ModuleBtn from '../components/ModuleBtn'
import { HiCircleStack, HiComputerDesktop, HiDocumentDuplicate } from 'react-icons/hi2'

const DashboardPage = () => {
  return (
    <div className='grid grid-cols-3 gap-5'>
        <div className=' bg-blue-400 rounded-lg '>
<ModuleBtn name="Product" url='/products' icon={<HiCircleStack className=' size-10' />} />
        </div>
        <div className=' bg-blue-400 rounded-lg '>
<ModuleBtn name="Sales" url='/sales' icon={<HiComputerDesktop className=' size-10'/>} />
        </div>    <div className=' bg-blue-400 rounded-lg '>
<ModuleBtn name="Vouchers" url='/voucher' icon={<HiDocumentDuplicate className=' size-10'/>} />
        </div>
    </div>
  )
}

export default DashboardPage