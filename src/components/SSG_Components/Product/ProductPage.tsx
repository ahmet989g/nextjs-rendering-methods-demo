import { Product } from '@/types/product';
import React from 'react'
import ProductItem from '../../Product/ProductItem';
import PerformanceMonitor from '@/components/Monitoring/PerformanceMonitor';

/**
 * SSG ProductPage Component
 * - Build time'da data fetch edilir
 * - Static HTML olarak serve edilir
 * - Çok hızlı yükleme
 */

// Build-time data fetching
async function fetchProducts(): Promise<{ products: Product[], buildTime: number }> {
  const startTime = Date.now();

  try {
    // Build time'da çalışır, her build'de fresh data
    const res = await fetch('https://fakestoreapi.com/products', {
      cache: 'force-cache', // Build time cache
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();
    const buildTime = Date.now() - startTime;

    return { products, buildTime };
  } catch (error) {
    console.error('Error fetching products at build time:', error);
    return { products: [], buildTime: 0 };
  }
}

const ProductPage = async () => {
  const { products, buildTime } = await fetchProducts();
  const buildDate = new Date().toISOString();

  return (
    <div className='container mx-auto p-4'>
      <PerformanceMonitor
        renderingType="SSG"
        dataFetchTime={buildTime}
        totalProducts={products.length}
        buildTime={buildDate}
        isStatic={true}
      />

      <h1 className='text-2xl font-bold mb-4'>Ürünler (SSG)</h1>
      <p className="text-sm text-gray-500 mb-4">
        Bu sayfa build time&apos;da oluşturuldu: {buildDate}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p>Ürünler build time&apos;da yüklenemedi.</p>
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