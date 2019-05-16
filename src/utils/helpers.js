export function getVotesNumForTheOption(question, optionNameString) {
  return question[optionNameString].votes.length
}

export function getPercentageForTheOption(question, optionNameString) {
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  return question[optionNameString].votes.length / totalVotes * 100
}

export function getAnsweredQs(questions) {
  return Object.keys(questions)
    .filter((qs) => questions[qs].optionOne.votes.length !== 0 || questions[qs].optionTwo.votes.length !== 0)
    .map(key => questions[key])
}

export function getUnansweredQs(questions) {
  return Object.keys(questions)
    .filter((qs) => questions[qs].optionOne.votes.length === 0 && questions[qs].optionTwo.votes.length === 0)
    .map(key => questions[key])
}

export function getAuthedUserSelectedOption(question, authedUser) {
  const votesForOptionOne = question.optionOne.votes;
  if (votesForOptionOne.length > 0) {
    let id;
    for (id in votesForOptionOne) {
      if (id === authedUser) return 'OptionOne';
    }
  }

  const votesForOptionTwo = question.optionTwo.votes;
  if (votesForOptionTwo.length > 0) {
    let id;
    for (id in votesForOptionTwo) {
      if (id === authedUser) return 'OptionTwo';
    }
  }

  return null;
}
