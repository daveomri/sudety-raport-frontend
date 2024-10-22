import { useContext, useMemo } from 'react';
import { Categories } from '../Categories';
import { LandingPageRow } from './LandingPageRow';
import { LangContext } from '../App/App';

function getPageRows(siteLang: string) {
  const pageRows: React.ReactElement[] = [];

  Categories[siteLang].forEach((category) => {
    pageRows.push(<LandingPageRow category={category} key={`category-${category.id}`} />);
  });

  return pageRows;
}

export function LandingPage() {
  const { siteLang } = useContext(LangContext);
  const pageRows = useMemo(() => getPageRows(siteLang), [siteLang]);

  
  return (
    <>
      {
        pageRows
      }
    </>
  );
}
