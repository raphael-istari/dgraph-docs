---
title: CSV data

sidebar_position: 6
---

## Convert CSV to JSON

There are many tools available to convert CSV to JSON. You can import large data sets to Dgraph using [Dgraph Live Loader](/docs/howto/importdata/live-loader) or [Dgraph Bulk Loader](/docs/howto/importdata/bulk-loader). In these examples, the `csv2json` tool is used, and the data is imported using the **Mutate** tab in Ratel.

### Before you begin

* Install [`csv2json`](https://www.npmjs.com/package/csv2json) conversion tool.
* Install `jq` a lightweight and flexible command-line JSON processor.
* Connect the Dgraph instance to Ratel for queries, mutations and visualizations.

#### Example 1

1. Create a `names.csv` file with these details:

    ```csv
    Name,URL
    Dgraph,https://github.com/dgraph-io/dgraph
    Badger,https://github.com/dgraph-io/badger
    ```

2. Change to the directory that contains the `names.csv` file and convert it to `names.json`:

    ```sh
    $ csv2json names.csv --out names.json
    ```
3. To prettify a JSON file, use the jq '.' command:

    ```sh
    $ cat names.json | jq '.'
    ```
    The output is similar to:
    ```sh
    [
      
      },
      
      }
    ]
    ```

    This JSON file follows
    the [JSON Mutation Format](/docs/json-mutation-format), it can be loaded into Dgraph using [Dgraph Live Loader](/docs/howto/importdata/live-loader) , [Dgraph Bulk Loader](/docs/howto/importdata/bulk-loader) or the programmatic clients.

4. To load the data to Ratel and HTTP clients. The JSON data has to be stored within the `"set"`
[key](
>}}). You can use `jq` to transform the JSON into the correct format:

    ```sh
    $ cat names.json | jq '{ set: . }'
    ```

    An output similar to this appears:
    ```json
    
        },
        
        }
      ]
    }
    ```
5. Paste the output in the **Mutate** tab of **Console** in Ratel.
6. Click **Run** to import data.
7. To view the imported data paste the following in the **Query** tab and click **Run**:

    ```dql
    
     }
    }
    ```


#### Example 2

1. Create a `connects.csv` file that's connecting nodes together. The `connects` field should be of the `uid` type.

    ```csv
    uid,connects
    _:a,_:b
    _:a,_:c
    _:c,_:d
    _:d,_:a
    ```

2. To get the correct JSON format, you can convert the CSV into JSON and use `jq`
to transform it in the correct format where the `connects` edge is a node `uid`.
This JSON file can be loaded into Dgraph using the programmatic clients.

    ```sh
    $ csv2json connects.csv | jq '[ .[] | { uid: .uid, connects: { uid: .connects } } ]'
    ```
    The output is similar to:

    ```json
    [
      
        }
      },
      
        }
      },
      
        }
      },
      
        }
      }
    ]
    ```

3. To get an output of the mutation format accepted in Ratel UI and HTTP clients:

    ```sh
    $ csv2json connects.csv | jq '{ set: [ .[] | {uid: .uid, connects: { uid: .connects } } ] }'
    ```

    The output is similar to:

    ```json
    
          }
        },
        
          }
        },
        
          }
        },
        
          }
        }
      ]
    }
    ```

To reuse existing integer IDs from a CSV file as UIDs in Dgraph, use Dgraph Zero's [assign endpoint](/docs/deploy/dgraph-zero) before loading data to allocate a range of UIDs that can be safely assigned.


4. Paste the output in the **Mutate** tab of **Console** in Ratel, and click **Run** to import data.
