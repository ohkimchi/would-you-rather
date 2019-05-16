import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {

  render() {
    const { questions } = this.props;
    const { id } = this.props.match.params
    const question = Object.keys(questions).filter(key => key === id).map(key => questions[key])[0]

    return (
      <div>
        <Question question={question} />
      </div>
    )
  }
}

function mapStateToProps({ questions }) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(QuestionPage)
