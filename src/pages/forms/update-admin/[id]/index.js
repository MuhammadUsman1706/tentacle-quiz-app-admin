import React from 'react'
import AdminForm from 'src/@core/components/AdminForm/AdminForm'
import { fetchAdminById } from 'src/api'

const AddAdminPage = ({ admin }) => {
  return <AdminForm updateAdmin={admin} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '6492c896736468960c9a112c' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps = async context => {
  const admin = await fetchAdminById(context.params.id)

  return { props: { admin }, revalidate: 10 }
}

export default AddAdminPage
