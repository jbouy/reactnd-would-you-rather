import React, {Component} from 'react';
import {Header, Form, Message} from 'semantic-ui-react';
import AvatarContainer from './AvatarContainer';

class AnswerChooser extends Component {
  state = {
    chosenAnswer: '',
    isValid: true,
  };

  onChange = (e, {value}) => this.setState({chosenAnswer: value});

  onSubmit = e => {
    e.preventDefault();
    this.setState({isValid: true});

    const {chosenAnswer} = this.state;
    const {question, onAnswerQuestion} = this.props;

    if (!chosenAnswer) {
      this.setState({isValid: false});
      return;
    }

    onAnswerQuestion(question.id, chosenAnswer);
  };

  render() {
    const {chosenAnswer, isValid} = this.state;

    const {question} = this.props;
    const {authorName, avatar, optionOne, optionTwo} = question;

    return (
      <AvatarContainer header={`${authorName} asks:`} avatar={avatar}>
        <Header>Would You Rather...</Header>

        <Form error={!isValid} onSubmit={this.onSubmit}>
          <Form.Radio
            label={optionOne.text}
            value="optionOne"
            checked={chosenAnswer === 'optionOne'}
            onChange={this.onChange}
          />
          <Form.Radio
            label={optionTwo.text}
            value="optionTwo"
            checked={chosenAnswer === 'optionTwo'}
            onChange={this.onChange}
          />

          <Message error header="Error" content="You must choose an answer to submit." />

          <Form.Button fluid primary type="submit">
            Submit
          </Form.Button>
        </Form>
      </AvatarContainer>
    );
  }
}

export default AnswerChooser;
