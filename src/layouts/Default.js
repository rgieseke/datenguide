import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BaseLayout from '../layouts/Base'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    fontSize: theme.typography.body1.fontSize
  }
}))

export default function DefaultLayout (props) {
  const classes = useStyles()

  return (
    <BaseLayout>
      <Container>
        <div className={classes.root}>{props.children}</div>
      </Container>
    </BaseLayout>
  )
}
