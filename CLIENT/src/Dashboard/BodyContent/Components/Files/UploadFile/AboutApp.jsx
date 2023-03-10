
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#872b26",
  },
  section: {
    marginTop: "32px",
    marginBottom: "16px",
  },
  subSection: {
    marginTop: "16px",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#872b26",
  },
  link: {
    color: '#872b26',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'none',
      color: "#872b26",
    },
  },
}));

function AboutApp() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <Box className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          About Grab A Guard
        </Typography>
        <Typography variant="body1">
          Grab A Guard is a mobile app designed to connect businesses with reliable security guards. Our goal is to
          provide peace of mind to business owners and managers by ensuring that their properties are well-protected by
          trained professionals.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Social Media Channels
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">Follow us on social media:</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Link href="https://www.facebook.com/grabaguard" target="_blank" rel="noopener">
              <FacebookIcon />
            </Link>
            <Link href="https://twitter.com/grabaguard" target="_blank" rel="noopener">
              <TwitterIcon />
            </Link>
            <Link href="https://www.instagram.com/grabaguard/" target="_blank" rel="noopener">
              <InstagramIcon />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions or feedback about Grab A Guard, please do not hesitate to contact us using the
          following information:
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <MailIcon />
          <Typography variant="body1" ml={1}>
            <Link href="mailto:info@grabaguard.com">info@grabaguard.com</Link>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <PhoneIcon />
          <Typography variant="body1" ml={1}>
            <Link href="tel">1-800-GRABAGUARD</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutApp;
