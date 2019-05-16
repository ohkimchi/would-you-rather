import React, { Component } from 'react'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    const id = this.props.match.params

    return (
      <div>
        <Question />
      </div>
    )
  }
}

export default QuestionPage
