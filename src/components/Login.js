import React, { Component } from "react"
import { connect } from "react-redux"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { bindActionCreators } from "redux"
import * as AuthedUserActions from "../actions/authedUser.js"

class Login extends Component {
  state = {
    userid: "",
  }

  handleChange = e => {
    const target = e.target.value
    this.props.setAuthedUser(target)
    this.setState({
      userid: target,
    })
  }

  render() {
    const { users } = this.props
    return (
      <form className="login" autoComplete="off">
        <FormControl className="formControl">
          <InputLabel htmlFor="age-simple">User</InputLabel>
          <Select
            value={this.state.userid}
            onChange={this.handleChange}
            inputProps={{
              name: "userid",
            }}
          >
            {Object.keys(users).map(id => (
              <MenuItem value={id} key={id}>
                {users[id].name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.users }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthedUserActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
