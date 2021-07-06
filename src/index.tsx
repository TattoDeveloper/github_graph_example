import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider,  createHttpLink,  InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'



const { REACT_APP_API_ACCESS_TOKEN, REACT_APP_GRAPHQL_API } = process.env

const httpLink = createHttpLink({
  uri: REACT_APP_GRAPHQL_API,
});

const authLink = setContext((_, { headers })=>{
   return {
     headers: {
       ...headers,
       authorization:`bearer ${ REACT_APP_API_ACCESS_TOKEN }`,
     }
   }
})

const client  = new ApolloClient({
  link: authLink.concat( httpLink ),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
         <ApolloProvider client={ client }>
             <App />
         </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
