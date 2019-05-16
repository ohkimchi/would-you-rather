import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVotesNumForTheOption, getPercentageForTheOption } from '../utils/helpers'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { handleSaveAnsweredQs } from '../actions/questions'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleSaveAnsweredQuestion = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

    dispatch(handleSaveAnsweredQs({
      question
    }))
  }

  render() {
    const { question } = this.props
    if (question === null) return <p>This Question does not exist.</p>

    const { author, optionOne, optionTwo } = question

    const handleChange = e => {
      this.setState({ value: e.target.value });
    }

    return (
      <div className='question'>
        <h3>Would You Rather</h3>
        <img
          src={""}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <FormControl component="fieldset" className='questions-info-form-control'>
              <RadioGroup
                name="options"
                className="options"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value={optionOne.text} control={<Radio />} label={optionOne.text} />
                <FormControlLabel value={optionTwo.text} control={<Radio />} label={optionTwo.text} />
              </RadioGroup>
            </FormControl>
          </div>
          <div>`${getVotesNumForTheOption(question, 'optionOne')} (${getPercentageForTheOption(question, 'optionOne')}) has answered with ${optionOne.text}`</div>
          <div>`${getVotesNumForTheOption(question, 'optionTwo')} (${getPercentageForTheOption(question, 'optionTwo')}) has answered with ${optionTwo.text}`</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, question}) {
  return {
    authedUser,
    question: question,
  }
}

export default connect(mapStateToProps)(Question);
