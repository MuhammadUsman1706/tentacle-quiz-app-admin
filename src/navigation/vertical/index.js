// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import List from 'mdi-material-ui/Segment'
import User from 'mdi-material-ui/Account'
import Subject from 'mdi-material-ui/BookPlus'
import Quiz from 'mdi-material-ui/ChatPlus'
import { logoutAdminAction } from 'src/redux/auth-actions'
// import Subject from '@mui/icons-material/BookmarkAdd'
// import Quiz from '@mui/icons-material/PostAdd'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Forms'
    },
    // {
    //   title: 'Add Subject',
    //   icon: Subject,
    //   path: '/forms/add-subject',
    //   openInNewTab: false
    // },
    {
      title: 'Subject List',
      icon: List,
      path: '/forms/update-subject',
      openInNewTab: false
    },
    // {
    //   title: 'Add Quiz',
    //   icon: Quiz,
    //   path: '/forms/add-quiz',
    //   openInNewTab: false
    // },
    {
      title: 'Quiz List',
      icon: List,
      path: '/forms/update',
      openInNewTab: false
    },
    // {
    //   title: 'Add Admin User',
    //   icon: User,
    //   path: '/forms/add-admin',
    //   openInNewTab: false
    // },
    {
      title: 'Admin User List',
      icon: List,
      path: '/forms/update-admin',
      openInNewTab: false
    },
    {
      title: 'User List',
      icon: List,
      path: '/forms/update-user',
      openInNewTab: false
    },
    {
      sectionTitle: 'Actions'
    },
    {
      title: 'Logout',
      icon: Login,
      path: '/',
      openInNewTab: false
    }
  ]
}

export default navigation
