import React, {PureComponent} from 'react'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import DataGrid from '@jneander/data-grid'

import Layout from '../../shared/components/Layout'
import NotesCell from './cells/NotesCell'
import StudentCell from './cells/StudentCell'
import TextCell from './cells/TextCell'
import NotesColumnHeader from './headers/NotesColumnHeader'
import StudentColumnHeader from './headers/StudentColumnHeader'
import TextColumnHeader from './headers/TextColumnHeader'
import {columns, rows} from './data'
import styles from './styles.css'

export default class DataGridV3 extends PureComponent {
  render() {
    return (
      <Layout>
        <div className={styles.Root}>
          <Heading level="h2" margin="0 0 medium 0">
            DataGrid v3
          </Heading>

          <Heading level="h3" margin="0 0 medium 0">
            Example 1: Minimal Data Grid
          </Heading>

          <div className={styles.Grid}>
            <DataGrid
              columns={columns}
              headerHeight={40}
              navigableHeaders
              renderCell={props => {
                if (props.column.id === 'studentName') {
                  return <StudentCell {...props} />
                }
                if (props.column.id === 'notes') {
                  return <NotesCell {...props} />
                }
                return <TextCell {...props} />
              }}
              renderColumnHeader={props => {
                if (props.column.id === 'studentName') {
                  return <StudentColumnHeader {...props} />
                }
                if (props.column.id === 'notes') {
                  return <NotesColumnHeader {...props} />
                }
                return <TextColumnHeader {...props} />
              }}
              rowHeight={36}
              rows={rows}
            />
          </div>
        </div>
      </Layout>
    )
  }
}
