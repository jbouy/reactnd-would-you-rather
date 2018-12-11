import React, {Component} from 'react';
import {Segment, Label, Progress} from 'semantic-ui-react';
import styled from '@emotion/styled';

const AnswerContainer = styled(Segment)`
  margin-bottom: 10px;
  ${props => (props.selected ? 'background-color: #cce6ff !important; border-color: #4da9ff !important;' : '')}

  .ui.progress {
    margin-bottom: 1em;
  }
`;

const AnswerText = styled.div`
  font-weight: bold;
`;

const Votes = styled.div`
  font-weight: bold;
  text-align: center;
`;

class AnswerStatistics extends Component {
  render() {
    const {answer, totalVotes} = this.props;
    const {text, votes, selected, percentage} = answer;

    return (
      <AnswerContainer selected={selected}>
        {selected && (
          <Label attached="top right" color="yellow">
            Your answer
          </Label>
        )}
        <AnswerText>Would you rather {text}?</AnswerText>
        <Progress progress percent={percentage} color="blue" />

        <Votes>
          {votes} out of {totalVotes} vote(s)
        </Votes>
        <p>{selected}</p>
      </AnswerContainer>
    );
  }
}

export default AnswerStatistics;
