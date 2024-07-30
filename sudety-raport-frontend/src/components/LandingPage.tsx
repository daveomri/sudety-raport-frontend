import { Categories } from './Categories';
import LandingPageRow from './LandingPageRow';


// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19

export default function LandingPage(props: Readonly<{
  siteLang: string;
}>) {
  const { siteLang } = props;

  return (
    <div>
      {
        Categories[siteLang].map((category) => (
            <LandingPageRow category={category} key={`category-${category.id}`} />))
      }
    </div>
  );
}
