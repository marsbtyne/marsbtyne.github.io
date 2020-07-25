import React, { Component } from 'react';

import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';


const FridgeInfo = (props) => {
  let checks = props.checks.map(c => {
    
  })
  return (
    <Grommet theme={grommet}>
      <Box>
        <Accordion animate={animate} multiple={multiple}>
          <AccordionPanel label="Check Details">
            <Box background="light-2" overflow="auto" height="medium">
              {<Box flex={false}>
                props.checks.map
              </Box>}
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>
    </Grommet>
  );
}