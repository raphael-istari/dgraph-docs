---
title: Schema

sidebar_position: 3
---

## Get Schema

Fetch the schema from your backend.

### Cloud Endpoint

```bash
https://${DEPLOYMENT_URL}/admin
```

### API Command

```graphql

  }
}
```

### Example

 
```bash
#!/usr/bin/env bash

DEPLOYMENT_URL="polished-violet.us-east-1.aws.cloud.dgraph.io"
DEPLOYMENT_JWT="<deployment-jwt>"

curl "https://${DEPLOYMENT_URL}/admin" \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: ${DEPLOYMENT_JWT}" \
  --data-binary '{"query":"{\n getGQLSchema {\n schema\n generatedSchema\n }\n}","variables":{}}' \
  --compressed
```
 


```json

      "schema": "type Person { name: String! }",
      "generatedSchema": "<very-long-string>"
    }
  },
  "extensions": 
              }
            ]
          }
        ]
      }
    }
  }
}
```
 

## Update Schema

Update the schema in your backend.

### Cloud Endpoint

```bash
https://${DEPLOYMENT_URL}/admin
```

### API Command

```graphql
mutation($schema: String!) 
  updateGQLSchema(input: { set: { schema: $schema } }) 
    }
  }
}
```

**Arguments**

- `schema`: your desired schema string in GraphQL format

### Example

 
```bash
#!/usr/bin/env bash

DEPLOYMENT_URL="polished-violet.us-east-1.aws.cloud.dgraph.io"
DEPLOYMENT_JWT="<deployment-jwt>"

curl "https://${DEPLOYMENT_URL}/admin" \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: ${DEPLOYMENT_JWT}" \
  --data-binary '{"query":"mutation($sch: String!) {\n updateGQLSchema(input: { set: { schema: $sch } })\n {\n gqlSchema {\n schema\n }\n }\n}","variables":{"sch": "type Person { name: String! }"}}' \
  --compressed
```
 


```json

        "schema": "type Person { name: String! }"
      }
    }
  },
  "extensions": 
    }
  }
}
```
 
