import React from 'react'
import UserProfile from 'src/@core/components/UserProfile/UserProfile'
import { fetchUserProfile } from 'src/api'

const UserProfilePage = ({ profile }) => {
  return <UserProfile profile={profile} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '6492ebabbf74a6455565a43e' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps = async context => {
  const profile = await fetchUserProfile(context.params.id)

  return { props: { profile }, revalidate: 10 }
}

export default UserProfilePage
