import React from 'react'
import QuizForm from 'src/@core/components/QuizForm/QuizForm'
import { fetchSingleQuiz, fetchSubjectNames } from 'src/api'

const UpdateQuizPage = ({ quiz, subjectNames }) => {
  return <QuizForm updateQuiz={quiz} subjectNames={subjectNames} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '648c453b4b68461131a4dd3f' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps = async context => {
  const quiz = fetchSingleQuiz(context.params.id)
  const subjectNames = fetchSubjectNames()
  const promiseResolution = await Promise.all([quiz, subjectNames])

  return { props: { quiz: promiseResolution[0], subjectNames: promiseResolution[1] }, revalidate: 10 }
}

export default UpdateQuizPage
