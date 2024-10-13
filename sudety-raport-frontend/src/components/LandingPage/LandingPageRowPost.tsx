import { Paper, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

import './styles.css';

export function LandingPageRowPost(props: Readonly<{
  category: any;
  post: any;
}>) {
  const { post, category } = props;
  const navigate = useNavigate();

  const redirectToPost = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    navigate(`${category.path}/${post.slug}`);
  };

  return (
    <div className='landing-page-post'>
      <Paper className='landing-page-post-link' onClick={redirectToPost}>
        <Typography variant='h6'>
        {post.title}
        </Typography>
        
        {parse(post.excerpt)}
      </Paper>
    </div>
  );
};
