import ProductListPageLoading from '@/components/Product/ProductListPageLoading'
import React from 'react'

const loading = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className='text-2xl font-bold mb-4'>Ürünler</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {/* Skeleton loaders */}
        <ProductListPageLoading />
      </div>
    </div>
  )
}

export default loading