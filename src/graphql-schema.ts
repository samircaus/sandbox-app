// Comprehensive GraphQL Schema for Introspection (Fully Compliant)
export const graphqlSchema = {
  __schema: {
    queryType: { name: 'Query' },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'Query',
        description: 'The root query type',
        fields: [
          { name: 'hello', description: 'Returns a greeting message', args: [], type: { kind: 'SCALAR', name: 'String' }, isDeprecated: false, deprecationReason: null },
          { name: 'user', description: 'Get a single user by ID', args: [{ name: 'id', description: 'User ID', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'User' }, isDeprecated: false, deprecationReason: null },
          { name: 'users', description: 'Get all users', args: [], type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'User' } }, isDeprecated: false, deprecationReason: null },
          { name: 'products', description: 'Get all products', args: [{ name: 'category', description: 'Filter by category', type: { kind: 'SCALAR', name: 'String' }, defaultValue: null }], type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Product' } }, isDeprecated: false, deprecationReason: null },
          { name: 'getProductById', description: 'Get product by ID', args: [{ name: 'id', description: 'Product ID', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'Product' }, isDeprecated: false, deprecationReason: null },
          { name: 'categories', description: 'Get all categories', args: [], type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Category' } }, isDeprecated: false, deprecationReason: null },
          { name: 'getCategoryById', description: 'Get category by ID', args: [{ name: 'id', description: 'Category ID', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'Category' }, isDeprecated: false, deprecationReason: null },
          { name: 'cityList', description: 'Get list of cities with filtering and pagination', args: [{ name: 'filter', description: 'Filter criteria', type: { kind: 'INPUT_OBJECT', name: 'FilterInput' }, defaultValue: null }, { name: 'offset', description: 'Pagination offset', type: { kind: 'SCALAR', name: 'Int' }, defaultValue: null }, { name: 'limit', description: 'Pagination limit', type: { kind: 'SCALAR', name: 'Int' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'CityResults' }, isDeprecated: false, deprecationReason: null },
          { name: 'cityByPath', description: 'Get city by path', args: [{ name: '_path', description: 'Content fragment path', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'CityItem' }, isDeprecated: false, deprecationReason: null },
          { name: 'personList', description: 'Get list of persons', args: [{ name: 'filter', description: 'Filter criteria', type: { kind: 'INPUT_OBJECT', name: 'FilterInput' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'PersonResults' }, isDeprecated: false, deprecationReason: null },
          { name: 'personByPath', description: 'Get person by path', args: [{ name: '_path', description: 'Content fragment path', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'PersonItem' }, isDeprecated: false, deprecationReason: null },
          { name: 'companyList', description: 'Get list of companies', args: [{ name: 'filter', description: 'Filter criteria', type: { kind: 'INPUT_OBJECT', name: 'FilterInput' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'CompanyResults' }, isDeprecated: false, deprecationReason: null },
          { name: 'awardList', description: 'Get list of awards', args: [{ name: 'filter', description: 'Filter criteria', type: { kind: 'INPUT_OBJECT', name: 'FilterInput' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'AwardResults' }, isDeprecated: false, deprecationReason: null },
          { name: 'adventureList', description: 'Get list of adventures', args: [{ name: 'filter', description: 'Filter criteria', type: { kind: 'INPUT_OBJECT', name: 'FilterInput' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'AdventureResults' }, isDeprecated: false, deprecationReason: null },
          { name: 'adventureByPath', description: 'Get adventure by path', args: [{ name: '_path', description: 'Content fragment path', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null }], type: { kind: 'OBJECT', name: 'AdventureItem' }, isDeprecated: false, deprecationReason: null },
          { name: 'adventurePaginated', description: 'Get paginated adventures', args: [{ name: 'first', description: 'Number of items', type: { kind: 'SCALAR', name: 'Int' }, defaultValue: null }, { name: 'after', description: 'Cursor', type: { kind: 'SCALAR', name: 'String' }, defaultValue: null }], type: { kind: 'OBJECT', name: 'AdventurePaginated' }, isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'City',
        description: 'A city content fragment',
        fields: [
          { name: '_path', description: 'Repository path', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'City name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'country', description: 'Country', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'population', description: 'Population', type: { kind: 'SCALAR', name: 'Int' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'categories', description: 'Categories', type: { kind: 'LIST', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: '_tags', description: 'Tags', type: { kind: 'LIST', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'CityResults',
        description: 'City query results',
        fields: [
          { name: 'items', description: 'List of cities', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'City' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'CityItem',
        description: 'Single city result',
        fields: [
          { name: 'item', description: 'The city', type: { kind: 'OBJECT', name: 'City' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Person',
        description: 'A person content fragment',
        fields: [
          { name: '_path', description: 'Repository path', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'Last name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'firstName', description: 'First name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'awards', description: 'Awards received', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Award' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'PersonResults',
        description: 'Person query results',
        fields: [
          { name: 'items', description: 'List of persons', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Person' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'PersonItem',
        description: 'Single person result',
        fields: [
          { name: 'item', description: 'The person', type: { kind: 'OBJECT', name: 'Person' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Company',
        description: 'A company content fragment',
        fields: [
          { name: '_path', description: 'Repository path', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'Company name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'ceo', description: 'CEO', type: { kind: 'OBJECT', name: 'Person' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'employees', description: 'Employees', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Person' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'CompanyResults',
        description: 'Company query results',
        fields: [
          { name: 'items', description: 'List of companies', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Company' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Award',
        description: 'An award',
        fields: [
          { name: 'id', description: 'Award ID', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'title', description: 'Award title', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: '_path', description: 'Repository path', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: '_metadata', description: 'Metadata', type: { kind: 'OBJECT', name: 'Metadata' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'AwardResults',
        description: 'Award query results',
        fields: [
          { name: 'items', description: 'List of awards', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Award' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Metadata',
        description: 'Metadata for content fragments',
        fields: [
          { name: 'stringMetadata', description: 'String metadata', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'MetadataItem' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'MetadataItem',
        description: 'A metadata key-value pair',
        fields: [
          { name: 'name', description: 'Metadata key', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'value', description: 'Metadata value', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Adventure',
        description: 'An adventure content fragment',
        fields: [
          { name: '_path', description: 'Repository path', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'title', description: 'Adventure title', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'adventureType', description: 'Type of adventure', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'price', description: 'Price', type: { kind: 'SCALAR', name: 'Float' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'AdventureResults',
        description: 'Adventure query results',
        fields: [
          { name: 'items', description: 'List of adventures', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Adventure' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'AdventureItem',
        description: 'Single adventure result',
        fields: [
          { name: 'item', description: 'The adventure', type: { kind: 'OBJECT', name: 'Adventure' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'AdventurePaginated',
        description: 'Paginated adventure results',
        fields: [
          { name: 'edges', description: 'Edges', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'AdventureEdge' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'pageInfo', description: 'Pagination info', type: { kind: 'OBJECT', name: 'PageInfo' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'AdventureEdge',
        description: 'Adventure edge for pagination',
        fields: [
          { name: 'cursor', description: 'Cursor', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'node', description: 'Node', type: { kind: 'OBJECT', name: 'Adventure' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'PageInfo',
        description: 'Pagination information',
        fields: [
          { name: 'endCursor', description: 'End cursor', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'hasNextPage', description: 'Has next page', type: { kind: 'SCALAR', name: 'Boolean' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'User',
        description: 'A user object',
        fields: [
          { name: 'id', description: 'User ID', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'User name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'email', description: 'User email', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'role', description: 'User role', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Product',
        description: 'A product object matching OpenAPI schema with Mesh federation support',
        fields: [
          { name: 'id', description: 'Unique product identifier', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'Product name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Product description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'categoryId', description: 'Category ID for federation/joins', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'category', description: 'Product category name (Electronics, Wearables, Accessories)', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'text', description: 'Template text with {{placeholders}} for category data', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'price', description: 'Product price', type: { kind: 'SCALAR', name: 'Float' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'currency', description: 'Currency code', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'inStock', description: 'Whether product is in stock', type: { kind: 'SCALAR', name: 'Boolean' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'quantity', description: 'Available quantity', type: { kind: 'SCALAR', name: 'Int' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'imageUrl', description: 'Product image URL', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'rating', description: 'Product rating (3.0-5.0)', type: { kind: 'SCALAR', name: 'Float' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'reviews', description: 'Number of reviews', type: { kind: 'SCALAR', name: 'Int' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'specifications', description: 'Product specifications', type: { kind: 'OBJECT', name: 'ProductSpecifications' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'tags', description: 'Product tags', type: { kind: 'LIST', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'Category',
        description: 'A category object for product categorization',
        fields: [
          { name: 'id', description: 'Unique category identifier', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'Category name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Category description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'slug', description: 'URL-friendly slug', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'imageUrl', description: 'Category image URL', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'parentId', description: 'Parent category ID for nested categories', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: 'ProductSpecifications',
        description: 'Product specifications object',
        fields: [
          { name: 'weight', description: 'Product weight', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'dimensions', description: 'Product dimensions', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'color', description: 'Product color', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'brand', description: 'Product brand', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'String',
        description: 'The `String` scalar type represents textual data',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'Int',
        description: 'The `Int` scalar type represents non-fractional signed whole numeric values',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'Float',
        description: 'The `Float` scalar type represents signed double-precision fractional values',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'SCALAR',
        name: 'Boolean',
        description: 'The `Boolean` scalar type represents `true` or `false`',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'ENUM',
        name: 'FilterOperator',
        description: 'Filter operators for string and numeric comparisons',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: [
          { name: 'EQUALS', description: 'Equals comparison', isDeprecated: false, deprecationReason: null },
          { name: 'EQUALS_NOT', description: 'Not equals comparison', isDeprecated: false, deprecationReason: null },
          { name: 'CONTAINS', description: 'Contains comparison', isDeprecated: false, deprecationReason: null },
          { name: 'CONTAINS_NOT', description: 'Does not contain comparison', isDeprecated: false, deprecationReason: null },
          { name: 'STARTS_WITH', description: 'Starts with comparison', isDeprecated: false, deprecationReason: null },
          { name: 'ENDS_WITH', description: 'Ends with comparison', isDeprecated: false, deprecationReason: null },
          { name: 'GREATER', description: 'Greater than comparison', isDeprecated: false, deprecationReason: null },
          { name: 'GREATER_EQUAL', description: 'Greater than or equal comparison', isDeprecated: false, deprecationReason: null },
          { name: 'LOWER', description: 'Lower than comparison', isDeprecated: false, deprecationReason: null },
          { name: 'LOWER_EQUAL', description: 'Lower than or equal comparison', isDeprecated: false, deprecationReason: null },
          { name: 'AT', description: 'At comparison', isDeprecated: false, deprecationReason: null },
          { name: 'NOT_AT', description: 'Not at comparison', isDeprecated: false, deprecationReason: null }
        ],
        inputFields: null
      },
      {
        kind: 'INPUT_OBJECT',
        name: 'FilterExpressionInput',
        description: 'Expression for a single filter condition',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: [
          { name: 'value', description: 'The value to compare against', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, defaultValue: null },
          { name: '_operator', description: 'The comparison operator', type: { kind: 'ENUM', name: 'FilterOperator' }, defaultValue: null }
        ]
      },
      {
        kind: 'INPUT_OBJECT',
        name: 'StringFilterInput',
        description: 'Filter input for string fields',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: [
          { name: '_expressions', description: 'List of filter expressions', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'INPUT_OBJECT', name: 'FilterExpressionInput' } } }, defaultValue: null },
          { name: '_logOp', description: 'Logical operator to combine expressions (AND/OR)', type: { kind: 'SCALAR', name: 'String' }, defaultValue: null }
        ]
      },
      {
        kind: 'INPUT_OBJECT',
        name: 'IntFilterInput',
        description: 'Filter input for integer fields',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: [
          { name: '_expressions', description: 'List of filter expressions', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'INPUT_OBJECT', name: 'FilterExpressionInput' } } }, defaultValue: null },
          { name: '_logOp', description: 'Logical operator to combine expressions (AND/OR)', type: { kind: 'SCALAR', name: 'String' }, defaultValue: null }
        ]
      },
      {
        kind: 'INPUT_OBJECT',
        name: 'FilterInput',
        description: 'Filter input with field-specific filters',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: null,
        inputFields: [
          { name: 'name', description: 'Filter on name field', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'firstName', description: 'Filter on firstName field', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'title', description: 'Filter on title field', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'description', description: 'Filter on description field', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'country', description: 'Filter on country field', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'adventureType', description: 'Filter on adventure type', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null },
          { name: 'population', description: 'Filter on population', type: { kind: 'INPUT_OBJECT', name: 'IntFilterInput' }, defaultValue: null },
          { name: 'price', description: 'Filter on price', type: { kind: 'INPUT_OBJECT', name: 'IntFilterInput' }, defaultValue: null },
          { name: '_path', description: 'Filter on path', type: { kind: 'INPUT_OBJECT', name: 'StringFilterInput' }, defaultValue: null }
        ]
      },
      {
        kind: 'OBJECT',
        name: '__Schema',
        description: 'A GraphQL Introspection defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, the entry points for query, mutation, and subscription operations.',
        fields: [
          { name: 'types', description: 'All types', type: { kind: 'NON_NULL', ofType: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'queryType', description: 'Query root type', type: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'mutationType', description: 'Mutation root type', type: { kind: 'OBJECT', name: '__Type' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'subscriptionType', description: 'Subscription root type', type: { kind: 'OBJECT', name: '__Type' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'directives', description: 'Directives', type: { kind: 'NON_NULL', ofType: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Directive' } } } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: '__Type',
        description: 'GraphQL type information',
        fields: [
          { name: 'kind', description: 'Type kind', type: { kind: 'NON_NULL', ofType: { kind: 'ENUM', name: '__TypeKind' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'name', description: 'Type name', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Type description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'fields', description: 'Fields', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Field' } } }, args: [{ name: 'includeDeprecated', description: 'Include deprecated', type: { kind: 'SCALAR', name: 'Boolean' }, defaultValue: 'false' }], isDeprecated: false, deprecationReason: null },
          { name: 'interfaces', description: 'Interfaces', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'possibleTypes', description: 'Possible types', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'enumValues', description: 'Enum values', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__EnumValue' } } }, args: [{ name: 'includeDeprecated', description: 'Include deprecated', type: { kind: 'SCALAR', name: 'Boolean' }, defaultValue: 'false' }], isDeprecated: false, deprecationReason: null },
          { name: 'inputFields', description: 'Input fields', type: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__InputValue' } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'ofType', description: 'Of type', type: { kind: 'OBJECT', name: '__Type' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'ENUM',
        name: '__TypeKind',
        description: 'An enum describing what kind of type a given __Type is',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: [
          { name: 'SCALAR', description: 'Indicates this type is a scalar', isDeprecated: false, deprecationReason: null },
          { name: 'OBJECT', description: 'Indicates this type is an object', isDeprecated: false, deprecationReason: null },
          { name: 'INTERFACE', description: 'Indicates this type is an interface', isDeprecated: false, deprecationReason: null },
          { name: 'UNION', description: 'Indicates this type is a union', isDeprecated: false, deprecationReason: null },
          { name: 'ENUM', description: 'Indicates this type is an enum', isDeprecated: false, deprecationReason: null },
          { name: 'INPUT_OBJECT', description: 'Indicates this type is an input object', isDeprecated: false, deprecationReason: null },
          { name: 'LIST', description: 'Indicates this type is a list', isDeprecated: false, deprecationReason: null },
          { name: 'NON_NULL', description: 'Indicates this type is a non-null wrapper', isDeprecated: false, deprecationReason: null }
        ],
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: '__Field',
        description: 'Field information',
        fields: [
          { name: 'name', description: 'Field name', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Field description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'args', description: 'Field arguments', type: { kind: 'NON_NULL', ofType: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__InputValue' } } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'type', description: 'Field type', type: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'isDeprecated', description: 'Is deprecated', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'Boolean' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'deprecationReason', description: 'Deprecation reason', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: '__InputValue',
        description: 'Input value information',
        fields: [
          { name: 'name', description: 'Input value name', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Input value description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'type', description: 'Input value type', type: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__Type' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'defaultValue', description: 'Default value', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: '__EnumValue',
        description: 'Enum value information',
        fields: [
          { name: 'name', description: 'Enum value name', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Enum value description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'isDeprecated', description: 'Is deprecated', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'Boolean' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'deprecationReason', description: 'Deprecation reason', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'OBJECT',
        name: '__Directive',
        description: 'Directive information',
        fields: [
          { name: 'name', description: 'Directive name', type: { kind: 'NON_NULL', ofType: { kind: 'SCALAR', name: 'String' } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'description', description: 'Directive description', type: { kind: 'SCALAR', name: 'String' }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'locations', description: 'Directive locations', type: { kind: 'NON_NULL', ofType: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'ENUM', name: '__DirectiveLocation' } } } }, args: [], isDeprecated: false, deprecationReason: null },
          { name: 'args', description: 'Directive arguments', type: { kind: 'NON_NULL', ofType: { kind: 'LIST', ofType: { kind: 'NON_NULL', ofType: { kind: 'OBJECT', name: '__InputValue' } } } }, args: [], isDeprecated: false, deprecationReason: null }
        ],
        interfaces: [],
        possibleTypes: null,
        enumValues: null,
        inputFields: null
      },
      {
        kind: 'ENUM',
        name: '__DirectiveLocation',
        description: 'Directive location',
        fields: null,
        interfaces: null,
        possibleTypes: null,
        enumValues: [
          { name: 'QUERY', description: 'Query operation', isDeprecated: false, deprecationReason: null },
          { name: 'MUTATION', description: 'Mutation operation', isDeprecated: false, deprecationReason: null },
          { name: 'SUBSCRIPTION', description: 'Subscription operation', isDeprecated: false, deprecationReason: null },
          { name: 'FIELD', description: 'Field', isDeprecated: false, deprecationReason: null },
          { name: 'FRAGMENT_DEFINITION', description: 'Fragment definition', isDeprecated: false, deprecationReason: null },
          { name: 'FRAGMENT_SPREAD', description: 'Fragment spread', isDeprecated: false, deprecationReason: null },
          { name: 'INLINE_FRAGMENT', description: 'Inline fragment', isDeprecated: false, deprecationReason: null }
        ],
        inputFields: null
      }
    ],
    directives: []
  }
}
