// Comprehensive GraphQL Schema for Introspection
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
          { name: 'hello', description: 'Returns a greeting message', args: [], type: { kind: 'SCALAR', name: 'String' } },
          { name: 'user', description: 'Get a single user by ID', args: [{ name: 'id', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'User' } },
          { name: 'users', description: 'Get all users', args: [], type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'User' } } },
          { name: 'products', description: 'Get all products', args: [], type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Product' } } },
          { name: 'getProductById', description: 'Get product by ID', args: [{ name: 'id', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'Product' } },
          { name: 'cityList', description: 'Get list of cities', args: [], type: { kind: 'OBJECT', name: 'CityResults' } },
          { name: 'cityByPath', description: 'Get city by path', args: [{ name: '_path', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'CityItem' } },
          { name: 'personList', description: 'Get list of persons', args: [], type: { kind: 'OBJECT', name: 'PersonResults' } },
          { name: 'personByPath', description: 'Get person by path', args: [{ name: '_path', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'PersonItem' } },
          { name: 'companyList', description: 'Get list of companies', args: [], type: { kind: 'OBJECT', name: 'CompanyResults' } },
          { name: 'awardList', description: 'Get list of awards', args: [], type: { kind: 'OBJECT', name: 'AwardResults' } },
          { name: 'adventureList', description: 'Get list of adventures', args: [], type: { kind: 'OBJECT', name: 'AdventureResults' } },
          { name: 'adventureByPath', description: 'Get adventure by path', args: [{ name: '_path', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'AdventureItem' } },
          { name: 'adventurePaginated', description: 'Get paginated adventures', args: [{ name: 'first', type: { kind: 'SCALAR', name: 'Int' } }, { name: 'after', type: { kind: 'SCALAR', name: 'String' } }], type: { kind: 'OBJECT', name: 'AdventurePaginated' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'City',
        description: 'A city content fragment',
        fields: [
          { name: '_path', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'country', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'population', type: { kind: 'SCALAR', name: 'Int' } },
          { name: 'categories', type: { kind: 'LIST', ofType: { kind: 'SCALAR', name: 'String' } } },
          { name: '_tags', type: { kind: 'LIST', ofType: { kind: 'SCALAR', name: 'String' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'CityResults',
        description: 'City query results',
        fields: [
          { name: 'items', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'City' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'CityItem',
        description: 'Single city result',
        fields: [
          { name: 'item', type: { kind: 'OBJECT', name: 'City' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Person',
        description: 'A person content fragment',
        fields: [
          { name: '_path', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'firstName', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'awards', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Award' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'PersonResults',
        description: 'Person query results',
        fields: [
          { name: 'items', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Person' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'PersonItem',
        description: 'Single person result',
        fields: [
          { name: 'item', type: { kind: 'OBJECT', name: 'Person' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Company',
        description: 'A company content fragment',
        fields: [
          { name: '_path', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'ceo', type: { kind: 'OBJECT', name: 'Person' } },
          { name: 'employees', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Person' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'CompanyResults',
        description: 'Company query results',
        fields: [
          { name: 'items', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Company' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Award',
        description: 'An award',
        fields: [
          { name: 'id', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'title', type: { kind: 'SCALAR', name: 'String' } },
          { name: '_metadata', type: { kind: 'OBJECT', name: 'Metadata' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'AwardResults',
        description: 'Award query results',
        fields: [
          { name: 'items', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Award' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Metadata',
        description: 'Metadata for content fragments',
        fields: [
          { name: 'stringMetadata', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'MetadataItem' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'MetadataItem',
        description: 'A metadata key-value pair',
        fields: [
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'value', type: { kind: 'SCALAR', name: 'String' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Adventure',
        description: 'An adventure content fragment',
        fields: [
          { name: '_path', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'title', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'description', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'adventureType', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'price', type: { kind: 'SCALAR', name: 'Float' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'AdventureResults',
        description: 'Adventure query results',
        fields: [
          { name: 'items', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'Adventure' } } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'AdventureItem',
        description: 'Single adventure result',
        fields: [
          { name: 'item', type: { kind: 'OBJECT', name: 'Adventure' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'AdventurePaginated',
        description: 'Paginated adventure results',
        fields: [
          { name: 'edges', type: { kind: 'LIST', ofType: { kind: 'OBJECT', name: 'AdventureEdge' } } },
          { name: 'pageInfo', type: { kind: 'OBJECT', name: 'PageInfo' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'AdventureEdge',
        description: 'Adventure edge for pagination',
        fields: [
          { name: 'cursor', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'node', type: { kind: 'OBJECT', name: 'Adventure' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'PageInfo',
        description: 'Pagination information',
        fields: [
          { name: 'endCursor', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'hasNextPage', type: { kind: 'SCALAR', name: 'Boolean' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'User',
        description: 'A user object',
        fields: [
          { name: 'id', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'email', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'role', type: { kind: 'SCALAR', name: 'String' } }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Product',
        description: 'A product object',
        fields: [
          { name: 'id', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'name', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'price', type: { kind: 'SCALAR', name: 'Float' } },
          { name: 'category', type: { kind: 'SCALAR', name: 'String' } },
          { name: 'inStock', type: { kind: 'SCALAR', name: 'Boolean' } }
        ]
      },
      { kind: 'SCALAR', name: 'String', description: 'The `String` scalar type represents textual data' },
      { kind: 'SCALAR', name: 'Int', description: 'The `Int` scalar type represents non-fractional signed whole numeric values' },
      { kind: 'SCALAR', name: 'Float', description: 'The `Float` scalar type represents signed double-precision fractional values' },
      { kind: 'SCALAR', name: 'Boolean', description: 'The `Boolean` scalar type represents `true` or `false`' },
      {
        kind: 'OBJECT',
        name: '__Schema',
        description: 'A GraphQL Introspection defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, the entry points for query, mutation, and subscription operations.'
      },
      { kind: 'OBJECT', name: '__Type', description: null },
      { kind: 'ENUM', name: '__TypeKind', description: 'An enum describing what kind of type a given __Type is' },
      { kind: 'OBJECT', name: '__Field', description: null },
      { kind: 'OBJECT', name: '__InputValue', description: null },
      { kind: 'OBJECT', name: '__EnumValue', description: null },
      { kind: 'OBJECT', name: '__Directive', description: null }
    ],
    directives: []
  }
}

