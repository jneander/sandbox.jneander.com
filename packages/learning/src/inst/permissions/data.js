function createRandomPermissions() {
  return {
    create: Math.random() > 0.5,
    delete: Math.random() > 0.5,
    read: Math.random() > 0.5,
    update: Math.random() > 0.5
  }
}

export const accountPermissionGroups = [
  {
    groupName: 'Account Permissions',
    groupPermissions: [
      {
        label: 'Act as users',
        permissionName: 'become_user'
      },
      {
        label: 'Add/remove other admins for the account',
        permissionName: 'manage_account_memberships'
      },
      {
        label: 'Import SIS data',
        permissionName: 'import_sis'
      },
      {
        label: 'Manage ( add / edit / delete ) courses',
        permissionName: 'manage_courses'
      },
      {
        label: 'Manage SIS data',
        permissionName: 'manage_sis'
      },
      {
        label: 'Manage account-level settings',
        permissionName: 'manage_account_settings'
      },
      {
        label: 'Manage developer keys',
        permissionName: 'manage_developer_keys'
      },
      {
        label: 'Manage global announcements',
        permissionName: 'manage_alerts'
      },
      {
        label: 'Manage observers for users',
        permissionName: 'manage_user_observers'
      },
      {
        label: 'Manage permissions',
        permissionName: 'manage_role_overrides'
      },
      {
        label: 'Manage storage quotas',
        permissionName: 'manage_storage_quotas'
      },
      {
        label: 'Modify login details for users',
        permissionName: 'manage_user_logins'
      },
      {
        label: 'View statistics',
        permissionName: 'view_statistics'
      },
      {
        label: 'View the list of courses',
        permissionName: 'read_course_list'
      }
    ]
  },

  {
    groupName: 'Admin Tools',
    groupPermissions: [
      {
        label: 'Undelete courses',
        permissionName: 'undelete_courses'
      },
      {
        label: 'View Course Change Logs',
        permissionName: 'view_course_changes'
      },
      {
        label: 'View Grade Change Logs',
        permissionName: 'view_grade_changes'
      }
    ]
  },

  {
    groupName: 'Course & Account Permissions',
    groupPermissions: [
      {
        label: 'Add, edit and delete events on the course calendar',
        permissionName: 'manage_calendar'
      },
      {
        label: 'Add/remove other teachers, course designers or TAs to the course',
        permissionName: 'manage_admin_users'
      },
      {
        label: 'Add/remove students for the course',
        permissionName: 'manage_students'
      },
      {
        label: 'Change course state',
        permissionName: 'change_course_state'
      },
      {
        label: 'Create and edit assessing rubrics',
        permissionName: 'manage_rubrics'
      },
      {
        label: 'Create student collaborations',
        permissionName: 'create_collaborations'
      },
      {
        label: 'Create web conferences',
        permissionName: 'create_conferences'
      },
      {
        label: 'Edit grades',
        permissionName: 'manage_grades'
      },
      {
        label: 'Enable or disable features at an account level',
        permissionName: 'manage_feature_flags'
      },
      {
        label: 'Import learning outcomes',
        permissionName: 'import_outcomes'
      },
      {
        label: 'LTI add and edit',
        permissionName: 'lti_add_edit'
      },
      {
        label: 'Manage (add / edit / delete) assignments and quizzes',
        permissionName: 'manage_assignments'
      },
      {
        label: 'Manage (add / edit / delete) course files',
        permissionName: 'manage_files'
      },
      {
        label: 'Manage (add / edit / delete) pages',
        permissionName: 'manage_wiki'
      },
      {
        label: 'Manage (create / edit / delete) course sections',
        permissionName: 'manage_sections'
      },
      {
        label: 'Manage (create / edit / delete) groups',
        permissionName: 'manage_groups'
      },
      {
        label: 'Manage alerts',
        permissionName: 'manage_interaction_alerts'
      },
      {
        label: 'Manage all other course content',
        permissionName: 'manage_content'
      },
      {
        label: 'Manage learning outcomes',
        permissionName: 'manage_outcomes'
      },
      {
        label: 'Moderate Grades',
        permissionName: 'moderate_grades'
      },
      {
        label: "Moderate discussions ( delete / edit other's posts, lock topics)",
        permissionName: 'moderate_forum'
      },
      {
        label: 'Post to discussions',
        permissionName: 'post_to_forum'
      },
      {
        label: 'Read SIS data',
        permissionName: 'read_sis'
      },
      {
        label: "See other users' primary email address",
        permissionName: 'read_email_addresses'
      },
      {
        label: 'See the list of users',
        permissionName: 'read_roster'
      },
      {
        label: 'Send messages to individual course members',
        permissionName: 'send_messages'
      },
      {
        label: 'Send messages to the entire class',
        permissionName: 'send_messages_all'
      },
      {
        label: 'View all grades',
        permissionName: 'view_all_grades'
      },
      {
        label: "View all students' submissions and make comments on them",
        permissionName: 'comment_on_others_submissions'
      },
      {
        label: 'View and link to question banks',
        permissionName: 'read_question_banks'
      },
      {
        label: 'View announcements',
        permissionName: 'read_announcements'
      },
      {
        label: 'View course content',
        permissionName: 'read_course_content'
      },
      {
        label: 'View discussions',
        permissionName: 'read_forum'
      },
      {
        label: 'View login ids for users',
        permissionName: 'view_user_logins'
      },
      {
        label: 'View the answer matrix in Quiz Submission Logs',
        permissionName: 'view_quiz_answer_audits'
      },
      {
        label: 'View the group pages of all student groups',
        permissionName: 'view_group_pages'
      },
      {
        label: 'View usage reports for the course',
        permissionName: 'read_reports'
      }
    ]
  }
]

export const coursePermissionGroups = [
  {
    groupName: 'Course & Account Permissions',
    groupPermissions: [
      {
        label: 'Add, edit and delete events on the course calendar',
        permissionName: 'manage_calendar'
      },
      {
        label: 'Add/remove other teachers, course designers or TAs to the course',
        permissionName: 'manage_admin_users'
      },
      {
        label: 'Add/remove students for the course',
        permissionName: 'manage_students'
      },
      {
        label: 'Change course state',
        permissionName: 'change_course_state'
      },
      {
        label: 'Create and edit assessing rubrics',
        permissionName: 'manage_rubrics'
      },
      {
        label: 'Create student collaborations',
        permissionName: 'create_collaborations'
      },
      {
        label: 'Create web conferences',
        permissionName: 'create_conferences'
      },
      {
        label: 'Edit grades',
        permissionName: 'manage_grades'
      },
      {
        label: 'Import learning outcomes',
        permissionName: 'import_outcomes'
      },
      {
        label: 'LTI add and edit',
        permissionName: 'lti_add_edit'
      },
      {
        label: 'Manage (add / edit / delete) assignments and quizzes',
        permissionName: 'manage_assignments'
      },
      {
        label: 'Manage (add / edit / delete) course files',
        permissionName: 'manage_files'
      },
      {
        label: 'Manage (add / edit / delete) pages',
        permissionName: 'manage_wiki'
      },
      {
        label: 'Manage (create / edit / delete) course sections',
        permissionName: 'manage_sections'
      },
      {
        label: 'Manage (create / edit / delete) groups',
        permissionName: 'manage_groups'
      },
      {
        label: 'Manage alerts',
        permissionName: 'manage_interaction_alerts'
      },
      {
        label: 'Manage all other course content',
        permissionName: 'manage_content'
      },
      {
        label: 'Manage learning outcomes',
        permissionName: 'manage_outcomes'
      },
      {
        label: 'Moderate Grades',
        permissionName: 'moderate_grades'
      },
      {
        label: "Moderate discussions ( delete / edit other's posts, lock topics)",
        permissionName: 'moderate_forum'
      },
      {
        label: 'Post to discussions',
        permissionName: 'post_to_forum'
      },
      {
        label: 'Read SIS data',
        permissionName: 'read_sis'
      },
      {
        label: "See other users' primary email address",
        permissionName: 'read_email_addresses'
      },
      {
        label: 'See the list of users',
        permissionName: 'read_roster'
      },
      {
        label: 'Send messages to individual course members',
        permissionName: 'send_messages'
      },
      {
        label: 'Send messages to the entire class',
        permissionName: 'send_messages_all'
      },
      {
        label: 'View all grades',
        permissionName: 'view_all_grades'
      },
      {
        label: "View all students' submissions and make comments on them",
        permissionName: 'comment_on_others_submissions'
      },
      {
        label: 'View and link to question banks',
        permissionName: 'read_question_banks'
      },
      {
        label: 'View announcements',
        permissionName: 'read_announcements'
      },
      {
        label: 'View discussions',
        permissionName: 'read_forum'
      },
      {
        label: 'View login ids for users',
        permissionName: 'view_user_logins'
      },
      {
        label: 'View the group pages of all student groups',
        permissionName: 'view_group_pages'
      },
      {
        label: 'View usage reports for the course',
        permissionName: 'read_reports'
      }
    ]
  }
]

const accountRoles = [{id: 'accountAdmin', name: 'Account Admin'}]

const courseRoles = [
  {id: 'student', name: 'Student'},
  {id: 'ta', name: 'TA'},
  {id: 'teacher', name: 'Teacher'},
  {id: 'designer', name: 'Designer'},
  {id: 'observer', name: 'Observer'}
]

accountRoles.forEach(accountRole => {
  accountRole.permissions = {}

  accountPermissionGroups.forEach(group => {
    group.groupPermissions.forEach(permissions => {
      accountRole.permissions[permissions.permissionName] = createRandomPermissions()
    })
  })
})

courseRoles.forEach(courseRole => {
  courseRole.permissions = {}

  coursePermissionGroups.forEach(group => {
    group.groupPermissions.forEach(permissions => {
      courseRole.permissions[permissions.permissionName] = createRandomPermissions()
    })
  })
})

export {accountRoles, courseRoles}
