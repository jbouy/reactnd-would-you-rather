import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Segment, Form, Container, Divider, Message} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {getAuthedUser} from '../selectors/users';
import {handleAddQuestion} from '../actions/questions';

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    isValid: true,
  };

  onChange = (e, {name, value}) => this.setState({[name]: value});

  onSubmit = e => {
    e.preventDefault();

    this.setState({isValid: true});

    const {optionOneText, optionTwoText} = this.state;
    const {authedUserId: author, dispatch, history} = this.props;

    if (!optionOneText || !optionTwoText) {
      this.setState({isValid: false});
      return;
    }

    dispatch(handleAddQuestion({optionOneText, optionTwoText, author}));
    history.push('/');
  };

  render() {
    const {optionOneText, optionTwoText, isValid} = this.state;

    return (
      <Container>
        <Header attached="top" textAlign="center">
          Welcome to the Would You Rather App
        </Header>

        <Segment attached>
          <p>Complete the question:</p>

          <p>
            <strong>Would you rather...</strong>
          </p>

          <Form onSubmit={this.onSubmit} error={!isValid}>
            <Form.Input name="optionOneText" value={optionOneText} onChange={this.onChange} />
            <Divider horizontal>Or</Divider>
            <Form.Input name="optionTwoText" value={optionTwoText} onChange={this.onChange} />

            <Message error header="Error" content="Please provide both answers before submitting." />

            <Form.Button fluid primary type="submit">
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const authedUser = getAuthedUser(state);

  return {
    authedUserId: authedUser ? authedUser.id : null,
  };
}

export default withRouter(connect(mapStateToProps)(AddQuestion));
