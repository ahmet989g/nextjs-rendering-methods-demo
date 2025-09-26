import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Rendering Methods Demo | Ana Sayfa',
  description: 'Next.js 15 ile CSR, SSR, SSG ve ISR rendering yöntemlerini test ve monitoring etmek amacıyla oluşturulmuştur.',
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-gray-600">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Next.js Rendering Methods Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Next.js 15 ile CSR, SSR, SSG ve ISR rendering yöntemlerini test ve monitoring etmek amacıyla oluşturulmuştur.
          </p>
          <p className="text-md text-gray-500">
            Her yöntemin avantajlarını, dezavantajlarını ve performans metriklerini karşılaştırdım.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* CSR Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🖥️</span>
              <h2 className="text-xl font-semibold">CSR</h2>
            </div>
            <p className="text-gray-600 mb-4">Client-Side Rendering</p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Client'ta JavaScript ile render</li>
              <li>• SEO için uygun değil</li>
              <li>• Interactive çok hızlı</li>
              <li>• Loading state manuel</li>
            </ul>
            <Link
              href="/csr/products"
              className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              CSR Test Et
            </Link>
          </div>

          {/* SSR Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">⚡</span>
              <h2 className="text-xl font-semibold">SSR</h2>
            </div>
            <p className="text-gray-600 mb-4">Server-Side Rendering</p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Server'da her request'te render</li>
              <li>• SEO friendly</li>
              <li>• İlk yükleme hızlı</li>
              <li>• Server yükü yüksek</li>
            </ul>
            <Link
              href="/ssr/products"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              SSR Test Et
            </Link>
          </div>

          {/* SSG Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🚀</span>
              <h2 className="text-xl font-semibold">SSG</h2>
            </div>
            <p className="text-gray-600 mb-4">Static Site Generation</p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Build time'da pre-render</li>
              <li>• En hızlı yükleme</li>
              <li>• CDN'de cache'lenebilir</li>
              <li>• Data build time'dan</li>
            </ul>
            <Link
              href="/ssg/products"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              SSG Test Et
            </Link>
          </div>

          {/* ISR Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔄</span>
              <h2 className="text-xl font-semibold">ISR</h2>
            </div>
            <p className="text-gray-600 mb-4">Incremental Static Regeneration</p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Static + periodic revalidation</li>
              <li>• En iyi performans/freshness balance</li>
              <li>• Background'da güncelleme (Eski cache silinir, yenisi oluşturulur)</li>
              <li>• E-commerce için ideal</li>
            </ul>
            <Link
              href="/isr/products"
              className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              ISR Test Et
            </Link>
          </div>

          {/* Comparison Card */}
          <div className="bg-gray-100 rounded-lg shadow-md p-6 border-l-4 border-gray-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📊</span>
              <h2 className="text-xl font-semibold">Karşılaştırma</h2>
            </div>
            <p className="text-gray-600 mb-4">Performance Metrics</p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Loading süreleri</li>
              <li>• Web Vitals</li>
              <li>• Memory kullanımı</li>
              <li>• Sunucu metrikleri</li>
            </ul>
            <div className="text-center">
              <span className="text-sm text-gray-500">Her sayfada mevcut</span>
            </div>
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">🎯 Hangi Rendering Yöntemini Kullanabileceğimize dair trickler (Duruma göre değişiklik gösterebilir.)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">✅ Doğru Tercihler</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">E-commerce (Ürün Listeleri)</h4>
                  <p className="text-sm text-gray-600">→ ISR (1-5 dakika arası revalidation)</p>
                </div>
                <div>
                  <h4 className="font-medium">Blog/Haber Siteleri</h4>
                  <p className="text-sm text-gray-600">→ SSG + ISR (saatlik revalidation)</p>
                </div>
                <div>
                  <h4 className="font-medium">Dashboard/Admin Paneli</h4>
                  <p className="text-sm text-gray-600">→ CSR (real-time data)</p>
                </div>
                <div>
                  <h4 className="font-medium">Landing Pages</h4>
                  <p className="text-sm text-gray-600">→ SSG (statik içerik)</p>
                </div>
                <div>
                  <h4 className="font-medium">Social Media</h4>
                  <p className="text-sm text-gray-600">→ SSR (kişiselleştirilmiş içerik)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">❌ Yaygın Hatalar</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">SEO önemli ama CSR kullanmak</h4>
                  <p className="text-sm text-gray-600">→ SSR veya SSG kullan</p>
                </div>
                <div>
                  <h4 className="font-medium">Static content için SSR</h4>
                  <p className="text-sm text-gray-600">→ SSG ile server yükünü azalt</p>
                </div>
                <div>
                  <h4 className="font-medium">Sık değişen data için SSG</h4>
                  <p className="text-sm text-gray-600">→ ISR veya SSR kullan</p>
                </div>
                <div>
                  <h4 className="font-medium">Tüm sayfa için SSR</h4>
                  <p className="text-sm text-gray-600">→ PPR ile hibrit yaklaşım</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Performance Optimizasyon İpuçları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Loading Optimizasyon</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Skeleton loading states kullan</li>
                <li>• Image lazy loading aktifleştir</li>
                <li>• Code splitting uygula</li>
                <li>• Bundle size'ı optimize et</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Caching Stratejisi</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• CDN cache headers ayarla</li>
                <li>• ISR revalidation sürelerini optimize et</li>
                <li>• Browser cache'i leverage et</li>
                <li>• API response cache'i kullan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}