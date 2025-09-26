"use client"
import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react'
import ProductItem from '../../Product/ProductItem';
import ProductListPageLoading from '@/components/Product/ProductListPageLoading';
import PerformanceMonitor from '@/components/Monitoring/PerformanceMonitor';

/**
 * CSR (Client-Side Rendering) ProductPage Component
 * - Client tarafında fetch yapılır
 * - SEO için uygun değil
 * - Interactive hızlı
 * - Loading state manuel kontrol
 */
const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchTime, setFetchTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const startTime = Date.now();

      try {
        setLoading(true);
        setError(null);

        // Client-side fetch
        const res = await fetch('https://fakestoreapi.com/products');

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const endTime = Date.now();

        setProducts(data);
        setFetchTime(endTime - startTime);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className='container mx-auto p-4'>
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h2 className="text-red-800 font-semibold">Hata Oluştu</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <PerformanceMonitor
        renderingType="CSR"
        dataFetchTime={fetchTime}
        totalProducts={products.length}
      />

      <h1 className='text-2xl font-bold mb-4'>Ürünler (CSR)</h1>

      <div className="bg-red-50 p-4 rounded mb-4">
        <h3 className="font-semibold">CSR Özellikleri:</h3>
        <p className="text-sm">
          Client-side rendering, JavaScript ile client'ta çalışır.
          SEO için uygun değil ancak çok interactive.
        </p>
        <p className="text-sm">
          Loading: {loading ? 'Yükleniyor...' : 'Tamamlandı'}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {loading ? (
          <ProductListPageLoading />
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