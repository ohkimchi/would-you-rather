import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVotesNumForTheOption,
          getPercentageForTheOption,
          getAuthedUserSelectedOption,
          checkIfAuthedUserAnsweredQs,
          getOptionNameFromOptionText,
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
    // for unknown reason, everytime the questions and users are injected into the this.props.questions
    const { dispatch, questions, users, question, authedUser } = this.props
    const qid = question.id
    const answer = getOptionNameFromOptionText(e.target.value, question)
    dispatch(handleSaveAnsweredQs({
      questions,
      users,
      qid,
      answer,
      authedUser,
    }))
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  getQuestionUserInfo = (question, users) => {
    const authorId = question.author;
    return Object.keys(users).filter(key => key === authorId).map(key => users[key])[0];
  }

  render() {
    const { question, users, authedUser } = this.props
    const qsAuthorInfo = this.getQuestionUserInfo(question, users)

    if (!question) return <p>This Question does not exist.</p>

    const { optionOne, optionTwo, id } = question
    return (
      <div className='question'>
        <img
          src={qsAuthorInfo.avatarURL}
          alt={`Avatar of ${qsAuthorInfo.name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <h6>Asked by {qsAuthorInfo.name}</h6>
            <Link to={`/question/${id}`}>
              <h3>Would You Rather</h3>
            </Link>
            <FormControl component="fieldset" className='questions-info-form-control'>
              <RadioGroup
                name="options"
                className="options"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value={optionOne.text}
                                  control={<Radio/>}
                                  label={optionOne.text}
                                  onClick={this.handleSaveAnsweredQuestion} />
                <FormControlLabel value={optionTwo.text}
                                  control={<Radio/>}
                                  label={optionTwo.text}
                                  onClick={this.handleSaveAnsweredQuestion} />
              </RadioGroup>
            </FormControl>
          </div>
          <div>{getVotesNumForTheOption(question, 'optionOne')} ({getPercentageForTheOption(question, 'optionOne')}% of answerers)
            answered with <i><b>{optionOne.text}</b></i>
          </div>
          <div>{getVotesNumForTheOption(question, 'optionTwo')} ({getPercentageForTheOption(question, 'optionTwo')}% of answerers)
            answered with <i><b>{optionTwo.text}</b></i>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(Question));
