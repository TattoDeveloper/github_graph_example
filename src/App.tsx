
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './normalize.css'
import './App.css';
import { SignIn } from './auth/presentation/sign-in/sign-in';
import { SignUp } from './auth/presentation/sing-up/sing-up';
import { DashBoard } from './profile/presentation/dashboard/dashborad';
import 'reflect-metadata';
import {ApolloClient, ApolloProvider,  createHttpLink,  InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers })=>{
   return {
     headers: {
       ...headers,
       authorization: "bearer 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",
     }
   }
})

const client  = new ApolloClient({
  link: authLink.concat( httpLink ),
  cache: new InMemoryCache()
});

function App() {
  return (
     <Router>
      <Switch>
         <Route exact path="/"  component={ SignIn } />
         <Route exact path="/sign-up"  component={ SignUp} />
         <Route exact path="/dashboard" component={ DashBoard } />
      </Switch>

    </Router>
  );
}

export default App;
