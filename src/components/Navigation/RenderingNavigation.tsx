"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

/**
 * Navigation Component - Tüm Rendering Yöntemleri Arası Geçiş
 * - Her rendering tipine kolay erişim
 * - Aktif sayfa gösterimi
 * - Performance karşılaştırması için
 */

interface NavigationItem {
  href: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: '/csr/products',
    label: 'CSR',
    description: 'Client-Side Rendering',
    icon: '🖥️',
    color: 'border-red-500 bg-red-50 hover:bg-red-100'
  },
  {
    href: '/ssr/products',
    label: 'SSR',
    description: 'Server-Side Rendering',
    icon: '⚡',
    color: 'border-blue-500 bg-blue-50 hover:bg-blue-100'
  },
  {
    href: '/ssg/products',
    label: 'SSG',
    description: 'Static Site Generation',
    icon: '🚀',
    color: 'border-green-500 bg-green-50 hover:bg-green-100'
  },
  {
    href: '/isr/products',
    label: 'ISR',
    description: 'Incremental Static Regeneration',
    icon: '🔄',
    color: 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100'
  },
];

const RenderingNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white shadow-sm border-b text-gray-600">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Next.js Rendering Yöntemleri Test Sayfası</h2>
          <p className="text-gray-600 text-sm">
            Farklı rendering stratejilerini test edin ve performanslarını karşılaştırın
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href.split('/products')[0]);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  block p-4 rounded-lg border-2 transition-all duration-200 
                  ${isActive
                    ? item.color + ' border-opacity-100'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-lg">{item.label}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {item.description}
                  </div>
                  {isActive && (
                    <div className="text-xs font-medium mt-2 text-blue-600">
                      ✅ Aktif Sayfa
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Performance Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Rendering Type</th>
                <th className="px-4 py-2 text-left">Build Time</th>
                <th className="px-4 py-2 text-left">First Load</th>
                <th className="px-4 py-2 text-left">Subsequent Loads</th>
                <th className="px-4 py-2 text-left">SEO</th>
                <th className="px-4 py-2 text-left">Data Freshness</th>
                <th className="px-4 py-2 text-left">Server Load</th>
                <th className="px-4 py-2 text-left">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-medium">CSR</td>
                <td className="px-4 py-2">⚡ Hızlı</td>
                <td className="px-4 py-2">🐌 Yavaş</td>
                <td className="px-4 py-2">⚡ Hızlı</td>
                <td className="px-4 py-2">❌ Kötü</td>
                <td className="px-4 py-2">✅ Her Zaman Güncel</td>
                <td className="px-4 py-2">✅ Düşük</td>
                <td className="px-4 py-2">Dashboard, Admin</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">SSR</td>
                <td className="px-4 py-2">⚡ Hızlı</td>
                <td className="px-4 py-2">⚡ Hızlı</td>
                <td className="px-4 py-2">⚡ Hızlı</td>
                <td className="px-4 py-2">✅ Harika</td>
                <td className="px-4 py-2">✅ Her Zaman Güncel</td>
                <td className="px-4 py-2">❌ Yüksek</td>
                <td className="px-4 py-2">News, Social Media</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">SSG</td>
                <td className="px-4 py-2">🐌 Yavaş</td>
                <td className="px-4 py-2">🚀 Çok hızlı</td>
                <td className="px-4 py-2">🚀 Çok hızlı</td>
                <td className="px-4 py-2">✅ Harika</td>
                <td className="px-4 py-2">❌ Build Time</td>
                <td className="px-4 py-2">✅ Yok</td>
                <td className="px-4 py-2">Pazarlama, Docs</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">ISR</td>
                <td className="px-4 py-2">🐌 Yavaş</td>
                <td className="px-4 py-2">🚀 Hızlı</td>
                <td className="px-4 py-2">🚀 Çok Hızlı</td>
                <td className="px-4 py-2">✅ Harika</td>
                <td className="px-4 py-2">⚡ Periyodik</td>
                <td className="px-4 py-2">⚡ Orta</td>
                <td className="px-4 py-2">E-ticaret, Blog</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RenderingNavigation;