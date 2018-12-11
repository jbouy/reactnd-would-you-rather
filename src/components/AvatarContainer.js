import React, {Fragment} from 'react';
import {Header, Segment, Grid, Image} from 'semantic-ui-react';

const AvatarContainer = ({header, avatar, children}) => (
  <Fragment>
    <Header attached="top">{header}</Header>
    <Segment attached>
      <Grid>
        <Grid.Row divided>
          <Grid.Column width="3" verticalAlign="middle" textAlign="center">
            <Image src={avatar} size="tiny" inline />
          </Grid.Column>
          <Grid.Column width="13">{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Fragment>
);

export default AvatarContainer;
