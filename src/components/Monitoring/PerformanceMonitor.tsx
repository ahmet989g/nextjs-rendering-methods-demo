"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface PerformanceMonitorProps {
  renderingType: 'CSR' | 'SSR' | 'SSG' | 'ISR' | 'PPR';
  dataFetchTime?: number;
  totalProducts: number;
  buildTime?: string;
  requestTime?: string;
  revalidateTime?: number;
  shellLoadTime?: number;
  streamTime?: string;
  isStatic?: boolean;
  isStreaming?: boolean;
}

interface WebVitalsMetrics {
  ttfb: number | null;
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  pageLoadTime: number | null;
  routeChangeTime: number | null;
  memoryUsage: {
    used: number;
    total: number;
    limit: number;
  } | null;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  renderingType,
  dataFetchTime = 0,
  totalProducts,
  buildTime,
  requestTime,
  revalidateTime,
  shellLoadTime,
  streamTime,
  isStatic = false,
  isStreaming = false
}) => {
  const pathname = usePathname()
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    ttfb: null,
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    pageLoadTime: null,
    routeChangeTime: null,
    memoryUsage: null
  })
  const [routeChangeStart, setRouteChangeStart] = useState<number>(0)
  const [showDetails, setShowDetails] = useState<boolean>(false)

  // Route change timing
  useEffect(() => {
    setRouteChangeStart(Date.now())
  }, [pathname])

  // Web Vitals ile gerçek metrics toplama
  useEffect(() => {
    // Google'ın resmi Web Vitals library'si
    onTTFB((metric) => {
      setMetrics(prev => ({ ...prev, ttfb: metric.value - metric.entries[0].requestStart }))
    })

    onFCP((metric) => {
      setMetrics(prev => ({ ...prev, fcp: Math.round(metric.value) }))
    })

    onLCP((metric) => {
      setMetrics(prev => ({ ...prev, lcp: Math.round(metric.value) }))
    })

    onCLS((metric) => {
      setMetrics(prev => ({ ...prev, cls: Math.round(metric.value * 1000) / 1000 }))
    })

    onINP((metric) => {
      setMetrics(prev => ({ ...prev, fid: Math.round(metric.value) }))
    })

    // Additional metrics
    const collectAdditionalMetrics = () => {
      try {
        // Page Load Time from Navigation API
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const realPageLoad = navigation && navigation.loadEventEnd > 0
          ? navigation.loadEventEnd - navigation.navigationStart
          : null

        // Route Change Time
        const realRouteChangeTime = routeChangeStart > 0 ? Date.now() - routeChangeStart : null

        // Memory Usage
        const realMemory = 'memory' in performance ? {
          used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)
        } : null

        setMetrics(prev => ({
          ...prev,
          pageLoadTime: realPageLoad,
          routeChangeTime: realRouteChangeTime,
          memoryUsage: realMemory
        }))

      } catch (error) {
        console.error('Error collecting additional metrics:', error)
      }
    }

    const timer = setTimeout(collectAdditionalMetrics, 100)
    return () => clearTimeout(timer)
  }, [pathname, routeChangeStart])

  const getRenderingColor = (type: string) => {
    const colors = {
      CSR: 'bg-red-50 border-red-200',
      SSR: 'bg-blue-50 border-blue-200',
      SSG: 'bg-green-50 border-green-200',
      ISR: 'bg-yellow-50 border-yellow-200',
      PPR: 'bg-purple-50 border-purple-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-50 border-gray-200'
  }

  const getPerformanceRating = (metric: string, value: number | null) => {
    if (value === null) return 'text-gray-400'

    // Google'ın Core Web Vitals thresholds
    const thresholds = {
      ttfb: [800, 1800],           // Good: <800ms, Poor: >1800ms
      fcp: [1800, 3000],           // Good: <1.8s, Poor: >3.0s  
      lcp: [2500, 4000],           // Good: <2.5s, Poor: >4.0s (Core Web Vital)
      cls: [0.1, 0.25],            // Good: <0.1, Poor: >0.25 (Core Web Vital)
      fid: [100, 300],             // Good: <100ms, Poor: >300ms (Core Web Vital)
      pageLoadTime: [3000, 5000]   // Custom threshold
    }

    const threshold = thresholds[metric as keyof typeof thresholds] || [1000, 3000]

    if (value <= threshold[0]) return 'text-green-600'  // Good
    if (value <= threshold[1]) return 'text-yellow-600' // Needs Improvement  
    return 'text-red-600'                               // Poor
  }

  const formatValue = (value: number | null, metric?: string) => {
    if (value === null) return '-'
    if (metric === 'cls') return value.toFixed(3)
    return `${Math.round(value)}ms`
  }

  const webVitalsInfo = {
    ttfb: {
      name: "Time to First Byte",
      description: "Server response süresi - backend performansı",
      coreVital: false
    },
    fcp: {
      name: "First Contentful Paint",
      description: "İlk görsel içeriğin render süresi",
      coreVital: false
    },
    lcp: {
      name: "Largest Contentful Paint",
      description: "En büyük elementin yükleme süresi",
      coreVital: true
    },
    cls: {
      name: "Cumulative Layout Shift",
      description: "Layout'un beklenmedik kayma puanı",
      coreVital: true
    },
    fid: {
      name: "First Input Delay",
      description: "İlk user interaction response süresi",
      coreVital: true
    }
  }

  return (
    <div className={`border rounded-lg p-4 mb-6 ${getRenderingColor(renderingType)}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          📊 Performance Monitor - {renderingType}
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            web-vitals library
          </span>
        </h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm px-3 py-1 bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          {showDetails ? 'Gizle' : 'Core Web Vitals'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {/* Basic Info */}
        <div className="space-y-2">
          <h3 className="font-medium">📈 Temel Bilgiler</h3>
          <p>Rendering Type: <span className="font-mono">{renderingType}</span></p>
          <p>Total Products: <span className="font-mono">{totalProducts}</span></p>
          <p>Data Fetch: <span className="font-mono">{dataFetchTime}ms</span></p>
          {metrics.pageLoadTime && (
            <p>Page Load: <span className="font-mono">{formatValue(metrics.pageLoadTime)}</span></p>
          )}
          {metrics.routeChangeTime && (
            <p>Route Change: <span className="font-mono text-blue-600">{formatValue(metrics.routeChangeTime)}</span></p>
          )}
          <p className="text-xs text-gray-500">Route: {pathname}</p>
        </div>

        {/* Web Vitals from Google's library */}
        <div className="space-y-2">
          <h3 className="font-medium">⚡ Web Vitals (Google API)</h3>
          <p>
            TTFB: <span className={`font-mono ${getPerformanceRating('ttfb', metrics.ttfb)}`}>
              {formatValue(metrics.ttfb)}
            </span>
          </p>
          <p>
            FCP: <span className={`font-mono ${getPerformanceRating('fcp', metrics.fcp)}`}>
              {formatValue(metrics.fcp)}
            </span>
          </p>
          <p>
            LCP: <span className={`font-mono ${getPerformanceRating('lcp', metrics.lcp)}`}>
              {formatValue(metrics.lcp)}
            </span>
            <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">Core</span>
          </p>
          <p>
            CLS: <span className={`font-mono ${getPerformanceRating('cls', metrics.cls)}`}>
              {formatValue(metrics.cls, 'cls')}
            </span>
            <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">Core</span>
          </p>
          <p>
            FID: <span className={`font-mono ${getPerformanceRating('fid', metrics.fid)}`}>
              {formatValue(metrics.fid)}
            </span>
            <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">Core</span>
          </p>
        </div>

        {/* Rendering Specific */}
        <div className="space-y-2">
          <h3 className="font-medium">🔧 Rendering Özellikleri</h3>

          {renderingType === 'SSG' && buildTime && (
            <p>Build Time: <span className="font-mono text-xs">{buildTime}</span></p>
          )}

          {renderingType === 'ISR' && revalidateTime && (
            <p>Revalidate: <span className="font-mono">{revalidateTime}s</span></p>
          )}

          {renderingType === 'PPR' && (
            <>
              {shellLoadTime && <p>Shell Load: <span className="font-mono">{shellLoadTime}ms</span></p>}
              <p>Streaming: <span className="font-mono">{isStreaming ? '✅' : '❌'}</span></p>
            </>
          )}

          <p>SEO Friendly: <span className="font-mono">
            {renderingType === 'CSR' ? '❌' : '✅'}
          </span></p>

          <p>Strategy: <span className="font-mono text-xs">
            {renderingType === 'SSG' ? 'Static Build' :
              renderingType === 'ISR' ? 'Cache + Revalidate' :
                renderingType === 'PPR' ? 'Hybrid Streaming' :
                  renderingType === 'CSR' ? 'Client Render' : 'Server Render'}
          </span></p>
        </div>
      </div>

      {/* Memory Usage */}
      {metrics.memoryUsage && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium mb-2">💾 Memory Usage</h3>
          <div className="flex gap-4 text-sm">
            <span>Used: <span className="font-mono">{metrics.memoryUsage.used}MB</span></span>
            <span>Total: <span className="font-mono">{metrics.memoryUsage.total}MB</span></span>
            <span>Limit: <span className="font-mono">{metrics.memoryUsage.limit}MB</span></span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((metrics.memoryUsage.used / metrics.memoryUsage.total) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Core Web Vitals Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium mb-3">🎯 Core Web Vitals Açıklamaları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(webVitalsInfo).map(([key, info]) => (
              <div key={key} className={`p-3 rounded border ${info.coreVital ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                }`}>
                <h4 className="font-semibold text-sm mb-1 flex items-center">
                  {info.name}
                  {info.coreVital && (
                    <span className="ml-2 text-xs bg-red-600 text-white px-1 rounded">CORE</span>
                  )}
                </h4>
                <p className="text-xs text-gray-600 mb-2">{info.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-green-600">
                    İyi: {key === 'cls' ? '< 0.1' : key === 'ttfb' ? '< 800ms' : key === 'fcp' ? '< 1.8s' : key === 'lcp' ? '< 2.5s' : '< 100ms'}
                  </span>
                  <span className="text-red-600">
                    Kötü: {key === 'cls' ? '> 0.25' : key === 'ttfb' ? '> 1.8s' : key === 'fcp' ? '> 3.0s' : key === 'lcp' ? '> 4.0s' : '> 300ms'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 bg-blue-50 rounded text-xs">
            <strong>📚 Not:</strong> Bu metrikler Google'ın resmi <code>web-vitals</code> kütüphanesi ile toplanmaktadır.
            Core Web Vitals Google Search ranking faktörleridir.
          </div>
        </div>
      )}

      {/* Performance Score */}
      <div className="mt-4 pt-4 border-t">
        <h3 className="font-medium mb-2">🏆 Performance Skor</h3>
        <div className="flex gap-2 text-sm">
          {[
            { metric: 'LCP', value: metrics.lcp, threshold: [2500, 4000] },
            { metric: 'CLS', value: metrics.cls, threshold: [0.1, 0.25] },
            { metric: 'FID', value: metrics.fid, threshold: [100, 300] }
          ].map(({ metric, value, threshold }) => (
            <div key={metric} className={`px-3 py-2 rounded text-center ${value === null ? 'bg-gray-100 text-gray-500' :
              value <= threshold[0] ? 'bg-green-100 text-green-800' :
                value <= threshold[1] ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
              }`}>
              <div className="font-semibold">{metric}</div>
              <div className="text-xs">
                {value === null ? 'Pending' :
                  value <= threshold[0] ? 'Good' :
                    value <= threshold[1] ? 'OK' : 'Poor'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;