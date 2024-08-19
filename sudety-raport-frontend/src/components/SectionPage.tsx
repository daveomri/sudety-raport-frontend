import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import SectionPagePost from './SectionPagePost';
import { useQuery } from '@apollo/client';
import { LOAD_SECTION_POSTS } from '../graphql/Queries';
// import { CategoryTranslate, LangTranslate } from './Categories';
// import { useNavigate } from 'react-router-dom';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19

interface Post {
  node: {
    id: string;
    title: string;
    excerpt: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      }
    }
  }
}
interface Posts {
  posts: {
    edges: Post[];
  }
}

export default function SectionPage(props: Readonly<{
  category: any;
}>) {
  const { category } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  const { error, refetch, loading, data } = useQuery<Posts>(LOAD_SECTION_POSTS, {
    variables: {
      categorySlug: category.slug,
      numberOfPosts: 5,
      lastPoint: null

    }
  });

  const loadMorePosts = () => {
    if (posts !== undefined && posts.length !== 0) {
      refetch({
        categorySlug: category.slug,
        numberOfPosts: 5,
        lastPoint: posts.at(-1)?.node.id
      });
    }
  };  

  // const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  //   setPage(page);
  // };

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
  
  if (loading && !data) {
    return (
      <div>
      Loading...
      </div>
    );
  }

  console.log(`this is posts ${posts}`);

  if (posts === undefined || posts.length === 0) {
    return <div/>;
  }

  return (
    <div>
      {
        posts.map((post: Post) => (
            <SectionPagePost category={category} post={post} key={`post-${post.node.id}`} />
        ))
      }
      <div>
        <Button onClick={loadMorePosts}>{"Load more"}</Button>
      </div>
    </div>
  );
}
