import React, { useState, createContext, useMemo } from 'react';
import { Container } from '@mui/material';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
 } from '@apollo/client';

import { onError } from '@apollo/client/link/error';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { 
  BrowserRouter as  Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { Categories } from '../Categories';
import { LandingPage } from '../LandingPage/LandingPage';
import { SectionPage } from '../SectionPage/SectionPage';
import { PostPage } from '../PostPage/PostPage';
import { OldPostUrlRedirect } from '../OldPostUrlRedirect/OldPostUrlRedirect';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      alert(`Graphql error ${message} ${locations} ${path}`);
    });
  }
});

const link = from ([
  errorLink,
  new HttpLink({uri: 'https://sudetyraport.com/graphql'})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export const LangContext = createContext<{
  siteLang: string;
  setSiteLang: React.Dispatch<React.SetStateAction<string>>;
}>({
  siteLang: 'en', // Default value for language
  setSiteLang: () => {}, // No-op function as a placeholder
});

const generateRoutes = () => {
  const routes: React.ReactElement[] = [];

  ['cs', 'en'].forEach((lang: string) => {
    Categories[lang].forEach((item: {
      path: string;
      slug: string
    }) => {
      routes.push(<Route key={item.path} path={item.path} element={<SectionPage category={item} />} />);
      // remove the following code and replace it with basic route with id for category and post
      routes.push(<Route key={`${item.path}/:id`} path={`${item.path}/:postID`} element={<PostPage category={item.slug} />} />);
    })
  });

  return routes;
};

export const App = () => {
  const [siteLang, setSiteLang] = useState(navigator.language === 'cs' ? 'cs' : 'en');


  const langValue = useMemo(() => ({ siteLang, setSiteLang }), [siteLang]);
  const routes = useMemo(() => generateRoutes(), []);

  return (
    <ApolloProvider client={client}>
      <LangContext.Provider value={langValue}>
        <Container className='app-container'>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<LandingPage />} />
              {routes}
              <Route path={':postYear/:postMonth/:postID'} element={<OldPostUrlRedirect />} />
              <Route path={'cs/:postYear/:postMonth/:postID'} element={<OldPostUrlRedirect />} />
              <Route path='*' element={<LandingPage />} />
            </Routes>
          </Router>
        </Container>
        <Footer />
      </LangContext.Provider>
    </ApolloProvider>
  );
}
