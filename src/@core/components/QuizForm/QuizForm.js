// ** React Imports
import { Fragment, useState } from 'react'
import { addNewQuiz, editQuiz } from 'src/api'
import { toast } from 'react-toastify'

// ** MUI Imports
import { FormControlLabel, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Radio from '@mui/material/Radio'
import Delete from 'mdi-material-ui/Delete'
import Autocomplete from '@mui/material/Autocomplete'

import classes from './QuizForm.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const QuizForm = ({ subjectNames, updateQuiz = false }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [values, setValues] = useState({
    name: '',
    image: '',
    totalQuestions: 1,
    questions: []
  })

  const [questions, setQuestions] = useState([
    {
      question: 'Enter the question here...',
      image: null,
      score: null,
      tip: null,
      options: [
        { text: 'Option A', correct: true },
        { text: 'Option B', correct: false },
        { text: 'Option C', correct: false },
        { text: 'Option D', correct: false }
      ]
    }
  ])

  const [subjectForUpdate, setSubjectForUpdate] = useState(null)

  const deleteOptionHandler = (qIndex, opIndex) => {
    const copy = Object.create(questions)
    copy[qIndex].options.splice(opIndex, 1)
    setQuestions(copy)
  }

  const addQuestionHandler = () => {
    setQuestions(prevState => [
      ...prevState,
      {
        question: `Question #${questions.length + 1}`,
        image: null,
        options: [
          { text: 'Option A', correct: true },
          { text: 'Option B', correct: false },
          { text: 'Option C', correct: false },
          { text: 'Option D', correct: false }
        ]
      }
    ])
  }

  const formChangeHandler = event => {
    setValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
  }

  const deleteQuestionHandler = qIndex => {
    const copy = Object.create(questions)
    copy.splice(qIndex, 1)
    setQuestions(copy)
  }

  const questionChangeHandler = (value, qIndex, name) => {
    const copy = [...questions]
    copy[qIndex][name] = value
    setQuestions(copy)
  }

  const optionChangeHandler = (value, qIndex, opIndex) => {
    const copy = [...questions]
    copy[qIndex].options[opIndex].text = value
    setQuestions(copy)
  }

  const correctChangeHandler = (qIndex, opIndex) => {
    const copy = Object.create(questions)
    const optionsCopy = copy[qIndex].options.map(({ text }) => ({ text, correct: false }))
    optionsCopy[opIndex].correct = true
    copy[qIndex].options = optionsCopy
    setQuestions(copy)
  }

  const formSubmitHandler = async event => {
    event.preventDefault()

    // const quizData = { ...values, questions }
    const quizData = { ...values }

    let scores = 0
    questions.forEach(question => (scores += +question.score))

    quizData.totalQuestions = questions.length
    quizData.totalScores = scores

    try {
      setLoading(true)
      if (updateQuiz) await editQuiz(quizData, questions)
      else await addNewQuiz(quizData, questions)
      toast.success('Quiz has been added successfully!')

      router.push('/forms/update/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (updateQuiz) {
      setQuestions(updateQuiz.questions)
      const subject = subjectNames.find(subject => subject._id === updateQuiz.subject)
      setSubjectForUpdate(subject)
      setValues({ _id: updateQuiz._id, name: updateQuiz.name, image: updateQuiz.image, subject: updateQuiz.subject })
    }
  }, [])

  if (router.isFallback) {
    return <div>Loading</div>
  }

  return (
    <Card>
      <CardHeader title='Add Quiz' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form encType='multipart/form-data' onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='name'
                label='Quiz title'
                placeholder='Title'
                helperText='Please enter the title of the quiz'
                onChange={formChangeHandler}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                name='image'
                fullWidth
                type='file'
                label='Quiz Image'
                onChange={event => setValues(prevState => ({ ...prevState, image: event?.target?.files[0] || null }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              {(!updateQuiz || subjectForUpdate) && (
                <Autocomplete
                  required
                  name='subject'
                  options={subjectNames}
                  getOptionLabel={option => option.name}
                  label='Quiz Image'
                  renderInput={params => <TextField {...params} label='Select Subject' />}
                  onChange={(_, { _id }) => formChangeHandler({ target: { name: 'subject', value: _id } })}
                  defaultValue={subjectForUpdate}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <h2 variant='h2' component='h1'>
                Questions:{' '}
              </h2>
              {questions.map((question, qIndex) => (
                <Fragment key={question._id}>
                  <br />
                  <br />
                  <TextField
                    required
                    name='question'
                    defaultValue={question.question}
                    fullWidth
                    type='text'
                    label={`Question #${qIndex + 1}`}
                    onBlur={event => questionChangeHandler(event.target.value, qIndex, event.target.name)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          onClick={() => deleteQuestionHandler(qIndex)}
                          sx={{ cursor: 'pointer' }}
                          position='end'
                        >
                          <Delete />
                        </InputAdornment>
                      )
                    }}
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    name='score'
                    defaultValue={question.score}
                    fullWidth
                    type='number'
                    label={`Score #${qIndex + 1}`}
                    onBlur={event => questionChangeHandler(event.target.value, qIndex, event.target.name)}
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    name='tip'
                    defaultValue={question.score}
                    fullWidth
                    type='text'
                    label={`Tip #${qIndex + 1}`}
                    onBlur={event => questionChangeHandler(event.target.value, qIndex, event.target.name)}
                  />
                  <br />
                  <br />
                  <TextField
                    // required
                    name='image'
                    // defaultValue={question.image}
                    fullWidth
                    type='file'
                    label={`Image# ${qIndex + 1}`}
                    onBlur={event => questionChangeHandler(event?.target?.files[0] || null, qIndex, event.target.name)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <div className={classes.options}>
                    {question.options.map((option, index) => (
                      <Fragment key={index}>
                        <div className={classes.option}>
                          <TextField
                            required
                            name='image'
                            fullWidth
                            defaultValue={option.text}
                            type='text'
                            label={`Option #${index + 1}`}
                            onBlur={event => optionChangeHandler(event.target.value, qIndex, index)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  onClick={() => {
                                    deleteOptionHandler(qIndex, index)
                                  }}
                                  sx={{ cursor: 'pointer' }}
                                  position='end'
                                >
                                  <Delete />
                                </InputAdornment>
                              )
                            }}
                          />
                          <FormControlLabel
                            name={qIndex}
                            id={index}
                            value={option.text}
                            control={
                              <Radio
                                type='radio'
                                id={index}
                                name={qIndex}
                                value={index}
                                checked={option.correct}
                                onClick={() => correctChangeHandler(qIndex, index)}
                              />
                            }
                            label='Correct'
                          />
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </Fragment>
              ))}

              <Button onClick={addQuestionHandler} sx={{ marginTop: '1rem' }} type='button'>
                Add Question
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button disabled={loading} type='submit' variant='contained' size='large'>
                  Submit Form
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default QuizForm
