import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    text: '',
    toHome: false,
  }

  handleChange = e => {
    const text = e.target.value

    this.setState(() => ({ text }))
  }

  handleSubmit = e => {
    e.preventDefault()

    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { text, toHome } = this.state
    if (toHome) return <Redirect to='/homepage' />
    const questionLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose New Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <h2>Would you rather</h2>
          <textarea
            placeholder="What would you like to do?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {questionLeft <= 100 && (
            <div className='tweet-length'>
              {questionLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
