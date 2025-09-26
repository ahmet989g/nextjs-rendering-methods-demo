import ProductPage from '@/components/SSG_Components/Product/ProductPage'
import React from 'react'

/**
 * SSG (Static Site Generation) Product Page
 * - Build time'da pre-render edilir
 * - En hızlı loading time
 * - CDN'de cache'lenebilir
 * - Dynamic data için uygun değil
 */
const page = () => {
  return (
    <div className="container mx-auto p-4">
      <ProductPage />
    </div>
  )
}

export default page