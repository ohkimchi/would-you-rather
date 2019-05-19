import { GET_QUESTIONS, SAVE_ANSWERED_QS, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case GET_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case SAVE_ANSWERED_QS :
      const { users, questions } = state
      const { authedUser, qid, answer } = action
      return {
        ...state,
        questions: {
          ...questions,
          [qid]: {
            ...action.questions[qid],
            [answer]: {
              ...action.questions[qid][answer],
              votes: action.questions[qid][answer].votes.concat([authedUser]),
            },
          },
        },
        users: {
          ...users,
          [authedUser]: {
            ...action.users[authedUser],
            answers: {
              ...action.users[authedUser].answers,
              [qid]: answer,
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
