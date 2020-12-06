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

### Appollo React Client 

Appollo React Client : https://www.apollographql.com/docs/react/

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

### Material-UI

For Ui and flexible component : https://material-ui.com/getting-started/usage/

#### CreateMuiTheme

The App use the createMuiTheme from material ui to create a color standart for the UI
You can find the Color configs here : src/theme.js

## Test

### Enzyme

For component testing : https://enzymejs.github.io/enzyme/

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

### JestJS

For general testing : https://jestjs.io/

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.

