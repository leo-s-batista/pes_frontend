import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Solid icons (add more as needed)
import {
  faHome,
  faUser,
  faUsers,
  faPeopleGroup,
  faPlus,
  faArrowUpZA,
  faSearch,
  faXmark,
  faSave,
  faTrash,
  faCircleNotch,
  faEdit,
  faFilePdf,
  faFilter,
  faUsersGear
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHome,
  faUser,
  faUsers,
  faPeopleGroup,
  faPlus,
  faArrowUpZA,
  faSearch,
  faXmark,
  faSave,
  faTrash,
  faCircleNotch,
  faEdit,
  faFilePdf,
  faFilter,
  faUsersGear
)

Vue.component('font-awesome-icon', FontAwesomeIcon)



