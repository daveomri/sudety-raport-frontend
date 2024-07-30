import React, { useState } from 'react';
import { Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import { 
  BrowserRouter as  Router, 
  Routes, 
  Route 
} from 'react-router-dom';

import { Categories } from './Categories';
import LandingPage from './LandingPage';
import SectionPage from './SectionPage';
import PostPage from './PostPage';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19


const App = () => {
  const [siteLang, setSiteLang] = useState(navigator.language === 'cs' ? 'cs' : 'en');
  
  const changeLang = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string) => setSiteLang(newLang ?? siteLang);

  return (
    <>
    <Container className='app-container'>
      <Router>
        <Header siteLang={siteLang} changeLang={changeLang} />
        <Routes>
          <Route path='/' element={<LandingPage siteLang={siteLang} />} />
          {['cs', 'en'].map((lang: string) => {
            return Categories[lang].map((item: {
              path: string
            }) => {
              return (
                <>
                  <Route key={item.path} path={item.path} element={<SectionPage category={item} />} />
                  <Route key={`${item.path}/:id`} path={`${item.path}/:postID`} element={<PostPage />} />
                </>
              );
            })
          })}
          <Route path='*' element={<LandingPage siteLang={siteLang} />} />
        </Routes>
      </Router>
    </Container>
    <Footer />
    </>
  );
}

export default App;
