import { Product } from '@/types/product';
import React from 'react'
import ProductItem from '../../Product/ProductItem';
import PerformanceMonitor from '@/components/Monitoring/PerformanceMonitor';

/**
 * ISR ProductPage Component
 * - Cache ile hızlı serve
 * - Background'da performance optimizasyonu
 * - Fresh data + performance optimizasyonu
 */

// ISR data fetching with revalidation
async function fetchProducts(): Promise<{
  products: Product[],
  fetchTime: number,
  cacheStatus: string
}> {
  const startTime = Date.now();

  try {
    // ISR için revalidation
    const res = await fetch('https://fakestoreapi.com/products', {
      // ISR cache policy
      next: {
        revalidate: 60 // 60 saniye cache, sonra background revalidate
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();
    const fetchTime = Date.now() - startTime;

    // Cache status simülasyonu (gerçek implementasyonda headers'dan alınır)
    const cacheStatus = Math.random() > 0.5 ? 'hit' : 'miss';

    return { products, fetchTime, cacheStatus };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], fetchTime: 0, cacheStatus: 'error' };
  }
}

const ProductPage = async () => {
  const { products, fetchTime, cacheStatus } = await fetchProducts();
  const requestTime = new Date().toISOString();

  return (
    <div className='container mx-auto p-4'>
      <PerformanceMonitor
        renderingType="ISR"
        dataFetchTime={fetchTime}
        totalProducts={products.length}
        requestTime={requestTime}
        revalidateTime={60}
      />

      <h1 className='text-2xl font-bold mb-4'>Ürünler (ISR)</h1>
      <div className="bg-blue-50 p-4 rounded mb-4">
        <h3 className="font-semibold">ISR Bilgileri:</h3>
        <p className="text-sm">Cache Status: {cacheStatus}</p>
        <p className="text-sm">Request Time: {requestTime}</p>
        <p className="text-sm">Revalidate Interval: 60 saniye</p>
        <p className="text-sm">
          Bu sayfa cache&apos;den serve ediliyor, 60 saniye sonra background&apos;da güncelleniyor
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p>Ürünler yüklenemedi.</p>
          </div>
        ) : (
          products.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default ProductPage