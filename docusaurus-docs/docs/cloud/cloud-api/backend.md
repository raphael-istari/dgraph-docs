---
title: Backend

sidebar_position: 4
---

## List Backends

List backends that you have access to.


This API requires authentication, please see [Authentication](/docs/deploy/admin/dgraph-administration) for instructions on issuing and passing a JWT token to the API.


### Cloud Endpoint

```
https://cerebro.cloud.dgraph.io/graphql
```

### API Command

```graphql

  }
}
```

### Example

* `<cerebro-jwt>` is the JWT returned from [Authentication](/docs/deploy/admin/dgraph-administration).
* `<lambda-token>` is a base64 string that will be non-empty if you have saved [Lambdas](/docs/graphql/lambda/lambda-overview) on your backend

 
```bash
#!/usr/bin/env bash

CEREBRO_JWT="<cerebro-jwt>"

curl 'https://cerebro.cloud.dgraph.io/graphql' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${CEREBRO_JWT}" \
  --data-binary '{"query":"{\n deployments {\n uid\n name\n zone\n url\n owner\n jwtToken\n deploymentMode\n deploymentType\n lambdaScript\n }\n}","variables":{}}' \
  --compressed
```
 


```json

      }
    ]
  }
}
```
 


For any `/admin` or `/admin/slash` requests to `https://<deployment.url>`, you **must use the `<deployment-jwt>` returned above in the `X-Auth-Token` header.** The Cerebro JWT is only used in the `Authorization` header for requests to `https://cerebro.cloud.dgraph.io/graphql`.


## Deploy Backend

Launch a new backend.


This API requires authentication, please see [Authentication](/docs/deploy/admin/dgraph-administration) for instructions on issuing and passing a JWT to the API.


### Cloud Endpoint

```
https://cerebro.cloud.dgraph.io/graphql
```

### API Command

```graphql
mutation CreateDeployment($newDeployment: NewDeployment!) 
    }
}
```

**Arguments**

* `newDeployment`: parameter object for new deployment
* `newDeployment.name`: name of the deployment
* `newDeployment.zone`: region to launch
* `newDeployment.deploymentType`: type of deployment `(free|shared|dedicated)`


### Example

* `<cerebro-jwt>` is the JWT returned from [Authentication](/docs/deploy/admin/dgraph-administration).

 
```bash
#!/usr/bin/env bash

CEREBRO_JWT="<cerebro-jwt>"

curl 'https://cerebro.cloud.dgraph.io/graphql' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${CEREBRO_JWT}" \
  --data-binary '{"query":"mutation CreateDeployment($deployment: NewDeployment!) {\n  createDeployment(input: $deployment) {\n    uid\n    name\n    url\n    jwtToken\n  }\n}","variables":{"deployment":{"name":"My New Deployment","zone":"us-east-1","deploymentType":"dedicated"}}}' \
  --compressed
```
 


```json

    }
  }
}
```
 

## Update Backend

Update backend.


This API requires authentication, please see [Authentication](/docs/deploy/admin/dgraph-administration) for instructions on issuing and passing a JWT token to the API.


### Cloud Endpoint

```
https://cerebro.cloud.dgraph.io/graphql
```

### API Command

```graphql
mutation UpdateDeployment($updateDeploymentInput: UpdateDeploymentInput!) 
}
```

**Arguments**

* `updateDeploymentInput`: parameter object for update deployment
* `updateDeploymentInput.uid` (required): deployment `uid`

### Example

* `<cerebro-jwt>` is the JWT returned from [Authentication](/docs/deploy/admin/dgraph-administration).
* `<deployment-uid>` is the UID returned from [List Backends](#list-backends).

 
```bash
#!/usr/bin/env bash

CEREBRO_JWT="<cerebro-jwt>"

curl 'https://cerebro.cloud.dgraph.io/graphql' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${CEREBRO_JWT}" \
  --data-binary '{"query":"mutation UpdateDeployment($dep: UpdateDeploymentInput!) {\n updateDeployment(input: $dep)\n}","variables":{"dep":{"uid":"<deployment.uid>","name":"My Deployment!"}}}' \
  --compressed
```
 


```json

  }
}
```
 

## Destroy Backend

Destroy (i.e., delete) a backend by id.


This API requires authentication, please see [Authentication](/docs/deploy/admin/dgraph-administration) for instructions on issuing and passing a JWT token to the API.


### Cloud Endpoint

```
https://cerebro.cloud.dgraph.io/graphql
```

### API Command

```graphql
mutation DeleteDeployment($deploymentID: String!) 
}
```

**Arguments**

* `deploymentID` (required): deployment `uid` returned from a [List Backends](#list-backends) request

### Example

* `<cerebro-jwt>` is the JWT returned from [Authentication](/docs/deploy/admin/dgraph-administration).

 
```bash
#!/usr/bin/env bash

CEREBRO_JWT="<cerebro-jwt>"

curl 'https://cerebro.cloud.dgraph.io/graphql' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${CEREBRO_JWT}" \
  --data-binary '{"query":"mutation DeleteDeployment($deploymentUid: String!) {\n  deleteDeployment(deploymentID: $deploymentUid)\n}","variables":{"deploymentUid":"<deployment.uid>"}}' \
  --compressed
```
 


```

  }
}
```
 

## Restore Backends

Restore into a backend by source backend ID.

### Cloud Endpoint

```bash
https://${DEPLOYMENT_URL}/admin/slash
```

### API Command

```graphql
mutation($uid: String!, $backupFolder: String, $backupNum: Int) 
    }, errors 
    }
  }
}
```

**Arguments**

* `uid` (required): the deployment `uid` from List Backends
* `backupFolder` (required): TODO
* `backupNum` (required): TODO

### Example

 
```bash
#!/usr/bin/env bash

DEPLOYMENT_URL="polished-violet.us-east-1.aws.cloud.dgraph.io"
DEPLOYMENT_JWT="<deployment-jwt>"

curl "https://${DEPLOYMENT_URL}/admin/slash" \
  -H 'Content-Type: application/json' \
  -H "X-Auth-Token: ${DEPLOYMENT_JWT}" \
  --data-binary '{"query":"mutation($uid: String!, $backupFolder: String, $backupNum: Int) {\n restore(uid: $uid, backupFolder: $backupFolder, backupNum: $backupNum) {\n response {\n code\n message\n restoreId\n }, errors {\n message\n }\n}\n}","variables":{"uid":"<deployment-uid>","backupFolder":"<backup-folder>","backupNum":<backup-num>}}' \
  --compressed
```
 


```json

      }
    }
  }
}
```
 

## Restore Backend Status

Retrieve the status of a restore operation.

### Cloud Endpoint

```bash
https://${DEPLOYMENT_URL}/admin/slash
```

### API Command

```graphql
query($restoreId: Int!) 
    response {status errors}
  }
}
```

**Arguments**

* `restoreId` (required): the id of the restore operation returned from [Restore Backends](#restore-backends) request

### Example

 
```bash
#!/usr/bin/env bash

DEPLOYMENT_URL="polished-violet.us-east-1.aws.cloud.dgraph.io"
DEPLOYMENT_JWT="<deployment-jwt>"

curl "https://${DEPLOYMENT_URL}/admin/slash" \
  -H 'Content-Type: application/json' \
  -H "X-Auth-Token: ${DEPLOYMENT_JWT}" \
  --data-binary '{"query":"query($restoreId: Int!) {\n restoreStatus(restoreId: $restoreId) {\n response {status errors}\n}\n}","variables":{"restoreId":1}}' \
  --compressed
```
 


```json

      }
    }
  }
}
```
 

## Drop

Drop (i.e., delete) all data in your backend.

### Cloud Endpoint

```bash
https://${DEPLOYMENT_URL}/admin/slash
```

### API Command

#### Drop Data

```graphql
mutation 
    response { code message }
  }
}
```

#### Drop Schema

```graphql
mutation 
    response { code message }
  }
}
```

#### Drop Types

```graphql
mutation($types: [String!]) 
    response { code message }
  }
}
```

**Arguments**

* `types`: string array containing type Names

#### Drop Fields

```graphql
mutation($fields: [String!]) 
    response { code message }
  }
}
```

**Arguments**

* `fields`: string array containing field Names

### Example

 
```bash
#!/usr/bin/env bash

DEPLOYMENT_URL="polished-violet.us-east-1.aws.cloud.dgraph.io"
DEPLOYMENT_JWT="<deployment-jwt>"

curl "https://${DEPLOYMENT_URL}/admin/slash" \
  -H 'Content-Type: application/json' \
  -H "X-Auth-Token: ${DEPLOYMENT_JWT}" \
  --data-binary '{"query":"mutation {\n dropData(allDataAndSchema: true) {\n response { code message }\n}\n}","variables":{}}' \
  --compressed
```
 


```json

      }
    }
  }
}
```
 
