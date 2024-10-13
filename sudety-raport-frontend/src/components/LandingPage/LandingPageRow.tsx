import { useEffect, useState } from 'react';
import { LandingPageRowPost } from './LandingPageRowPost';
import { useQuery } from '@apollo/client';
import { LOAD_POSTS_PREVIEW } from '../../graphql/Queries';

import './styles.css';

export function LandingPageRow(props: Readonly<{
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
    if (data?.posts) {
      setPosts(data.posts.edges);
    }
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
    <div className='landing_page_row'>
    {posts.map((post: {node: any}) => (
      <LandingPageRowPost key={`${post.node.slug}`} category={category} post={post.node}/>
    ))}
    </div>
  </div>
  );
}
