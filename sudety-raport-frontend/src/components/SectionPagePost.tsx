import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function SectionPagePost(props: Readonly<{
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
    navigate(`${category.path}/${post.id}`);
    // navigate(`${category.path}/${post.id}`, {state: {page: 0, pPage: 10}});
    // also i should store the posts per session, to minimize communication with server
  };

  return (
    <div
      style={{ height: "2300px", width: "514px", margin: "16px" }} 
      onClick={redirectToPost}>
        <Paper style={{ height: "100%", width: "514px" }}>{post.title.rendered}</Paper>
    </div>
  );
};
