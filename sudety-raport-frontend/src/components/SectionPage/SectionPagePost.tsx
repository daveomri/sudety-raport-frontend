import { Paper } from '@mui/material';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


export function SectionPagePost(props: Readonly<{
  category: any;
  post: any;
}>) {
  const { 
    post,
    category
  } = props;
  const navigate = useNavigate();

  const redirectToPost = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    navigate(`${category.path}/${post.node.slug}`);
  };

  return (
    <div style={{ height: "500px", width: "514px", margin: "16px" }} onClick={redirectToPost}>
      <Paper style={{ height: "100%", width: "514px" }}>
        <h3>{post.node.slug}</h3>
        <h2>{post.node.title}</h2>
        {parse(post.node.excerpt)}
      </Paper>
    </div>
  );
};
