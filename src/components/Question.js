import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVotesNumForTheOption,
          getPercentageForTheOption,
          getAuthedUserSelectedOption,
          checkIfAuthedUserAnsweredQs,
} from '../utils/helpers'
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
      value: '',
    }
  }

  componentDidMount = () => {
    const { question, authedUser } = this.props
    if (checkIfAuthedUserAnsweredQs(question, authedUser)) {
      this.setState({
        value: getAuthedUserSelectedOption(question, authedUser)
      })
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

  getQuestionUserInfo = (question, users) => {
    const authorId = question.author;
    return Object.keys(users).filter(key => key === authorId).map(key => users[key])[0];
  }

  render() {
    console.log(this.state.value)
    const { question, users, authedUser } = this.props
    const qsAuthorInfo = this.getQuestionUserInfo(question, users)

    if (!question) return <p>This Question does not exist.</p>

    const { optionOne, optionTwo, id } = question
    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={qsAuthorInfo.avatarURL}
          alt={`Avatar of ${qsAuthorInfo.name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <h6>Asked by {qsAuthorInfo.name}</h6>
            <h3>Would You Rather</h3>
            <FormControl component="fieldset" className='questions-info-form-control'>
              <RadioGroup
                name="options"
                className="options"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value={optionOne.text} control={<Radio/>} label={optionOne.text} />
                <FormControlLabel value={optionTwo.text} control={<Radio/>} label={optionTwo.text} />
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

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Question));
