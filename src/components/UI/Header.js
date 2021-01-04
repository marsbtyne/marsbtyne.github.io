import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Anchor, Box, Button, CheckBox, Grommet, Heading, Header, Layer, Footer, Text } from 'grommet';
import classes from '../../containers/container.module.css'

const Head = (props) => {

  return (
    
    <div>
      <Header background="light-4" pad="xsmall" justify="center">
        <Box margin="xsmall" gap="none" alignSelf="center">
          <Heading  margin="xsmall" pad="none" level="3">NYC Community Fridges</Heading>
          <Box gap="xsmall" direction="row">
          <Link to={{pathname: '/'}}>
            <Anchor>Map</Anchor>
          </Link> |
            <Link to={{pathname: '/about'}}><Anchor>About</Anchor></Link> | 
           <Text>Current Fridge Count : {props.fridges.length}</Text> </Box>
        </Box>
      </Header>
      
        {/* <Button primary label="Download JSON Data" active onClick={props.downloadData} /> */}
        {/* <CheckBox
          name="toggle"
          toggle
          checked={props.showInfoBox}
          label="Show Fridge Info Boxes"
        // onChange={event => this.setState({ showInfoBox: event.target.checked })}
        /> */}
    </div>
  )
}

export default Head;

