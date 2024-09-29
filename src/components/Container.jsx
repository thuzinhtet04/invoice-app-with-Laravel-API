import React, { Children } from 'react'

const Container = ({children, className , ...props}) => {
  return (
    <div className={` container sm:px-6 p-2 mx-auto ${className} `} {...props} >{children}</div>
  )
}

export default Container