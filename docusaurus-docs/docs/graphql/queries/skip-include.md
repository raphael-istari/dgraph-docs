---
title: "\"@skip and @include Directives\""
description: "@skip and @include directives can be applied to query fields. They let you skip or include a field based on the value of the if argument."
sidebar_position: 9
---

`@skip` and `@include` directives can be applied to query fields.
They allow you to skip or include a field based on the value of the `if` argument
that is passed to the directive.

## @skip

In the query below, we fetch posts and decide whether to fetch the title for them or not
based on the `skipTitle` GraphQL variable.

GraphQL query

```graphql
query ($skipTitle: Boolean!) 
  }
}
```

GraphQL variables
```json

}
```

## @include

Similarly, the `@include` directive can be used to include a field based on the value of
the `if` argument. The query below would only include the authors for a post if `includeAuthor`
GraphQL variable has value true.

GraphQL Query
```graphql
query ($includeAuthor: Boolean!) 
    }
  }
}
```

GraphQL variables
```json

}
```
