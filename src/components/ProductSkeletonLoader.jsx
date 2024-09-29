import React from 'react'

const ProductSkeletonLoader = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-8"></div>
    </td>
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-48"></div>
    </th>
  
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-24"></div>
    </td>
  
    <td className="px-6 py-4 text-right text-nowrap">
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-16 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-12"></div>
    </td>
  
    <td className="px-6 py-4 text-right">
      <div className="flex gap-2 justify-end">
        <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </td>
  </tr>
  )
}

export default ProductSkeletonLoader