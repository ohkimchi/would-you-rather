import { GET_QUESTIONS, SAVE_ANSWERED_QS } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case GET_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case SAVE_ANSWERED_QS :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.add(action.question)
        }
      }
    default :
      return state
  }
}
