"use client"
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Error Boundary Component
 * - Graceful error handling
 * - Fallback UI
 * - Error reporting
 */
class ProductErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ProductErrorBoundary caught an error:', error, errorInfo)

    // Error reporting service'e gönder (Sentry, LogRocket, vs.)
    // reportError(error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      // Fallback UI varsa onu göster
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Bir Hata Oluştu
          </h2>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || 'Bilinmeyen bir hata meydana geldi'}
          </p>
          <div className="space-x-4">
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ProductErrorBoundary