import { saveQuestionAnswer } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_ANSWERED_QS = 'SAVE_ANSWERED_QS'

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
