import React from 'react'

const ProductListPageLoading = () => {
  return (
    <>
      {/* Skeleton loaders */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border p-4 rounded animate-pulse">
          {/* Image skeleton */}
          <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>

          {/* Title skeleton */}
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>

          {/* Description skeleton */}
          <div className="h-3 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 bg-gray-300 rounded mb-1 w-5/6"></div>
          <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>

          {/* Price skeleton */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>

          {/* Category skeleton */}
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      ))}
    </>
  )
}

export default ProductListPageLoading