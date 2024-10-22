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

import { TikTokIcon } from "./TikTokIcon";

import './styles.css';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,}}>
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
              <Grid item sm={12} className="newsletter-wrap">
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
                    }}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} spacing={2} className="links">
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contacts
            </Typography>
            <Link 
              href="https://twitter.com/SudetyRaport" 
              color="inherit">
              <Twitter fontSize="medium" />
            </Link>
            <Link
              href="https://www.instagram.com/sudetyraport/"
              color="inherit">
              <Instagram fontSize="medium" />
            </Link>
            <Link 
              href="https://www.facebook.com/profile.php?id=100079996757537" 
              color="inherit">
              <Facebook fontSize="medium" />
            </Link>
            <Link 
              href="https://www.tiktok.com/@sudetyraport" 
              color="inherit">
              <TikTokIcon />
            </Link>
            <Link 
              href="mailto:info@sudetyraport.com" 
              color="inherit">
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
