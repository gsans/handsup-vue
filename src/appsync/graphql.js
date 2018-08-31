import gql from 'graphql-tag'

// how to use fragments?

/*
      user {
        id username pictureUrl flagged 
      }
      */

export const ListQuestions = gql`
query listQuestions {
  questions: listQuestions {
    items {
      id
      body
      flagged
      votes {
        id
      }
      createdAt
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
      votes {
        id
      }
      createdAt
    }
  }
`

export const AddVote = gql`
  mutation addVote($question: ID!) {
    createVote(input: {
      question: $question,
    }) {
      id
      questionId
    }
  }
`