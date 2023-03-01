import React, { useState } from 'react';
// @mui
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Gazzated from './Gazzated';
import NonGazzated from './NonGazzated';


const Reporting = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth={'xl'}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          IconButtonProps={{ edge: 'start' }}
          aria-controls="panel1a-content"
          id="panel1"
        >
          <Typography variant="button" display="block">                                    
          <strong>GAZETTED EMPLOYEES</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Gazzated />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          IconButtonProps={{ edge: 'start' }}
          aria-controls="panel1a-content"
          id="panel2"
        >
          <Typography variant="button" display="block">
            <strong>NON-GAZETTED EMPLOYEES</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NonGazzated />

        </AccordionDetails>
      </Accordion>

    </Container>
  );
}
export default Reporting;