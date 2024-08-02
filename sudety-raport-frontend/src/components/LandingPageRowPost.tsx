import React from 'react';
import { Paper, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


export default function LandingPageRowPost(props: Readonly<{
  category: any;
  post: any;
}>) {
  const { post, category } = props;
  const navigate = useNavigate();

  const redirectToPost = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    navigate(`${category.path}/${post.id}`);
  };

  return (
    <div style={{ height: "2300px", width: "514px", margin: "16px" }} onClick={redirectToPost}>
      <Paper style={{ height: "100%", width: "514px" }}>
        <Typography variant='h6'>
        {post.title}
        </Typography>
        
        {parse(post.excerpt)}
      </Paper>
    </div>
  );
};
