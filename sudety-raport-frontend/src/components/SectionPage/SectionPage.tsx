import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { 
  useNavigate
} from 'react-router-dom';

import { SectionPagePost } from './SectionPagePost';
import { useQuery } from '@apollo/client';
import { LOAD_SECTION_POSTS } from '../../graphql/Queries';

import { CategoryTranslate, LangTranslate } from '../Categories'

import { LangContext } from '../App';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19

interface Post {
  node: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
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
    pageInfo: {
      endCursor: string;
      hasNextPage: string;
      hasPreviousPage: string;
      startCursor: string;
    }
  }
}

export function SectionPage(props: Readonly<{
  category: any;
}>) {
  const { category } = props;
  const { siteLang } = useContext(LangContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  const { error, refetch, loading, data } = useQuery<Posts>(LOAD_SECTION_POSTS, {
    variables: {
      categorySlug: category.slug,
      numberOfPosts: 5,
      lastPoint: null

    }
  });

  const loadMorePosts = () => {
    if (posts !== undefined && posts.length > 0) {
      refetch({
        categorySlug: category.slug,
        numberOfPosts: 5,
        lastPoint: data?.posts?.pageInfo.endCursor ?? null
      });
    }
  };

  useEffect(() => {
    const redirectToPost = (path: string) => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      navigate(path, { replace: true });
    };

    if (CategoryTranslate[siteLang][category.slug] === undefined) {
      // Change the site
      redirectToPost(`/${CategoryTranslate[LangTranslate[siteLang]][category.slug]}`)
    }

    if (data?.posts) {
      setPosts(data.posts.edges);
    }
  }, [siteLang, category, data, navigate]);

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

  if (posts === undefined || posts.length === 0) {
    return <div/>;
  }

  return (
    <div>
      {
        posts.map((post: Post) => (
            <SectionPagePost category={category} post={post} key={`${post.node.slug}`} />
        ))
      }
      <div>
        <Button disabled={!(data?.posts?.pageInfo.hasNextPage ?? false)} onClick={loadMorePosts}>{"Load more"}</Button>
      </div>
    </div>
  );
}
