import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab} from 'semantic-ui-react';
import Question from './Question';
import {getAnsweredQuestions, getUnansweredQuestions} from '../selectors/questions';

class Home extends Component {
  render() {
    const {answeredIds, unansweredIds} = this.props;

    const panes = [
      {
        menuItem: 'Unanswered Questions',
        render: () => (
          <Tab.Pane>
            {unansweredIds.length < 1 && <p>No questions found.</p>}

            {unansweredIds.map(id => (
              <Question key={id} id={id} />
            ))}
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Answered Questions',
        render: () => (
          <Tab.Pane>
            {answeredIds.length < 1 && <p>No questions found.</p>}

            {answeredIds.map(id => (
              <Question key={id} id={id} />
            ))}
          </Tab.Pane>
        ),
      },
    ];

    return <Tab panes={panes} menu={{attached: true, tabular: true, widths: 2}} />;
  }
}

function mapStateToProps(state) {
  return {
    answeredIds: getAnsweredQuestions(state)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(q => q.id),
    unansweredIds: getUnansweredQuestions(state)
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(q => q.id),
  };
}

export default connect(mapStateToProps)(Home);
