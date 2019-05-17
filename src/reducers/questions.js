import { GET_QUESTIONS, SAVE_ANSWERED_QS, ADD_QUESTION } from '../actions/questions'

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
        users: {
          ...action.users,
          [action.authedUser]: {
            ...action.users[action.authedUser],
            answers: {
              ...action.users[action.authedUser].answers,
              [action.qid]: action.answer,
            },
          },
        },
        questions: {
          ...action.questions,
          [action.qid]: {
            ...action.questions[action.qid],
            [action.answer]: {
              ...action.questions[action.qid][action.answer],
              votes: action.questions[action.qid][action.answer].votes.concat([action.authedUser]),
            },
          },
        },
      }
    case ADD_QUESTION :
      const { question } = action
      return {
        ...state,
        [action.question.id]: action.question,
      }
    // case SAVE_QUESTION :
    //   return {
    //
    //   }
    default :
      return state
  }
}
