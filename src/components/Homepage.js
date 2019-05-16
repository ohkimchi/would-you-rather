import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { getAnsweredQs, getUnansweredQs } from '../utils/helpers'
import Question from './Question'

function TabContainer(props) {
  //todo
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.questions.map(q => (
        <Question key={q.id} question={q} />
      ))}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Homepage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { questions } = this.props;
    const { value } = this.state;

    return (
      <div className='question_list'>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Answered"/>
            <Tab label="Unanswered"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer key='answered-list' questions={getAnsweredQs(questions)}>Answered</TabContainer>}
        {value === 1 && <TabContainer key='unanswered-list' questions={getUnansweredQs(questions)}>Unanswered</TabContainer>}
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return { questions }
}

export default connect(mapStateToProps)(Homepage);
