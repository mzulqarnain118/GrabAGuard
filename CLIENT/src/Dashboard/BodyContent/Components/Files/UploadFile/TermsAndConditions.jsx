import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
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
    color: "#872b26",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
  },
  checkbox: {
    color: "#872b26",
  },
}));

function TermsAndConditions() {
  const classes = useStyles();
  const [agree, setAgree] = useState(false);

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Terms and Conditions
      </Typography>
      <Typography variant="body1">
        Please read these terms and conditions carefully before using the Grab-A-Guard website.
      </Typography>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Agreement to terms
        </Typography>
        <Typography variant="body1">
          By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree
          to all the terms and conditions of this agreement, then you may not access the website or use any services.
          If these terms and conditions are considered an offer by Grab-A-Guard, acceptance is expressly limited to
          these terms.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Accounts
        </Typography>
        <Typography variant="body1">
          When you create an account with us, you guarantee that you are above the age of 18 and that the information
          you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete
          information may result in the immediate termination of your account on the website.
        </Typography>
        <Typography variant="body1">
          You are responsible for maintaining the confidentiality of your account and password, including but not
          limited to restricting access to your computer and/or account. You agree to accept responsibility for all
          activities that occur under your account. You must immediately notify us of any unauthorized use of your
          account or any other breach of security.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Termination
        </Typography>
        <Typography variant="body1">
          We may terminate or suspend access to
          the website immediately, without prior notice or liability, for any reason whatsoever, including without limitation
          if you breach the terms. All provisions of the terms which by their nature should survive termination shall
          survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity,
          and limitations of liability.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Governing law
        </Typography>
        <Typography variant="body1">
          These terms and conditions are governed by and construed in accordance with the laws of the state of California
          and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h6" className={classes.subSection}>
          Changes
        </Typography>
        <Typography variant="body1">
          We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is
          material we will try to provide at least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </Typography>
      </Box>
      <Box className={classes.section}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={handleAgreeChange}
              name="agree"
              color="primary"
              className={classes.checkbox}
            />
          }
          label="I have read and agree to the terms and conditions."
        />
      </Box>
      <Box textAlign="center">
        <Link href="#" className={classes.link} underline="always" disabled={!agree}>
          Continue
        </Link>
      </Box>
    </Box>
  );
}

export default TermsAndConditions;