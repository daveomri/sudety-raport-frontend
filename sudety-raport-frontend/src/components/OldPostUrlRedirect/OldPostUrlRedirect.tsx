import { 
  Navigate,
  useParams
} from 'react-router-dom';

export function OldPostUrlRedirect() {
    const { postID } = useParams();

    return (
        <Navigate to={`/${postID}`} />
    );
}
