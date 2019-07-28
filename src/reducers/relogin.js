import { SET_RELOGIN } from "../actions/relogin"

export default function relogin(state = null, action) {
  switch (action.type) {
    case SET_RELOGIN:
      return action.relogin
    default:
      return state
  }
}
