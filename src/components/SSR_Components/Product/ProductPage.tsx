import { Product } from '@/types/product';
import React from 'react'
import ProductItem from '../../Product/ProductItem';
import PerformanceMonitor from '@/components/Monitoring/PerformanceMonitor';

/**
 * SSR ProductPage Component
 * - Server'da fetch yapılır
 * - Client hydration sonrası interactive olur
 * - Loading state server tarafında handle edilir
 */

// Server-side data fetching function
async function fetchProducts(): Promise<Product[]> {
  try {
    // Server-side fetch - cache politikaları burada önemli
    const res = await fetch('https://fakestoreapi.com/products', {
      // SSR için cache stratejisi
      cache: 'no-store', // Her request'te fresh data
      // cache: 'force-cache', // Build time'da cache'le
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

const ProductPage = async () => {
  const startTime = Date.now();

  // Server-side data fetching
  const products = await fetchProducts();

  const fetchTime = Date.now() - startTime;

  return (
    <div className='container mx-auto p-4'>
      <PerformanceMonitor
        renderingType="SSR"
        dataFetchTime={fetchTime}
        totalProducts={products.length}
      />

      <h1 className='text-2xl font-bold mb-4'>Ürünler (SSR)</h1>
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