import React, { useState, useEffect } from 'react';
import { Anchor, Box, Button, Heading, Image } from 'grommet';

import Launch from '@material-ui/icons/Launch';
import InstagramIcon from '@material-ui/icons/Instagram';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import CheckFridge from './../CheckFridge';


const FridgeModal = (props) => {

  const [checking, setChecking] = useState(false);
  useEffect(() => {
    
  });
  

  const { name, neighborhood, streetAddress, notes, link, instagram, lat, lng, checks, imageURL } = props.fridgeData;
  let instaLink = link;
  if (instagram) instaLink = "http://www.instagram.com/" + instagram;

  let lastChecked = null;

  const getChecks = () => {
    const checkList = [];
    for (let key in checks) {
      checkList.push({
        ...checks[key],
        id: key
      });
    }
    return checkList;
  }

  if (checks) {
    let c = getChecks();
    let lastC = c[c.length - 1];
    let date = JSON.parse(lastC.date);
    let note = lastC.notes;
    date = new Date(date).toLocaleString();
    let lastPic = imageURL ? (<Image fit="contain" height="400" width="250" src={imageURL} />) : null;
    lastChecked = (
      <Box margin="small" gap="xsmall" style={{ alignItems: "center" }}>
        <h3>Last checked: {date}</h3>
        Most recent note:  {note}
        {lastPic}
      </Box>
    );

  }

  const checkButton = (
    <Box pad={{ bottom: 'large' }}>
      <Button primary active onClick={() => setChecking(true)} label="Check Fridge" />
    </Box>
  )

  const checkForm = (
    <CheckFridge f={props.fridgeData} confirmCheck={props.submitCheck} cancelCheck={setChecking} />
  )

  const editButton = (
    <Button onClick={props.editFridge} label="Edit Fridge" />
  )

  const getMapLink = (lat, lng) => {
    return 'https://www.google.com/maps/dir/?api=1&destination='.concat(lat, ",", lng)
  }

  return (
    <Box overflow="hidden">
      <Box
        flex={false}
        align='center'
        direction='row'
        tag='header'
        style={{ position: 'relative' }}
      >
        <Heading level={4}><strong>
          <Button
            plain
            size="large"
            alignSelf="start"
            onClick={props.onClose}
            label="Back To Map"
            icon={<NavigateBeforeIcon fontSize="large" />} /></strong></Heading>
      </Box>
      <Box
        align="center"
        margin="medium"
        pad="medium"
      >
        <h2>{name}</h2>
        <h2>Neighborhood: {neighborhood}</h2>
        <h3>Location: <Anchor href={getMapLink(lat, lng)}>{streetAddress}<Launch /></Anchor></h3>
        <h3>Notes: {notes}</h3>

        {instagram && <Button href={instaLink} icon={<InstagramIcon />} label={`@${instagram}`} />}

        {lastChecked}
        {checking ? checkForm : checkButton}
        {editButton}
      </Box>
    </Box>
  )
}

export default FridgeModal;