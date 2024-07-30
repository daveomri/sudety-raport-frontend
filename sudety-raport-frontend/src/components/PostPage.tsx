import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

// api call - https://sudetyraport.com/wp-json/wp/v2/posts?slug=the-best-rap-songs-of-2023
//      https://sudetyraport.com/wp-json/wp/v2/posts?page=2&per_page=11
//      https://sudetyraport.com/wp-json/wp/v2/posts?categories=19



export default function PostPage() {
  const { postID } = useParams();
  const [error, setError] = useState<{message: string} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch(`https://sudetyraport.com/wp-json/wp/v2/posts/${postID}`)
      .then(res => {    
        // Header    
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setPost(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [postID]);

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
      {
      //  parse(post?.content?.rendered)
       // we can do either lazy loading or paging
       parse(post?.content?.rendered.split('<!--nextpage-->')[0])
      }
    </div>
  );
}
