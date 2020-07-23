import React from 'react';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';

import { Grommet, Box, Button, DropButton, Heading, Text, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const DropContent = (props) => (
  <Form onSubmit={(event) => props.onSubmit(event.value)}>
      <FormField name="name" htmlfor="textinput-id" label="Fridge Name">
        <TextInput id="textinput-id" name="name" placeholder="Community Fridge"/>
      </FormField>
      <Button icon={<Close />} onClick={props.onClose} />
  </Form>
);

DropContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const SimpleDropButton = (props) => {
  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
        <DropButton
          label={props.label}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} />}
          dropProps={{ align: { right: 'right' } }}
        />
  );
};

export default SimpleDropButton;