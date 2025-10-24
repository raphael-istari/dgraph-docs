---
title: Logging
description: Dgraph logs requests for queries and mutations, and also provides audit logging capabilities with a Dgraph Enterprise license.
sidebar_position: 2
---

Dgraph logs requests for queries and mutations, and also provides audit logging
capabilities with a Dgraph [enterprise license](/docs/enterprise-features/license).

Dgraph's log format comes from the glog library and is [formatted](https://github.com/golang/glog/blob/23def4e6c14b4da8ac2ed8007337bc5eb5007998/glog.go#L523-L533) as follows:

```
Lmmdd hh:mm:ss.uuuuuu threadid file:line] msg...
```

The fields shown above are defined as follows:



| Field | Definition |
|-------|------------|
|	`L`   | A single character, representing the log level (eg 'I' for INFO) |
|	`mm`    | Month (zero padded; ie May is '05') |
|	`dd`    | Day (zero padded) |
|	`hh:mm:ss.uuuuuu` | Time in hours, minutes and fractional seconds |
|	`threadid` | Space-padded thread ID as returned by GetTID() |
|	`file` | Filename |
|	`line` | Line number |
|	`msg`  | User-supplied message | 

## Log verbosity

To increase log verbosity, set the flag `-v=3` (or `-v=2`) which will enable verbose logging for everything. You can set this flag on both Zero and Alpha nodes.

Changing log verbosity requires a restart of the node.


## Request logging

Request logging, sometimes called *query logging*, lets you log queries and mutations.
You can dynamically turn request logging on or off. To toggle request logging on, send the following GraphQL mutation to the `/admin` endpoint of an Alpha node (e.g. `localhost:8080/admin`):

```graphql
mutation 
  config(input: {logDQLRequest: true}) 
    }
  }
}
```
Note this input flag was named logRequest until Dgraph version v23.

The response should look like the following:

```json

      }
    }
  },
  "extensions": 
    }
  }
}
```
Also, the Alpha node will print the following INFO message to confirm that the mutation has been applied:
```
I1207 14:53:28.240516   20143 config.go:39] Got config update through GraphQL admin API
```

When enabling request logging this prints the requests that Dgraph Alpha receives from Ratel or other clients. In this case, the Alpha log will print something similar to:

```
I1201 13:06:26.686466   10905 server.go:908] Got a query: query:"{\n  query(func: allofterms(name@en, \"Marc Caro\")) {\n  uid\n  name@en\n  director.film\n  }\n}"  
```
As you can see, we got the query that Alpha received. To read it in the original DQL format just replace every `\n` with a new line, any `\t` with a tab character and `\"` with `"`:

```

  }
}
```

Similarly, you can turn off request logging by setting `logRequest` to `false` in the `/admin` mutation.

```graphql
mutation 
  config(input: {logRequest: false}) 
    }
  }
}
```

## Audit logging (enterprise feature)

With a Dgraph enterprise license, you can enable audit logging so that all
requests are tracked and available for use in security audits. To learn more, see
[Audit Logging](/docs/enterprise-features/audit-logs).
