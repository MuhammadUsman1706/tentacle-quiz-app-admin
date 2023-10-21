import { Fragment } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { deleteUser, fetchUsersList } from 'src/api'
import { withIronSessionSsr } from 'iron-session/next'
import { toast } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    // backgroundColor: "#9155FD",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const UpdateUsersPage = ({ users }) => {
  const router = useRouter()

  const deleteUserHandler = async id => {
    try {
      await deleteUser(id)
      router.replace(router.asPath)
      toast.success('User successfully deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Fragment>
      {/* <div className='add-button'>
        <Button
          onClick={() => router.push(`/forms/add-user`)}
          sx={{ color: 'white !important' }}
          variant='contained'
        >
          Add User
        </Button>
      </div> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align='center'>User Email</StyledTableCell>
              <StyledTableCell align='center'>User Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <StyledTableRow key={user._id}>
                <StyledTableCell align='left'>{user.username}</StyledTableCell>
                <StyledTableCell align='center'>{user.email}</StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='actions'>
                    <Button
                      onClick={() => router.push(`/forms/user-profile/${user._id}`)}
                      sx={{ color: 'white !important' }}
                      variant='contained'
                    >
                      View
                    </Button>
                    {/* <Button
                      onClick={() => deleteUserHandler(user._id)}
                      sx={{ backgroundColor: 'red', color: 'white !important' }}
                      variant='contained'
                    >
                      Delete
                    </Button> */}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const users = await fetchUsersList()

  // return { props: { users }, revalidate: 10 }
  return { props: { users } }
}

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     const user = req.session.user
//     console.log(user)

//     const users = await fetchUsersList()

//     return { props: { users } }
//   },
//   {
//     cookieName: 'Authentication',
//     password: 'abcd1234abcd1234abcd1234abcd1234',
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     cookieOptions: {
//       secure: false
//     }
//   }
// )

export default UpdateUsersPage
