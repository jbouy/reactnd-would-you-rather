import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab} from 'semantic-ui-react';
import _ from 'lodash';
import Question from './Question';

class Home extends Component {
  render() {
    const {answeredIds, unansweredIds} = this.props;

    const panes = [
      {
        menuItem: 'Unanswered Questions',
        render: () => (
          <Tab.Pane>
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

function mapStateToProps({questions, authedUser, users}) {
  const currentUser = users[authedUser];
  const answeredIds = !!currentUser ? _.sortBy(_.keys(currentUser.answers), id => -questions[id].timestamp) : [];

  return {
    answeredIds,
    unansweredIds: _.chain(questions)
      .omit(answeredIds)
      .sortBy(q => -q.timestamp)
      .map(q => q.id)
      .value(),
  };
}

export default connect(mapStateToProps)(Home);
