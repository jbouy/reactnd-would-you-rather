import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Segment, Header, Label} from 'semantic-ui-react';
import {getUserLeaderBoard} from '../selectors/users';
import AvatarContainer from './AvatarContainer';

class LeaderBoard extends Component {
  render() {
    const {leaderBoard} = this.props;

    return (
      <div>
        {leaderBoard.map(l => (
          <AvatarContainer key={l.id} header={l.name} avatar={l.avatarURL}>
            <Grid>
              <Grid.Row divided>
                <Grid.Column width="10" verticalAlign="middle">
                  <p>Answered questions: {l.answered}</p>
                  <p>Created questions: {l.created}</p>
                </Grid.Column>
                <Grid.Column width="6" verticalAlign="middle">
                  <Header textAlign="center" attached="top">
                    Score
                  </Header>
                  <Segment attached textAlign="center">
                    <Label circular color="teal" size="big">
                      {l.score}
                    </Label>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </AvatarContainer>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leaderBoard: getUserLeaderBoard(state),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
