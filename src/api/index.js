export const baseUrl = 'https://staging.tentaclequiz.com/api'
// export const baseUrl = 'http://localhost:3001/api'
// export const baseUrl = 'http://192.168.18.7:3001/api'

export const getPostHeaders = (body, contentType) => {
  return {
    method: 'POST',
    body: JSON.stringify(body),
    headers: contentType && {
      'Content-Type': contentType
    }
  }
}

export const addNewSubject = async (name, colorCode, image) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('color', colorCode)
  formData.append('image', image)

  const response = await fetch(`${baseUrl}/subject/add-subject`, {
    method: 'POST',
    body: formData
  })
  if (response.ok) return true
  else {
    const responseData = await response.json()
    throw new Error(responseData.error)
  }
}

export const fetchSubjectNames = async () => {
  const response = await fetch(`${baseUrl}/subject/`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const addNewQuiz = async (body, questions) => {
  const formData = new FormData()
  formData.append('quiz', JSON.stringify(body))
  formData.append('image', body.image)
  // const images = body.questions.map(question => question.image || null)

  // temp
  const images = []
  questions.forEach(question => {
    formData.append('questions', JSON.stringify(question))
    question.image ? images.push(question.image) : images.push(null)
  })
  // temp

  images.forEach((image, index) => formData.append(index, image))

  const response = await fetch(`${baseUrl}/quiz/add-quiz`, {
    method: 'POST',
    body: formData
  })
  if (response.ok) return true
  else {
    const responseData = await response.json()
    throw new Error(responseData.error)
  }
}

export const fetchQuizzes = async () => {
  const response = await fetch(`${baseUrl}/quiz/`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const fetchSingleQuiz = async id => {
  const response = await fetch(`${baseUrl}/quiz/quiz-by-id/${id}`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const editQuiz = async (body, questions) => {
  const formData = new FormData()
  formData.append('quiz', JSON.stringify(body))
  formData.append('image', body.image)
  // const images = body.questions.map(question => question.image || null)

  // new
  const images = []
  questions.forEach(question => {
    formData.append('questions', JSON.stringify(question))
    question.image ? images.push(question.image) : images.push(null)
  })
  // new

  images.forEach((image, index) => formData.append(index, image))

  const response = await fetch(`${baseUrl}/quiz/edit-quiz`, {
    method: 'POST',
    body: formData
  })
  if (response.ok) return true
  else {
    const responseData = await response.json()
    throw new Error(responseData.error)
  }
}

export const editSubject = async (name, colorCode, subjectId, image) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('color', colorCode)
  formData.append('image', image)
  formData.append('subjectId', subjectId)

  const response = await fetch(`${baseUrl}/subject/edit-subject`, {
    method: 'POST',
    body: formData
  })
  if (response.ok) return true
  else {
    const responseData = await response.json()
    throw new Error(responseData.error)
  }
}

export const fetchSingleSubject = async id => {
  const response = await fetch(`${baseUrl}/subject/subject-by-id/${id}`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const addNewAdmin = async (name, email, password) => {
  const body = {
    name,
    email,
    password
  }

  const response = await fetch(`${baseUrl}/admin/admin-sign-up`, getPostHeaders(body, 'application/json'))

  if (response.ok) {
    return true
  }

  const responseData = await response.json()
  throw new Error(responseData.error)
}

export const loginAdmin = async (email, password) => {
  const body = {
    email,
    password
  }

  const response = await fetch(`${baseUrl}/admin/admin-sign-in`, getPostHeaders(body, 'application/json'))
  // const response = await fetch(`api/login`, getPostHeaders(body, 'application/json'))
  const responseData = await response.json()

  if (response.ok) return responseData

  throw new Error(responseData.error)
}

export const deleteQuiz = async quizId => {
  const body = { quizId }

  const response = await fetch(`${baseUrl}/quiz/delete-quiz`, getPostHeaders(body, 'application/json'))
  const responseData = await response.json()

  if (response.ok) return responseData

  throw new Error(responseData.error)
}

export const deleteSubject = async subjectId => {
  const body = { subjectId }

  const response = await fetch(`${baseUrl}/subject/delete-subject`, getPostHeaders(body, 'application/json'))
  const responseData = await response.json()

  if (response.ok) return responseData

  throw new Error(responseData.error)
}

export const fetchAdminList = async () => {
  const response = await fetch(`${baseUrl}/admin/`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const fetchAdminById = async id => {
  const response = await fetch(`${baseUrl}/admin/admin-by-id/${id}`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const editAdmin = async body => {
  const response = await fetch(`${baseUrl}/admin/edit-admin`, getPostHeaders(body, 'application/json'))
  if (response.ok) return true
  else {
    const responseData = await response.json()
    throw new Error(responseData.error)
  }
}

export const deleteAdmin = async adminId => {
  const body = { adminId }

  const response = await fetch(`${baseUrl}/admin/delete-admin`, getPostHeaders(body, 'application/json'))
  const responseData = await response.json()

  if (response.ok) return responseData

  throw new Error(responseData.error)
}

export const fetchUsersList = async () => {
  const response = await fetch(`${baseUrl}/admin/all-users`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}

export const deleteUser = async userId => {
  const body = { userId }

  const response = await fetch(`${baseUrl}/admin/delete-user`, getPostHeaders(body, 'application/json'))

  if (response.ok) return true

  const responseData = await response.json()
  throw new Error(responseData.error)
}

export const fetchUserProfile = async id => {
  const response = await fetch(`${baseUrl}/admin/user-profile/${id}`)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  }

  throw new Error(responseData.error)
}
