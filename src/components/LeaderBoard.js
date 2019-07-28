import React, { Component } from "react"
import { connect } from "react-redux"
import ReactTable from "react-table"
import "react-table/react-table.css"

class LeaderBoard extends Component {
  render() {
    const data = this.props.users
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Total No. of qs asked or answered",
        id: d => "total_" + d.id,
        accessor: d =>
          (
            (d.questions.length ? d.questions.length : 0) +
            (d.answers.length ? d.answers.length : 0)
          ).toString(),
      },
      {
        Header: "No. of qs asked",
        id: d => "asked_" + d.id,
        accessor: d =>
          d.questions.length ? d.questions.length.toString() : "0",
      },
      {
        Header: "No. of qs answered",
        id: d => "answered_" + d.id,
        accessor: d => (d.answers.length ? d.answers.length.toString() : "0"),
      },
    ]

    return (
      <div>
        <h3>Results</h3>
        <ReactTable data={data} columns={columns} />
      </div>
    )
  }
}

function getNumberOfQsAndAns(user) {
  return (
    (user.answers ? user.answers.length : 0) +
    (user.questions ? user.questions.length : 0)
  )
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
      .sort(
        (a, b) => getNumberOfQsAndAns(users[a]) - getNumberOfQsAndAns(users[b])
      )
      .map(key => users[key]),
  }
}

export default connect(mapStateToProps)(LeaderBoard)
