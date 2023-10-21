// ** React Imports
import { useState } from 'react'
import { addNewSubject, editSubject } from 'src/api'
import { toast } from 'react-toastify'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SubjectForm = ({ updateSubject = false }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    name: '',
    color: ''
  })

  const formChangeHandler = event => {
    setValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    try {
      setLoading(true)
      if (updateSubject) await editSubject(values.name, values.color, values._id, values.image)
      else await addNewSubject(values.name, values.color, values.image)
      toast.success(`${values.name} has been added successfully!`)

      router.push('/forms/update-subject/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (updateSubject) setValues(updateSubject)
  }, [])

  return (
    <Card>
      <CardHeader title={`${updateSubject ? 'Edit' : 'Add'} Subject`} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form encType='multipart/form-data' onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='name'
                label='Subject Name'
                placeholder='Entertainment'
                helperText='Please enter the name of the subject'
                onChange={formChangeHandler}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='color'
                fullWidth
                type='color'
                label='Color Theme'
                placeholder='#fff'
                onChange={formChangeHandler}
                value={values.color}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='image'
                fullWidth
                type='file'
                label='Subject Image'
                onChange={event => setValues(prevState => ({ ...prevState, image: event?.target?.files[0] || null }))}
                InputLabelProps={{ shrink: true }}
              />
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

export default SubjectForm
