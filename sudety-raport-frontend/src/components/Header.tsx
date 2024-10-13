import React, { useState, useContext } from 'react';
import { 
  AppBar, 
  Slide, 
  useScrollTrigger,
  CssBaseline,
  Grid
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuIcon from '@mui/icons-material/Menu';
import { Categories, CategoryTranslate } from './Categories';
import { LangContext } from './App';

import logo from '../img/fialovozluty-smaller.png';

import '../styles/Header.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HideOnScroll(props: Readonly<{
    window?: () => Window;
    children: React.ReactElement;
  }>) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const { siteLang, setSiteLang } = useContext(LangContext);
  
  const changeLang = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string) => setSiteLang(newLang ?? siteLang);
  
  const showSidebar = () => setSidebar(!sidebar);

  const routeTranslate = (route: string) => {
    if (route === '/') {
      return route;
    }

    const routeParts = route.split('/').slice(1);

    routeParts.forEach((value: string, index: number) => {
      if (CategoryTranslate[siteLang][value] !== undefined) {
        routeParts[index] = CategoryTranslate[siteLang][value];
      } else {
        //todo - posts, etc...
      }
    });
    return `/${routeParts.join('/')}`;
  };

  const changeLangHelper = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string) => {
    if (newLang != null) {
      // Change the language
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      changeLang(event, newLang);
      // Change the route
      navigate(routeTranslate(location.pathname), { replace: true});
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar className='navbar'>
        {/* <Toolbar> */}
          <Grid container>
            <Grid item xs={6} sm={8} md={10} className='site-logo-grid'>
              <Link to='/'>
                  <img src={logo} alt="Sudety Raport" />
              </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <div className='site-right-side'>
                <div className='site-lang-switch'>
                  <ToggleButtonGroup
                    value={siteLang}
                    exclusive
                    onChange={changeLangHelper}
                    aria-label='language'
                  >
                    <ToggleButton value='cs' aria-label='cs'>
                      {'cze'}
                    </ToggleButton>
                    <ToggleButton value='en' aria-label='en'>
                      {'eng'}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className='site-nav-grid'>
                  <Link to="#" className='menu-bars'>
                    {/* <Typography variant='h6' component='div' onClick={showSidebar}>
                      {!sidebar ? "Menu" : "Close"}
                    </Typography> */}
                    <MenuIcon onClick={showSidebar} />
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        {/* </Toolbar> */}
      </AppBar>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          {Categories[siteLang].map((item, index) => {
            return (
              <li key={item.path} className={item.cName}>
                <Link onClick={showSidebar} to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
