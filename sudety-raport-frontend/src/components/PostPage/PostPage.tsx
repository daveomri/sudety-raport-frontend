import { useEffect, useState, useContext } from 'react';
import { 
  useNavigate,
  useParams
} from 'react-router-dom';
import parse from 'html-react-parser';
import { useQuery } from '@apollo/client';

import { LOAD_POST_BY_SLUG } from "../../graphql/Queries";

import { LangContext } from '../App/App';

import './styles.css';

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
  }[];
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


export function PostPage(props: Readonly<{
  category: string;
  }>) {

    const { category } = props;
    const { siteLang } = useContext(LangContext);
    const { postID } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | undefined>(undefined);
    const { error, loading, data } = useQuery<{post: Post}>(LOAD_POST_BY_SLUG, {
      variables: {
        postSlug: postID
      },
    });


    useEffect(() => {
      const redirectToPost = (path: string) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        navigate(path, { replace: true });
      };
      // load the post data
      if (data && data.post?.language.slug !== siteLang) {
        if (data.post.translations.length !== 0) {
          redirectToPost(`/${category}/${data.post.translations.at(0)?.slug}`);
        } else {
          redirectToPost(`/${category}`);
        }
      }
      // redirect if the site lang has changed
      setPost(data?.post);
    }, [data, siteLang, category, navigate]);

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

    return (
      <div>
        {
        // parse(post?.content ?? '')
        // we can do either lazy loading or paging
         parse(post?.content.split('<!--nextpage-->')[0] ?? '')
        }
      </div>
    );
}
