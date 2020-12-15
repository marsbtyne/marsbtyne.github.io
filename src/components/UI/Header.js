import React, { useState } from 'react';
import { Anchor, Box, Button, CheckBox, Grommet, Heading, Header, Layer, Footer, Text } from 'grommet';
import classes from '../../containers/container.module.css'

const Head = (props) => {

  return (
    
    <div>
      <Header background="light-4" pad="xsmall" justify="center">
        <Box gap="small" alignSelf="center">
          <Heading level="4">NYC Community Fridges</Heading>
          <Text>Current Fridge Count : {props.fridges.length}</Text>
        </Box>
      </Header>
      <Box justify="center" direction="row" pad="xsmall" gap="small">
        <Button primary label="Add Fridge" active onClick={props.openSubmissionModal} />
        <CheckBox
          name="toggle"
          toggle
          checked={props.showInfoBox}
          label="Show Fridge Info Boxes"
        // onChange={event => this.setState({ showInfoBox: event.target.checked })}
        />
      </Box>
    </div>
  )
}

export default Head;

