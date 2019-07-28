import React from "react"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { getAnsweredQs, getUnansweredQs } from "../utils/helpers"
import Question from "./Question"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.questions.map(q => (
        <Question key={q.id} question={q} />
      ))}
    </Typography>
  )
}

class Homepage extends React.Component {
  state = {
    value: 0,
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { questions, authedUser } = this.props

    return (
      <div className="question_list">
        <AppBar position="static">
          <Tabs value={this.state.value}>
            <Tab label="Answered" onClick={() => this.handleChange(0)} />
            <Tab label="Unanswered" onClick={() => this.handleChange(1)} />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && (
          <TabContainer
            key="answered-list"
            questions={getAnsweredQs(questions, authedUser)}
          >
            Answered
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer
            key="unanswered-list"
            questions={getUnansweredQs(questions, authedUser)}
          >
            Unanswered
          </TabContainer>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    authedUser: state.authedUser,
  }
}

export default connect(mapStateToProps)(Homepage)
