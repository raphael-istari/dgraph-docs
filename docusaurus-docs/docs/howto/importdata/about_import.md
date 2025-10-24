---
title: Import data

sidebar_position: 1
---

As an `Administrator` you can initialize a new Dgraph cluster by doing an [Initial import](/docs/howto/importdata/bulk-loader) and you can import data into a running instance by performing a [Live import](/docs/howto/importdata/live-loader).


Initial import is **considerably faster** than the live import but can only be used to load data into a new cluster (without prior data) and is executed before starting the Alpha nodes.

 Contact us if you need to do an initial import on a Dgraph Cloud instance.


 Both options accept [RDF N-Quad/Triple
data](https://www.w3.org/TR/n-quads/) or JSON format. Refers to [data migration](/docs/about-data-migration) to see how to convert other data formats.
