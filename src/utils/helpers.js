export function getVotesNumForTheOption(question, optionNameString) {
  return question[optionNameString].votes.length
}

export function getPercentageForTheOption(question, optionNameString) {
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  return question[optionNameString].votes.length / totalVotes * 100
}

export function getAnsweredQs(questions, authedUser) {
  return Object.keys(questions)
    .filter((qs) => checkIfAuthedUserAnsweredQs(questions[qs], authedUser))
    .map(key => questions[key])
}

export function getUnansweredQs(questions, authedUser) {
  return Object.keys(questions)
    .filter((qs) => !checkIfAuthedUserAnsweredQs(questions[qs], authedUser))
    .map(key => questions[key])
}

export function checkIfAuthedUserAnsweredQs(question, authedUser) {
  const votesForOptionOne = question.optionOne.votes;
  if (votesForOptionOne.length > 0) {
    for (let i = 0, len = votesForOptionOne.length; i < len; i++) {
      if (votesForOptionOne[i] === authedUser) return true;
    }
  }

  const votesForOptionTwo = question.optionTwo.votes;
  if (votesForOptionTwo.length > 0) {
    for (let i = 0, len = votesForOptionTwo; i < len; i++) {
      if (votesForOptionTwo[i] === authedUser) return true;
    }
  }

  return false;
}

export function getAuthedUserSelectedOption(question, authedUser) {
  const votesForOptionOne = question.optionOne.votes;
  if (votesForOptionOne.length > 0) {
    for (let i = 0, len = votesForOptionOne.length; i < len; i++) {
      if (votesForOptionOne[i] === authedUser) return question.optionOne.text;
    }
  }

  const votesForOptionTwo = question.optionTwo.votes;
  if (votesForOptionTwo.length > 0) {
    for (let i = 0, len = votesForOptionTwo; i < len; i++) {
      if (votesForOptionTwo[i] === authedUser) return question.optionTwo.text;
    }
  }
}
