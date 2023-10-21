import { Fragment } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { deleteSubject, fetchSubjectNames, baseUrl } from 'src/api'
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
import { useState } from 'react'

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

const UpdateSubjectPage = ({ subjects }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deleteSubjectHandler = async id => {
    try {
      setLoading(true)
      await deleteSubject(id)
      router.replace(router.asPath)
      // subjects.filter(subject => subject._id.toString() !== id.toString())
      toast.success('Subject successfully deleted')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <Fragment>
      <div className='add-button'>
        <Button
          onClick={() => router.push(`/forms/add-subject`)}
          sx={{ color: 'white !important' }}
          variant='contained'
        >
          Add Subject
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject Image</StyledTableCell>
              <StyledTableCell align='center'>Subject Name</StyledTableCell>
              <StyledTableCell align='center'>Subject Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map(subject => (
              <StyledTableRow key={subject._id}>
                <StyledTableCell component='th' scope='row'>
                  <img width='200' src={`${baseUrl}/${subject.image}`} alt={subject.name} />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <span style={{ color: subject.color }}>{subject.name}</span>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='actions'>
                    <Button
                      onClick={() => router.push(`/forms/update-subject/${subject._id}`)}
                      sx={{ color: 'white !important' }}
                      variant='contained'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteSubjectHandler(subject._id)}
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
  const subjects = await fetchSubjectNames()

  // return { props: { subjects }, revalidate: 10 }
  return { props: { subjects } }
}

export default UpdateSubjectPage
