import QuizForm from 'src/@core/components/QuizForm/QuizForm'

import { fetchSubjectNames } from 'src/api'

const AddQuizPage = ({ subjectNames }) => {
  return <QuizForm subjectNames={subjectNames} />
}

export const getStaticProps = async () => {
  const subjectNames = await fetchSubjectNames()

  return { props: { subjectNames }, revalidate: 10 }
}

export default AddQuizPage
