import { useEffect, useState } from 'react';
import LandingPageRowPost from './LandingPageRowPost';
import { useQuery, gql } from '@apollo/client';
import { LOAD_POSTS_PREVIEW } from '../graphql/Queries';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//    https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//    https://sudetyraport.com/wp-json/wp/v2/posts?categories=19


export default function LandingPageRow(props: Readonly<{
  category: any;
}>) {
  const { category } = props;
  const [posts, setPosts] = useState<any>([]);

  const { error, loading, data } = useQuery(LOAD_POSTS_PREVIEW, {
    variables: {
      categorySlug: category.slug,
    },
  });

  useEffect(() => {
    console.log(data);

    setPosts(data);
    
  // fetch(`https://sudetyraport.com/wp-json/wp/v2/posts?categories=${category.id}&per_page=5`)
  //   .then(res => res.json())
  //   .then(
  //   (result) => {
  //     setIsLoaded(true);
  //     setPosts(result);
  //   },
  //   (error) => {
  //     setIsLoaded(true);
  //     setError(error);
  //   }
  //   )

  }, [data]);

  if (error) {
  return (
    <div>
    Error: {error?.message}
    </div>
  );
  }

  if (loading) {
  return (
    <div>
    Loading...
    </div>
  );
  }
  else if (posts === undefined || posts.length === 0) {
    return <div></div>;
  }

  return (
  <div>
    <h1>{category.title}</h1>
    {/* <div style={{ width: "100%", overflow: "auto", display: "flex", height: "5em" }}>
    {posts.map((post: {id: number}) => (
      <LandingPageRowPost key={`post-${post.id}`} category={category} post={post}/>
    ))}
    </div> */}
  </div>
  );
}
