const permissions = [
  {name: 'Course calendar', id: 'course_calendar'},
  {name: 'Teachers, course designers, and TAs', id: 'teachers_ca_ta'},
  {name: 'Students', id: 'students'},
  {name: 'Course State', id: 'course_state'},
  {name: 'Accessing Rubrics', id: 'rubrics'},
  {name: 'Create student collaborations', id: 'collaborations'},
  {name: 'Create web conferences', id: 'conferences'},
  {name: 'Edit grades', id: 'grades'},
  {name: 'LTI', id: 'lti'},
  {name: 'Assignments and quizzes', id: 'assgs_quizzes'},
  {name: 'Manage course files', id: 'course_files'}
]

const roles = [
  {name: 'Student', id: 'student'},
  {name: 'TA', id: 'ta'},
  {name: 'G-TA', id: 'gta'},
  {name: 'NG-TA', id: 'ngta'},
  {name: 'Teacher', id: 'teacher'},
  {name: 'DPT', id: 'dpt'}
]

export default {
  permissions,
  roles: roles.map(role => {
    role.permissions = permissions.reduce((perms, perm) => {
      perms[perm.id] = {
        create: Math.random() > 0.5,
        read: Math.random() > 0.5,
        update: Math.random() > 0.5,
        delete: Math.random() > 0.5
      }
      return perms
    }, {})
    return role
  })
}
