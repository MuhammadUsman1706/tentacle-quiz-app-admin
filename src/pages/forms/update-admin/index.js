import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { deleteAdmin, deleteQuiz, fetchAdminList } from 'src/api'
import { toast } from 'react-toastify'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import classes from './index.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const UpdateQuizPage = ({ admins }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const token = useSelector(state => state?.auth?.token)

  const deleteAdminHandler = async id => {
    try {
      setLoading(true)
      await deleteAdmin(id)
      router.replace(router.asPath)
      toast.success('Admin successfully deleted')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <Fragment>
      <div className='add-button'>
        <Button onClick={() => router.push(`/forms/add-admin`)} sx={{ color: 'white !important' }} variant='contained'>
          Add Admin
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Admin Name</StyledTableCell>
              <StyledTableCell align='center'>Admin Email</StyledTableCell>
              <StyledTableCell align='center'>Admin Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map(admin => (
              <StyledTableRow key={admin._id}>
                <StyledTableCell align='center'>{admin.name}</StyledTableCell>
                <StyledTableCell align='center'>{admin.email}</StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='actions'>
                    <Button
                      onClick={() => router.push(`/forms/update-admin/${admin._id}`)}
                      sx={{ color: 'white !important' }}
                      variant='contained'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteAdminHandler(admin._id)}
                      sx={{ backgroundColor: 'red', color: 'white !important' }}
                      variant='contained'
                      disabled={loading}
                    >
                      Delete
                    </Button>
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
  const admins = await fetchAdminList()

  // return { props: { admins }, revalidate: 10 }
  return { props: { admins } }
}

export default UpdateQuizPage
