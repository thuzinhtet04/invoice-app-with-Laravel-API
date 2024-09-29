import React from 'react'
import Container from './Container'

const Header = () => {
  return (
<header className='mb-5'>
    <Container>
        <h1 className='text-3xl font-bold'>SMART REC</h1>
        <p className=' text-stone-400 '>Invoice App</p>
    </Container>
</header>
  )
}

export default Header