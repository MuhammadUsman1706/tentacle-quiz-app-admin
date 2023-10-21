import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import classes from './UserProfile.module.css'
import { Fragment } from 'react'

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

const UserProfile = ({ profile }) => {
  return (
    <div className={classes['main-container']}>
      <div className={classes['profile-container']}>
        <div className={classes['profile-info']}>
          <div className={classes['profile-img']}>
            <img src='../../../../panel/images/misc/user.png' alt='usr profile' />
          </div>
          <div className={classes['profile-name']}>
            <span className={classes.userName}>{profile?.email}</span>
            <span className={classes.quizzesTaken}>{profile?.playedQuizzes?.length} Quizzes taken</span>
          </div>
        </div>
        <div className={classes['badges-section']}>
          <div className={classes.userBadges}>
            <div className={classes.rankBadges}>
              <div className={classes['badgeInfo-Div']}>
                <div className={classes.rankIcon}>
                  <img src='../../../../panel/images/misc/streak-icon.svg' alt='rank icon' />
                </div>
                <div className={classes.rankText}>
                  <span className={classes.overallRank}>Total Points</span>
                  <span className={classes.rankValue}>{profile?.totalScores}</span>
                </div>
              </div>
            </div>
            <div className={classes.scoreBadges}>
              <div className={classes['badgeInfo-Div']}>
                <div className={classes.rankIcon}>
                  <img src='../../../../panel/images/misc/point-icon.svg' alt='rank icon' />
                </div>
                <div className={classes.rankText}>
                  <span className={classes.overallRank}>Average Score</span>
                  <span className={classes.rankValue}>{profile?.averagePercentage?.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            <div className={classes.daysBadges}>
              <div className={classes['badgeInfo-Div']}>
                <div className={classes.rankIcon}>
                  <img src='../../../../panel/images/misc/icon-days-in-a-row.svg' alt='rank icon' />
                </div>
                <div className={classes.rankText}>
                  <span className={classes.overallRank}>Total Quizzes Played</span>
                  <span className={classes.rankValue}>{profile?.playedQuizzes?.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {profile.playedQuizzes.length > 0 ? (
        <Fragment>
          <h1>Quizzes</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Subject</StyledTableCell>
                  <StyledTableCell align='center'>Quiz</StyledTableCell>
                  <StyledTableCell align='center'>Points</StyledTableCell>
                  <StyledTableCell align='center'>Percentage</StyledTableCell>
                  <StyledTableCell align='center'>Correct Answers</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profile.playedQuizzes.map(quiz => (
                  <StyledTableRow key={quiz?.quizDetails?._id}>
                    <StyledTableCell align='left'>{quiz?.quizDetails?.subject?.name}</StyledTableCell>
                    <StyledTableCell align='center'>{quiz?.quizDetails?.name}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {quiz.score} / {quiz?.quizDetails?.totalScores}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{quiz?.percentage?.toFixed(2)}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {quiz.correctAnswers} / {quiz?.quizDetails?.totalQuestions}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <h1 style={{ textAlign: 'center' }}>No Quizzes to Show :(</h1>
      )}
    </div>
  )
}

export default UserProfile
