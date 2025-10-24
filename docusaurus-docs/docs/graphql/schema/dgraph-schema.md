---
title: Dgraph Schema Fragment
description: While editing your schema, this GraphQL schema fragment can be useful. It sets up the definitions of the directives that you’ll use in your schema.
sidebar_position: 9
---

While editing your schema, you might find it useful to include this GraphQL schema fragment.  It sets up the definitions of the directives, etc. (like `@search`) that you'll use in your schema.  If your editor is GraphQL aware, it may give you errors if you don't have this available and context sensitive help if you do.

Don't include it in your input schema to Dgraph - use your editing environment to set it up as an import.  The details will depend on your setup.

```graphql
"""
The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
Int64 can represent values in range [-(2^63),(2^63 - 1)].
"""
scalar Int64

"""
The DateTime scalar type represents date and time as a string in RFC3339 format.
For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
"""
scalar DateTime

input IntRange
}

input FloatRange
}

input Int64Range
}

input DateTimeRange
}

input StringRange
}

enum DgraphIndex 
}

input AuthRule 
}

enum HTTPMethod 
}

enum Mode 
}

input CustomHTTP 
}

type Point 
}

input PointRef 
}

input NearFilter 
}

input PointGeoFilter 
}

type PointList 
}

input PointListRef 
}

type Polygon 
}

input PolygonRef 
}

type MultiPolygon 
}

input MultiPolygonRef 
}

input WithinFilter 
}

input ContainsFilter 
}

input IntersectsFilter 
}

input PolygonGeoFilter 
}

input GenerateQueryParams 
}

input GenerateMutationParams 
}

directive @hasInverse(field: String!) on FIELD_DEFINITION
directive @search(by: [DgraphIndex!]) on FIELD_DEFINITION
directive @dgraph(type: String, pred: String) on OBJECT | INTERFACE | FIELD_DEFINITION
directive @id(interface: Boolean) on FIELD_DEFINITION
directive @withSubscription on OBJECT | INTERFACE | FIELD_DEFINITION
directive @secret(field: String!, pred: String) on OBJECT | INTERFACE
directive @auth(
	password: AuthRule
	query: AuthRule,
	add: AuthRule,
	update: AuthRule,
	delete: AuthRule) on OBJECT | INTERFACE
directive @custom(http: CustomHTTP, dql: String) on FIELD_DEFINITION
directive @remote on OBJECT | INTERFACE | UNION | INPUT_OBJECT | ENUM
directive @remoteResponse(name: String) on FIELD_DEFINITION
directive @cascade(fields: [String]) on FIELD
directive @lambda on FIELD_DEFINITION
directive @lambdaOnMutate(add: Boolean, update: Boolean, delete: Boolean) on OBJECT | INTERFACE
directive @cacheControl(maxAge: Int!) on QUERY
directive @generate(
	query: GenerateQueryParams,
	mutation: GenerateMutationParams,
	subscription: Boolean) on OBJECT | INTERFACE

input IntFilter 
}

input Int64Filter 
}

input FloatFilter 
}

input DateTimeFilter 
}

input StringTermFilter 
}

input StringRegExpFilter 
}

input StringFullTextFilter 
}

input StringExactFilter 
}

input StringHashFilter 
}
```
