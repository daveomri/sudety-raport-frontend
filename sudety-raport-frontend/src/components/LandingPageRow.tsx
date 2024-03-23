import React, { useEffect, useState } from 'react';
import LandingPageRowPost from './LandingPageRowPost';


// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//    https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//    https://sudetyraport.com/wp-json/wp/v2/posts?categories=19


export default function LandingPageRow(props: Readonly<{
  category: any;
}>) {
  const { category } = props;
  const [error, setError] = useState<{message: string} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
  fetch(`https://sudetyraport.com/wp-json/wp/v2/posts?categories=${category.id}&per_page=5`)
    .then(res => res.json())
    .then(
    (result) => {
      setIsLoaded(true);
      setPosts(result);
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
    }
    )
  }, [category]);

  if (error) {
  return (
    <div>
    Error: {error?.message}
    </div>
  );
  }

  if (!isLoaded) {
  return (
    <div>
    Loading...
    </div>
  );
  }

  return (
  <div>
    <h1>{category.title}</h1>
    <div style={{ width: "100%", overflow: "auto", display: "flex", height: "5em" }}>
    {posts.map((post: {id: number}) => (
      <LandingPageRowPost key={`post-${post.id}`} category={category} post={post}/>
    ))}
    </div>
  </div>
  );
}
