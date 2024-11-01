import React from 'react'
import Layout from './components/Layout.component'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
<main className='flex flex-col min-h-screen '>
  <Layout />
  <Toaster position="top-right" />
</main>
  )
}

export default App