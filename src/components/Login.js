import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    userid: ''
  }

  handleChange = e => {
    const target = e.target.value
    if (target !== 'Logout') {
      this.props.dispatch(setAuthedUser(target))
    }
    this.setState({
      userid: target
    })
  }

  render() {
    const { users } = this.props;
    if (this.state.userid === 'Logout') {
      return (
        <div>404</div>
      )
    } else {
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
              {Object.keys(users).map(id => <MenuItem value={id}>{users[id].name}</MenuItem>)}
              <MenuItem value={'Logout'}>Log out</MenuItem>
            </Select>
          </FormControl>
        </form>
    )
  }

  }

}

function mapStateToProps ({ users }) {
  return { users }
}

export default connect(mapStateToProps)(Login)
