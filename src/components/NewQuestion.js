import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddQuestion } from "../actions/questions"
import { Redirect } from "react-router-dom"

class NewQuestion extends Component {
  state = {
    option1: "",
    option2: "",
    toHome: false,
  }

  handleChange = e => {
    const text = e.target.value
    const optionId = e.target.id

    this.setState({
      [optionId === "option1" ? "option1" : "option2"]: text,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { option1, option2 } = this.state
    const { dispatch, id } = this.props
    const question = {
      optionOne: {
        votes: [],
        text: option1,
      },
      optionTwo: {
        votes: [],
        text: option2,
      },
    }

    dispatch(handleAddQuestion(question))

    this.setState(() => ({
      option1: "",
      option2: "",
      toHome: !id,
    }))
  }

  render() {
    const { option1, option2, toHome } = this.state
    if (toHome) return <Redirect to="/homepage" />
    const questionLeft1 = 280 - option1.length
    const questionLeft2 = 200 - option2.length

    return (
      <div>
        <h3 className="center">Compose New Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <h2>Would you rather</h2>
          <textarea
            placeholder="What would you like to do? Option 1"
            value={option1}
            id="option1"
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {questionLeft1 <= 100 && (
            <div className="question-length">{questionLeft1}</div>
          )}
          <div>or</div>
          <textarea
            placeholder="What would you like to do? Option 2"
            value={option2}
            id="option2"
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {questionLeft2 <= 100 && (
            <div className="question-length">{questionLeft2}</div>
          )}
          <button
            className="btn"
            type="submit"
            disabled={option1 === "" || option2 === ""}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
