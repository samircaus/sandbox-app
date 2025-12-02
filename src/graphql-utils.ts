// Advanced GraphQL filtering and query utilities

export interface FilterExpression {
  value?: any
  values?: any[]
  _operator?: 'EQUALS' | 'EQUALS_NOT' | 'CONTAINS' | 'STARTS_WITH' | 'GREATER_EQUAL' | 'LOWER' | 'GREATER' | 'LOWER_EQUAL'
  _ignoreCase?: boolean
  _apply?: 'AT_LEAST_ONCE' | 'ALL' | 'NONE'
}

export interface Filter {
  _expressions?: FilterExpression[]
  _logOp?: 'AND' | 'OR'
  _match?: any
}

// Apply a single filter expression to a value
export function applyFilterExpression(value: any, expr: FilterExpression): boolean {
  const operator = expr._operator || 'EQUALS'
  const ignoreCase = expr._ignoreCase || false
  
  // Handle array values with exact match
  if (expr.values) {
    if (Array.isArray(value)) {
      return JSON.stringify(value.sort()) === JSON.stringify(expr.values.sort())
    }
    return false
  }
  
  let targetValue = expr.value
  let compareValue = value
  
  // Apply case insensitivity
  if (ignoreCase && typeof value === 'string' && typeof targetValue === 'string') {
    compareValue = value.toLowerCase()
    targetValue = targetValue.toLowerCase()
  }
  
  switch (operator) {
    case 'EQUALS':
      return compareValue === targetValue
    case 'EQUALS_NOT':
      return compareValue !== targetValue
    case 'CONTAINS':
      if (typeof compareValue === 'string' && typeof targetValue === 'string') {
        return compareValue.includes(targetValue)
      }
      if (Array.isArray(value)) {
        return value.includes(targetValue)
      }
      return false
    case 'STARTS_WITH':
      if (typeof compareValue === 'string' && typeof targetValue === 'string') {
        return compareValue.startsWith(targetValue)
      }
      return false
    case 'GREATER_EQUAL':
      return compareValue >= targetValue
    case 'LOWER':
      return compareValue < targetValue
    case 'GREATER':
      return compareValue > targetValue
    case 'LOWER_EQUAL':
      return compareValue <= targetValue
    default:
      return compareValue === targetValue
  }
}

// Apply field filter to an item
export function applyFieldFilter(item: any, fieldName: string, filter: Filter): boolean {
  const expressions = filter._expressions || []
  const logOp = filter._logOp || 'AND'
  
  const value = item[fieldName]
  
  // Handle array fields with _apply modifiers
  if (Array.isArray(value) && expressions.length > 0) {
    const expr = expressions[0]
    const apply = expr._apply || 'AT_LEAST_ONCE'
    
    // For exact array match (values provided)
    if (expr.values) {
      return applyFilterExpression(value, expr)
    }
    
    // For array element matching
    if (expr.value !== undefined) {
      const matchingElements = value.filter(v => applyFilterExpression(v, expr))
      
      switch (apply) {
        case 'AT_LEAST_ONCE':
          return matchingElements.length > 0
        case 'ALL':
          return matchingElements.length === value.length
        case 'NONE':
          return matchingElements.length === 0
        default:
          return matchingElements.length > 0
      }
    }
  }
  
  // Handle nested object matching (_match)
  if (filter._match && typeof value === 'object') {
    return applyFilters([value], filter._match).length > 0
  }
  
  // Apply expressions with logical operators
  const results = expressions.map(expr => applyFilterExpression(value, expr))
  
  if (logOp === 'OR') {
    return results.some(r => r)
  } else {
    return results.every(r => r)
  }
}

// Apply multiple filters to a list
export function applyFilters(items: any[], filters: any): any[] {
  if (!filters || Object.keys(filters).length === 0) {
    return items
  }
  
  return items.filter(item => {
    // Check each filter field
    for (const fieldName in filters) {
      if (fieldName.startsWith('_')) continue // Skip meta fields
      
      const filter = filters[fieldName]
      
      // Handle nested object filters
      if (filter._match) {
        const fieldValue = item[fieldName]
        
        if (Array.isArray(fieldValue)) {
          // For array of objects (like employees)
          const apply = filter._apply || 'AT_LEAST_ONCE'
          const matchingItems = fieldValue.filter((subItem: any) => 
            applyFilters([subItem], filter._match).length > 0
          )
          
          if (apply === 'ALL' && matchingItems.length !== fieldValue.length) {
            return false
          } else if (apply === 'AT_LEAST_ONCE' && matchingItems.length === 0) {
            return false
          }
        } else if (typeof fieldValue === 'object') {
          // For single nested object
          if (applyFilters([fieldValue], filter._match).length === 0) {
            return false
          }
        }
        continue
      }
      
      // Apply regular field filter
      if (!applyFieldFilter(item, fieldName, filter)) {
        return false
      }
    }
    
    return true
  })
}

// Apply pagination (offset/limit)
export function applyPagination(items: any[], offset?: number, limit?: number): any[] {
  let result = items
  
  if (offset !== undefined && offset > 0) {
    result = result.slice(offset)
  }
  
  if (limit !== undefined && limit > 0) {
    result = result.slice(0, limit)
  }
  
  return result
}

// Apply cursor-based pagination
export function applyCursorPagination(items: any[], first?: number, after?: string): any {
  let startIndex = 0
  
  // Find the starting position based on cursor
  if (after) {
    startIndex = items.findIndex(item => btoa(JSON.stringify(item)) === after) + 1
  }
  
  const pageSize = first || items.length
  const pageItems = items.slice(startIndex, startIndex + pageSize)
  
  const edges = pageItems.map(item => ({
    cursor: btoa(JSON.stringify(item)),
    node: item
  }))
  
  const hasNextPage = startIndex + pageSize < items.length
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null
  
  return {
    edges,
    pageInfo: {
      endCursor,
      hasNextPage
    }
  }
}

// Generate base64-encoded cursor from item
export function generateCursor(item: any): string {
  return btoa(JSON.stringify(item._path || item.id || JSON.stringify(item)))
}

// Parse GraphQL filter arguments from query string
export function parseFilterFromQuery(queryStr: string, queryName: string): any {
  // This is a simplified parser - in production you'd use a proper GraphQL parser
  const filterMatch = queryStr.match(new RegExp(`${queryName}\\s*\\([^)]*filter:\\s*({[^}]+})`, 's'))
  if (filterMatch) {
    try {
      // This is a very basic parser - real implementation would need a proper GraphQL parser
      return {}
    } catch (e) {
      return {}
    }
  }
  return {}
}

