import React, { useEffect, useState } from 'react';
import SectionPagePost from './SectionPagePost';
// import { CategoryTranslate, LangTranslate } from './Categories';
// import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19



export default function SectionPage(props: Readonly<{
  category: any;
}>) {
  const { category } = props;
  const [error, setError] = useState<{message: string} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    setPage(page);
  };

  useEffect(() => {
    setIsLoaded(false);
    fetch(`https://sudetyraport.com/wp-json/wp/v2/posts?categories=${category.id}&per_page=5&page=${page}`)
      .then(res => {
        
        setTotalPages(Number(res.headers.get('x-wp-totalpages')));
        
        return res.json();
      })
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
  }, [category, page]);

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

  if (posts === undefined || posts.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      {
        posts.map((post: {
          id: number
        }) => (
            <SectionPagePost category={category} post={post} key={`post-${post.id}`} />
        ))
      }
      <div><Pagination 
      count={totalPages} 
      page={page} 
      onChange={handlePageChange}
      color="primary" /></div>
    </div>
  );
}
