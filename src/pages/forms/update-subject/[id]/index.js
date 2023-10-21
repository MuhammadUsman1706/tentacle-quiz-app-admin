import React from 'react'
import SubjectForm from 'src/@core/components/SubjectForm/SubjectForm'
import { fetchSingleSubject } from 'src/api'

const AddSubjectPage = ({ subject }) => {
  return <SubjectForm updateSubject={subject} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '648c453b4b68461131a4dd3f' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps = async context => {
  const subject = await fetchSingleSubject(context.params.id)

  return { props: { subject }, revalidate: 10 }
}

export default AddSubjectPage
