import ProductPage from '@/components/SSR_Components/Product/ProductPage'
import React from 'react'

/**
 * SSR (Server-Side Rendering) Product Page
 * - Her request'te server'da render edilir
 * - SEO friendly
 * - İlk yükleme hızlı (HTML hazır)
 * - Server yükü yüksek
 */
const page = () => {
  return (
    <div className="container mx-auto p-4">
      <ProductPage />
    </div>
  )
}

export default page