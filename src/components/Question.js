import React, { Component } from 'react'
import { getVotesNumForTheOption, getPercentageForTheOption } from '../utils/helpers'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { handleSaveAnsweredQs } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleSaveAnsweredQuestion = (e) => {
    e.preventDefault()

    const { dispatch, question } = this.props
    this.props.history.push(`/question/${question.id}`)

    dispatch(handleSaveAnsweredQs({
      question
    }))
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { question } = this.props

    if (!question) return <p>This Question does not exist.</p>

    const { optionOne, optionTwo, id } = question
    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={""}
          alt={`Avatar of`}
          className='avatar'
        />
        <h3>Would You Rather</h3>
        <div className='question-info'>
          <div>
            <FormControl component="fieldset" className='questions-info-form-control'>
              <RadioGroup
                name="options"
                className="options"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value={question.optionOne.text} control={<Radio/>} label={question.optionOne.text}/>
                <FormControlLabel value={optionTwo.text} control={<Radio/>} label={optionTwo.text}/>
              </RadioGroup>
            </FormControl>
          </div>
          <div>{getVotesNumForTheOption(question, 'optionOne')} ({getPercentageForTheOption(question, 'optionOne')}%)
            has answered with "{optionOne.text}"
          </div>
          <div>{getVotesNumForTheOption(question, 'optionTwo')} ({getPercentageForTheOption(question, 'optionTwo')}%)
            has answered with "{optionTwo.text}"
          </div>
        </div>
      </Link>
    )
  }
}

export default withRouter(Question);
