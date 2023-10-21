import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { baseUrl, deleteQuiz, fetchQuizzes } from 'src/api'
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

const UpdateQuizPage = ({ quizzes }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deleteQuizHandler = async id => {
    try {
      setLoading(true)
      await deleteQuiz(id)
      router.replace(router.asPath)
      toast.success('Quiz successfully deleted')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <Fragment>
      <div className='add-button'>
        <Button onClick={() => router.push(`/forms/add-quiz`)} sx={{ color: 'white !important' }} variant='contained'>
          Add Quiz
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Quiz Image</StyledTableCell>
              <StyledTableCell align='center'>Quiz Name</StyledTableCell>
              <StyledTableCell align='center'>Quiz Subject</StyledTableCell>
              <StyledTableCell align='center'>Quiz Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map(quiz => (
              <StyledTableRow key={quiz._id}>
                <StyledTableCell component='th' scope='row'>
                  <img width='200' style={{ borderRadius: '20px' }} src={`${baseUrl}/${quiz.image}`} alt={quiz.name} />
                </StyledTableCell>
                <StyledTableCell align='center'>{quiz.name}</StyledTableCell>
                <StyledTableCell align='center'>{quiz?.subject?.name}</StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='actions'>
                    <Button
                      onClick={() => router.push(`/forms/update/${quiz._id}`)}
                      sx={{ color: 'white !important' }}
                      variant='contained'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteQuizHandler(quiz._id)}
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
  const quizzes = await fetchQuizzes()

  // return { props: { quizzes }, revalidate: 10 }
  return { props: { quizzes } }
}

export default UpdateQuizPage
