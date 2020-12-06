# Spectacular - Frontend

Spectacular is a event creation platform based on EOS blockchain technology. All the tickets created for different event are NFT also known as Non-Fungible Token (https://en.wikipedia.org/wiki/Non-fungible_token)

# Motivation

The motivation behind this projet was to take advantage of the NFT technology and the blockchain technology to create a Dapp that would serve the same goal as traditional Event and ticket managing platform, but with all the feature that these technology has to offer 

- Verifiable digital scarcity
- Digital ownership
- Security 
- Easy history of ownership
- Ticket Validation for resale
- Monetize the resale that are traditionally out of the hands of the selling platform and event organizers

## Development environment configuration

### VSCode specific

-   Install Eslint extension from Marketplace
-   Install Prettier extension from Marketplace
-   Set format on save and fix all eslint errors on save:

```
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

This should allow you to see eslint errors and have automatic formatting on save when using VSCode.

### Adding new path aliases

To add new path aliases, simply modify the `paths` object in the `jsconfig.json` file.
Note: Sometimes, VSCode might need a restart for changes to be detected by the VSCode intellisense.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs eslint through the entire project.

### `npm run format`

Formats the entire project using Prettier.

### `npm run reinstall`

Cleans your node_module file and reinstall all the node_modules

# Tech/framework used

### UAL React renderer

Secure connection to crypto-wallet: https://github.com/EOSIO/ual-reactjs-renderer

This technology is wrapping the main App component with a UAL provider. The provider help us to have an activeuser in the App by    submitting request to login into an account. This module is important for the connection to have a secure connection and to link a crypto-wallet to an account

The config can be found here: src/config/ual.js

### Appollo React Client 

Appollo React Client : https://www.apollographql.com/docs/react/

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

The config can be found here : src/config/apolloClient.js

### React-i18next

For translation: https://react.i18next.com/latest/usetranslation-hook

While most of the time you only need the t function to translate your content, you can also get the i18n instance (in order to change the language).

The json for the French version of the app can be found here: /public/locales/fr/translation.json
The json for the English version of the app can be found here: /public/locales/en/translation.json

### Material-UI

For Ui and flexible component : https://material-ui.com/getting-started/usage/

#### CreateMuiTheme

The App use the createMuiTheme from material ui to create a color standart for the UI. You can find the Color configs here : src/theme.js

#### MakeStyles

Material-UI aims to provide a strong foundation for building dynamic UIs. For the sake of simplicity, Material-Ui expose the styling solution used in Material-UI components as the @material-ui/styles package.  https://material-ui.com/styles/basics/


## Test

### Enzyme

For component testing : https://enzymejs.github.io/enzyme/

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

### JestJS

For general testing : https://jestjs.io/

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.


# [Algolia](https://www.algolia.com/doc/)

Account [connection](https://www.algolia.com/users/sign_in) with *eospoly@gmail.com*

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


