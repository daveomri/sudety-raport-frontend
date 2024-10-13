import { useContext } from 'react';
import { Categories } from '../Categories';
import { LandingPageRow } from './LandingPageRow';
import { LangContext } from '../App';

export function LandingPage() {
  const { siteLang } = useContext(LangContext);
  

  return (
    <>
      {
        Categories[siteLang].map((category) => (
            <LandingPageRow category={category} key={`category-${category.id}`} />))
      }
    </>
  );
}
