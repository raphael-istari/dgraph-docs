---
title: Quick Start

sidebar_position: 1
---

This is a quick start guide to run DQL queries and mutations. For an interactive walkthrough, take the [tour](https://dgraph.io/tour/).


This guide helps you:

* Understand how JSON data are represented as a graph
* Query the graph using DQL
* Use indexes


## Step 1: Run Dgraph

The easiest way to get Dgraph up and running is using the [Dgraph Cloud](https://cloud.dgraph.io).  
You can Login to Dgraph cloud using **Sign in with Google**, **Sign in with GitHub** or any other email account that you prefer to use.

1. In the Dgraph cloud console, click **Launch new backend**.
1. Select a plan, cloud provider, and region that meets your requirements.
1. Type a name for your Dgraph cloud instance.
1. Click **Launch**  
1. Click **Ratel** to access the UI that provides browser-based queries, mutations and visualizations.

## Step 2: Run Mutation

The create, update, and delete operations in Dgraph are called mutations.

Ratel makes it easier to run queries and mutations.

1. In the **Console** page, select **Mutate** tab.
2. Paste the following:


```dql
   
       },
       "starring" : [
         
         },
         
         },
         
         }
       ]
     },
     
     }
   ]
 }  
```

The input data is in JSON Format. Dgraph also supports RDF notation.

The sample JSON data is an array of two movies with some attributes. These are stored as Nodes in Dgraph.

There will be stored as Nodes in Dgraph.

The "Star Wars" movie has a `director` field which is an JSON object and a `starring` field which is an array of JSON objects.
Each object is also stored as a Node in Dgraph . The `director` and `starring` are stored as relations.


3. Click **Run** to execute the mutation.

View the Dgraph response in the JSON tab:

```dql

    }
  }, ...
  ```

Dgraph displays the universal identifiers (UID) of the nodes that were created.

## Step 3: First query
1.   In the **Console** page, select **Query** tab and run this query:

```dql
   
    director { name }
    starring { name }
     }
    }
```
The query lists all movies that have a `release_date` and for each, it looks for the  `director` and `starring` relations and provides the name   attribute of the related nodes if any.

2.   In the response panel, select **Graph**, to view a Graph output:



## Step 4: Alter Schema

Alter the schema to add indexes on some of the data so queries can use term matching, filtering and sorting.

1.    In the **Schema** page, select **Predicates**.
      Dgraph creates and displays the predicates `name`, `release-date`,`director` and `starring`.
      A predicate is Dgraph internal representation of a node attribute or a relation.
2.    Select the `name` predicate. Ratel displays details about the predicate type and indexes.
3.    Select **index** and select **term** for `name` predicate.
4.    Click **Update** to apply the index.



Set the index for the `release_date`:
1.    Select `release_date` predicate.
2.    Change the type to **datetime**
3.    Select **index** and choose **year** for the index type.
4.    Click **Update** to apply the index on the `release-date` predicate.


## Step 5: Queries using indexes

Let's get the movies having the term "Star" in their name and released before "1979".

In the **Console** page select **Query** tab and run this query:

```dql

    }
    starring (orderasc: name) 
    }
  }
}
```

Observe the JSON result and the graph result.

You can play with the release date and the search terms conditions to see Dgraph search and filtering in action.


In these five steps, you set up Dgraph, added some data, visualized it as a graph, added indexes and queried the data .

## Where to go from here

- Take the [Tour](https://dgraph.io/tour/) for a guided tour of how to write queries in Dgraph.
- A wider range of queries can also be found in the
[Query Language](/docs/query-language) reference.
- Go to [Clients](/docs/dql/clients) to see how to
communicate with Dgraph from your application.

## Need Help

* Please use [discuss.dgraph.io](https://discuss.dgraph.io) for questions, issues,
feature requests, and discussions.
