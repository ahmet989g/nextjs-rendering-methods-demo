export class PerformanceTracker {
  private static marks: Map<string, number> = new Map();

  static mark(name: string): void {
    if (typeof performance !== 'undefined') {
      this.marks.set(name, performance.now());
    }
  }

  static measure(name: string, startMark: string): number {
    if (typeof performance !== 'undefined') {
      const startTime = this.marks.get(startMark);
      if (startTime) {
        const duration = performance.now() - startTime;
        console.log(`${name}: ${duration.toFixed(2)}ms`);
        return duration;
      }
    }
    return 0;
  }

  static getNavigationTiming(): any {
    if (typeof window !== 'undefined' && window.performance) {
      return window.performance.getEntriesByType('navigation')[0];
    }
    return null;
  }

  static getMemoryUsage(): any {
    if (typeof window !== 'undefined' && (window.performance as any).memory) {
      return (window.performance as any).memory;
    }
    return null;
  }
}