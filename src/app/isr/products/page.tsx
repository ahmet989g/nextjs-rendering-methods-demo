import ProductPage from '@/components/ISR_Components/Product/ProductPage'
import React from 'react'

/**
 * ISR (Incremental Static Regeneration) Product Page
 * - İlk yükleme static (fast)
 * - Belirli süre sonra background'da revalidate (Eski cache silinir (Atomic swap), yeni cache oluşturulur)
 * - SSG + SSR'ın avantajlarını birleştirir
 * - E-commerce için ideal
 */
const page = () => {
  return (
    <div className="container mx-auto p-4">
      <ProductPage />
    </div>
  )
}

export default page