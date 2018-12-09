import React from 'react';
import styled from '@emotion/styled';
import {Button} from 'semantic-ui-react';

const StyledLoggedInMessage = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const Logout = ({currentUser, onLogout}) => (
  <div>
    <StyledLoggedInMessage>Hello, {currentUser.name}</StyledLoggedInMessage>

    <Button
      size="mini"
      negative
      onClick={e => {
        e.preventDefault();
        console.log('Testing');
        onLogout();
      }}
    >
      Logout
    </Button>
  </div>
);

export default Logout;
