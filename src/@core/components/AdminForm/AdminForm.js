// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { addNewAdmin, editAdmin } from 'src/api'
import { toast } from 'react-toastify'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const AdminForm = ({ updateAdmin = false }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const formChangeHandler = event => setValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }))

  const formSubmitHandler = async event => {
    event.preventDefault()
    try {
      setLoading(true)
      if (updateAdmin) await editAdmin(values)
      else await addNewAdmin(values.name, values.email, values.password)
      toast.success(`${values.name} has been ${updateAdmin ? 'edited' : 'added'} successfully!`)

      router.push('/forms/update-admin/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (updateAdmin) setValues({ id: updateAdmin._id, name: updateAdmin.name, email: updateAdmin.email })
  }, [])

  if (router.isFallback) {
    return <div>Loading</div>
  }

  return (
    <Card>
      <CardHeader title={`${updateAdmin ? 'Edit' : 'Add'} User`} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='name'
                label='User Name'
                placeholder='John'
                helperText='Please enter the name of the admin user'
                onChange={formChangeHandler}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name='email'
                fullWidth
                type='email'
                label='Email'
                helperText='Please enter the email of the admin user'
                placeholder='john@example.com'
                onChange={formChangeHandler}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                fullWidth
                type='password'
                label='Password'
                onChange={formChangeHandler}
                value={values.password}
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

export default AdminForm
