import React, { Component } from "react"
import { connect } from "react-redux"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { setAuthedUser } from "../actions/authedUser"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
        }
    }

  handleChange = e => {
      const target = e.target.value
      this.props.dispatch(setAuthedUser(target))
      this.setState({
          userid: target,
      })
  };

  render() {
      const { users, relogin } = this.props
      console.log("initialize", relogin)
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
                      {Object.keys(users).map(id => <MenuItem value={id} key={id}>{users[id].name}</MenuItem>)}
                  </Select>
              </FormControl>
          </form>
      )
  }
}

function mapStateToProps ({ users }) {
    return { users }
}

export default connect(mapStateToProps)(Login)
