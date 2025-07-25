export function saveSelectedColumns(STORAGE_KEY: string, columns: any[]): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  }
}

/**
 * Retrieve selected column keys from localStorage.
 */
export function getSelectedColumns(STORAGE_KEY: string): any[] {
  if (typeof localStorage !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY)

    return data ? JSON.parse(data) : []
  }
  return []
}