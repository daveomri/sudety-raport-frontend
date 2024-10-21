import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Send,
  Email
} from "@mui/icons-material";
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Button
} from "@mui/material";
import './styles.css';

const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24px"
      height="24px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support Us
            </Typography>
            <Button variant="outlined" color="error">
              Buy Me A coffee
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <Grid container spacing={1}>
              <Grid item sm={12}>
              <TextField
                  variant="outlined"
                  label="Your Email"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={(e) => console.log(e)} edge="end">
                          <Send />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} spacing={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contacts
            </Typography>
            <Link 
              href="https://twitter.com/SudetyRaport" 
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <Twitter fontSize="medium" />
            </Link>
            <Link
              href="https://www.instagram.com/sudetyraport/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <Instagram fontSize="medium" />
            </Link>
            
            <Link 
              href="https://www.facebook.com/profile.php?id=100079996757537" 
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <Facebook fontSize="medium" />
            </Link>

            <Link 
              href="https://www.tiktok.com/@sudetyraport" 
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <TikTokIcon />
            </Link>

            <Link 
              href="mailto:info@sudetyraport.com" 
              color="inherit"
              sx={{ pl: 1, pr: 1 }}>
              <Email fontSize="medium" />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://daveomri.github.io/portfolio/#/links">
              David Omrai
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

