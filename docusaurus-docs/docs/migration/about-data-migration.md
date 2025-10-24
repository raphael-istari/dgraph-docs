---
title: Data migration

sidebar_position: 1
---

To load CSV-formatted data or SQL data into Dgraph,
first convert the dataset into one of the accepted formats ([RDF N-Quad/Triple](https://www.w3.org/TR/n-quads/) or JSON) and then load the
resulting dataset into Dgraph.

After you convert the `.csv` or `.sql` files to [RDF N-Quad/Triple](https://www.w3.org/TR/n-quads/) or JSON,
you can use [Dgraph Live Loader](/docs/howto/importdata/live-loader) or
[Dgraph Bulk Loader](/docs/howto/importdata/bulk-loader) to import your data.
