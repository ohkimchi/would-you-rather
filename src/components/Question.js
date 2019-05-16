import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getVotesNumForTheOption, getPercentageForTheOption } from '../utils/helpers'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  render() {
    const { question } = this.props
    if (question === null) return <p>This Question does not exist.</p>
    const { author, optionOne, optionTwo } = question
    handleChange = e => {
      this.setState({ value: e.target.value });
    }

    return (
      <div className='question'>
        <h3>Would You Rather</h3>
        <img
          src={avatar}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
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
          <div><span>{`${getVotesNumForTheOption(question, 'optionOne')} (${getPercentageForTheOption(question, 'optionOne')}) has answered with ${optionOne.text}`</span></div>
          <div><span>{`${getVotesNumForTheOption(question, 'optionTwo')} (${getPercentageForTheOption(question, 'optionTwo')}) has answered with ${optionTwo.text}`</span></div>
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

Question.propTypes = {
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Question);
