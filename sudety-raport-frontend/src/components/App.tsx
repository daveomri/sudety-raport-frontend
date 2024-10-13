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

import { Header } from './Header';
import { Footer } from './Footer';
import { 
  BrowserRouter as  Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { Categories } from './Categories';
import { LandingPage } from './LandingPage/LandingPage';
import { SectionPage } from './SectionPage/SectionPage';
import { PostPage } from './PostPage/PostPage';

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
  return ['cs', 'en'].map((lang: string) => {
    return Categories[lang].map((item: {
      path: string;
      slug: string
    }) => {
      return (
        <>
        <Route key={item.path} path={item.path} element={<SectionPage category={item} />} />
        <Route key={`${item.path}/:id`} path={`${item.path}/:postID`} element={<PostPage category={item.slug} />} />
        </>
      );
    })
  })
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
              <Route path='*' element={<LandingPage />} />
            </Routes>
          </Router>
        </Container>
        <Footer />
      </LangContext.Provider>
    </ApolloProvider>
  );
}
