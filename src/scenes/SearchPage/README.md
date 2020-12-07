## [`SearchPage`](src/scenes/SearchPage/SearchPage.jsx)

Contains all algolia elements

> ### [`InstantSearch`](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/) (_searchClient_ , _indexName_)
>
> [_searchClient_](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-searchclient) : algoliasearch ( _APP_ID_ , _PUBLIC_KEY_ )
>
> [_indexName_](https://www.algolia.com/doc/api-reference/widgets/index-widget/react/) : "events"

---

## [`CustomSearchBox`](src/scenes/SearchPage/components/CustomSearchBox.jsx)

Textfield to refine search

> ### [SearchBox](https://www.algolia.com/doc/api-reference/widgets/search-box/react/)
>
>     refine( searchString: String )
>
> ### Searchable Attributes
>
> 1.  Name
> 2.  Description
> 3.  Category
> 4.  Types
> 5.  Tags
> 6.  Description
> 7.  Location

---

## [`CustomRefinementList`](src/scenes/SearchPage/components/CustomRefinementList.jsx)

Checkbox to refine search

> ### [RefinementList](https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/)
>
>     refine( selectedAttributes: [String] )
>
> Attributes for faceting
>
> 1.  Category
> 2.  Types
> 3.  Tags
> 4.  Languages

---

## [`CustomDate`](src/scenes/SearchPage/components/CustomDate.jsx)

Refine search with date range and sort by date (ascending, descending)

> ### [RangeInput](https://www.algolia.com/doc/api-reference/widgets/range-input/react/)
>
> Dates in [Unix Timestamp](https://en.wikipedia.org/wiki/Unix_time)
>
>     refine( date: { min: unixTimestamp,
>                     max: unixTimestamp })
>
> ### [SortBy](https://www.algolia.com/doc/api-reference/widgets/sort-by/react/)
>
>     refine( indexName: 'events' || 'events_asc' || 'events_desc' )
>
> Indexes names
>
> 1.  _events_ : event sorted by _Algolia's AI_
> 2.  _events_asc_ : Ascending order (replica of _events_)
> 3.  _events_desc_ : Descending order (replica of _events_)

---

## [`CustomHits`](src/scenes/SearchPage/components/CustomHits.jsx)

Maps hits corresponding to current refinement

> ### [Hits](https://www.algolia.com/doc/api-reference/widgets/hits/react/)
>
> `Hits = ({ hits}) => hits.map( hit => <CustomEventItem hit={hit} /> )`
>
> ### [`CustomEventItem`](src/scenes/SearchPage/components/CustomEventItem.jsx)
>
> > Individual item to be displayed for every hit

---

## [`CustomGeoSearch`](src/scenes/SearchPage/components/CustomGeoSearch.jsx)

Maps hits corresponding to current refinement

> ### [GeoSearch](https://www.algolia.com/doc/api-reference/widgets/geo-search/react/)
>
> Launches an instance of [`<GoogleMapsLoader>`](https://www.algolia.com/doc/api-reference/widgets/google-maps-loader/react/) and mark the current hits on map with [`<Marker>`](https://www.algolia.com/doc/api-reference/widgets/marker/react/)

---

## [`CustomPagination`](src/scenes/SearchPage/components/CustomPagination.jsx)

Manage pagination depending on numbers of results

> ### [Pagination](https://www.algolia.com/doc/api-reference/widgets/pagination/react/)
>
>     refine( pageNumber: int )
