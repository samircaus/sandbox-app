# Batch Mode

## Usage

Add `X-GraphQL-Batch-Mode: true` as a request header to automatically prefix each root-level query field with `_0_`, `_1_`, `_2_`, etc.

### Example

```bash
curl -X POST http://localhost:9000/graphql \
  -H "Content-Type: application/json" \
  -H "X-GraphQL-Batch-Mode: true" \
  -d '{
    "query": "{ cityList { items { name } } personList { items { firstName } } }"
  }'
```

**Response:**
```json
{
  "data": {
    "_0_cityList": { "items": [...] },
    "_1_personList": { "items": [...] }
  }
}
```

### In GraphQL Playground

1. Open http://localhost:9000/graphql-playground
2. Navigate to "Batch Queries" category
3. Select a query
4. Click "+ Add Header" in the Request Headers section
5. Add: `X-GraphQL-Batch-Mode` = `true`
6. Execute query

### Benefits

- Compatible with AEM GraphQL batch format
- Easier to merge multiple query responses
- Automatic field indexing
- Works with GET and POST requests
