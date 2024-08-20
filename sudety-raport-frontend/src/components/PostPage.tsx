import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useQuery } from '@apollo/client';

import { LOAD_POST_BY_SLUG } from "../graphql/Queries";

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  dateGmt: string;
  link: string;
  status: string;
  slug: string;
  uri: string;
  language: {
    locale: string;
    name: string;
    slug: string;
  };
  translations: {
    id: string;
    slug: string;
  };
  featuredImage: {
    node: {
      id: string;
      altText: string;
      link: string;
      mediaItemUrl: string;
      sourceUrl: string;
    };
  };
  author: {
    node: {
      id: string;
      email: string;
      description: string;
      firstName: string;
      lastName: string;
      locale: string;
      name: string;
      nickname: string;
      uri: string;
      url: string;
      slug: string;
      username: string;
    };
  };
}


export default function PostPage() {
  const { postID } = useParams();
  const siteLang = navigator.language;

  // const [error, setError] = useState<{message: string} | null>(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const { error, loading, data } = useQuery<{post: Post}>(LOAD_POST_BY_SLUG, {
    variables: {
      postSlug: postID
    },
  });

  useEffect(() => {
    // load the post data

    // redirect if the site lang has changed
    setPost(data?.post);
  }, [data, siteLang]);

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

  if (post === undefined) {
    return (
      <div>
        <p>{"Post couldn't be rendered :("}</p>
      </div>
    );
  }

  console.log(post);

  return (
    <div>
      {
       parse(post?.content ?? '')
       // we can do either lazy loading or paging
      //  parse(post?.content?.rendered.split('<!--nextpage-->')[0])
      }
    </div>
  );
}
