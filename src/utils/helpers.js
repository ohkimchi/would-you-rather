export function getVotesNumForTheOption(question, optionNameString) {
  return question[optionNameString].votes.length
}

export function getPercentageForTheOption(question, optionNameString) {
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  return question[optionNameString].votes.length / totalVotes * 100
}
