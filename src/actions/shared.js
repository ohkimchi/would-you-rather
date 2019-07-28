import { getInitialData } from "../utils/api"
import { getUsers } from "../actions/users"
import { getQuestions } from "../actions/questions"
import { setAuthedUser } from "../actions/authedUser"
import { setRelogin } from "../actions/relogin"
import { showLoading, hideLoading } from "react-redux-loading"

const AUTHED_ID = ""
const RELOGIN = true

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users))
      dispatch(getQuestions(questions))
      dispatch(setAuthedUser(AUTHED_ID))
      dispatch(setRelogin(RELOGIN))
      dispatch(hideLoading())
    })
  }
}
