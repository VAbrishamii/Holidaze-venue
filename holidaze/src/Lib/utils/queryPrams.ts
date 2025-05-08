/**
 * Helper function to build query string from object
 */
export function buildQueryParams<T extends Record<string, any>>(params?: T): string {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    return `?${searchParams.toString()}`;
  }