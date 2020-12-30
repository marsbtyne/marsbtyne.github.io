import React from 'react';
import { Anchor, Box, Button, Footer, Grommet, Heading, Paragraph, Text } from 'grommet';

import GitHubIcon from '@material-ui/icons/GitHub';
import classes from '../containers/container.module.css';

const InfoPage = () => (
  <Box>
    <Box pad="large" size="medium" align="center">
      <Heading level="3">Welcome to the NYC Community Fridge Mapping project!</Heading>
      <Paragraph fill="true">
        This map was initially developed in July 2020 to help keep track of the community fridges started by mutual aid groups. < br />
        We're currently working on an app that will help drivers and fridgekeepers to coordinate pickups and deliveries in addition to the map. <br />
        If you're interested in getting involved, drop a message in the general Community Food Share Signal and we'll get you added to the Fridge Tech Chat! <br />
Any questions, comments, or corrections? Email <strong>mars.ballantyne@gmail.com </strong>or DM <strong> @plantpunx </strong>on Instagram. <br />
      Want to help out with a fridge in your neighborhood? Send a DM to the Instagram page listed for the fridge :)
</Paragraph>

      
      <Heading level="4">Adding a Fridge</Heading>
      <Paragraph fill="true"><em>Please only add / edit fridges if you are a fridgekeeper able to confirm the details and location of the fridge - thanks!</em><br />
      Use the "Add Fridge" button to add a new fridge to the map. Add in the name, address, instagram handle, and any other details.</Paragraph>
      <Heading level="4">Editing a Fridge</Heading>
      <Paragraph fill="true">Edit a fridge by clicking the "edit" button on the fridge info page. <br />The form will look the same as the "add" form - just change whatever information needs to be updated.</Paragraph>

      <Heading level="4">Checking a Fridge</Heading>
      <Paragraph fill="true">
        From the fridge info page, you can check a fridge to let everyone know the status. Leave a note and a picture, and it will automatically record the date and time so other fridge users can keep track of its current status and contents. 
      </Paragraph>
    </Box>
    <Footer className={classes.Footer}
        justify="center"
          background="dark-2"
          pad={{ horizontal: 'large', vertical: "small" }}
        >
          <Box height="xxsmall">
            <Text size="xsmall" textAlign="center">Fridges are set up and maintained by mutual aid organizations and volunteers, aided by <Anchor href="https://www.instagram.com/iohnyc/">IOHNYC.</Anchor> Feed people not landfills, food sovereignty for all. </Text>
            <Text size="xsmall" textAlign="center">Site built using <Anchor href="https://reactjs.org/">React, </Anchor> UI components from <Anchor href="https://v2.grommet.io/">Grommet.io. </Anchor> Source code: <Anchor icon={<GitHubIcon fontSize="small"/>} href="https://github.com/marsbtyne/nycfridge" /></Text>
            </Box>
            </Footer>
  </Box>
)

export default InfoPage;