import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({name, url , icon}) => {
  return (
    <Link to={url} className='flex flex-col gap-3 items-center p-14 text-white '>
    {icon}
    
    {name}

    </Link>
  )
}

export default ModuleBtn