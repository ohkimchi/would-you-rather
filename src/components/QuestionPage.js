import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

const QuestionPage = (props) => {
  const { questions } = props;
  const { id } = props.match.params
  const question = Object.keys(questions).filter(key => key === id).map(key => questions[key])[0]

  return (
      <div>
        <Question question={question} />
      </div>
  )
}

function mapStateToProps({ questions }) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(QuestionPage)
