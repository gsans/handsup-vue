import gql from 'graphql-tag'

// how to use fragments?

export const ListQuestions = gql`
query listQuestions {
  questions: listQuestions {
    items {
      id
      body
      flagged
      user {
        id username pictureUrl flagged 
      }
      votes {
        id
      }
      createdAt
      totalVotes
    }
  }
}`

export const AddQuestion = gql`
  mutation addQuestion($body: String!) {
    createQuestion(input: {
      body: $body,
      flagged: false
    }) {
      id
      body
      flagged
      user {
        id username pictureUrl flagged 
      }
      votes {
        id
      }
      createdAt
      totalVotes
    }
  }
`

export const AddVote = gql`
  mutation addVote($question: ID!) {
    createVote(input: {
      question: $question,
    }) {
      id
      question {
        id 
      }
    }
  }
`