import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_ANSWERED_QS = 'SAVE_ANSWERED_QS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function handleAddQuestion (text) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      text,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

function saveAnsweredQs ({ question }) {
  return {
    type: SAVE_ANSWERED_QS,
    question,
  }
}

export function handleSaveAnsweredQs (info) {
  return (dispatch) => {
    dispatch(saveAnsweredQs(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveAnsweredQs: ', e)
        dispatch(saveAnsweredQs(info))
        alert('There is an error saving the question you answered. Try again.')
      })
  }
}
