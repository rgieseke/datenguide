import React from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/ExpansionPanel' // TODO rename to accordion after material-ui update
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary' // TODO rename to accordion after material-ui update
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails' // TODO rename to accordion after material-ui update
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import MeasureSearchComboSelection from './MeasureSearchComboSelection'
import fetcher from '../../lib/fetcher'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[500],
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  headingAttribute: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  headingStatistic: {
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    color: theme.palette.grey[500],
  },
  headingDetails: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
  },
  headingLegend: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
    color: theme.palette.grey[500],
  },
  measureDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  measureDescription: {
    flex: '1 0 50%',
  },
  dimensionSelect: {
    flex: '1 0 50%',
    display: 'flex',
    flexDirection: 'column',
  },
  codeDimensionChip: {
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
  },
  titleDimensionChip: {
    color: 'white',
    fontWeight: 'bold',
  },
  dimension: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  dimensionName: {
    fontWeight: 'bold',
    width: '72px',
  },
  dimensionDescription: {
    marginLeft: theme.spacing(1),
  },
  dimensionPlus: {
    margin: theme.spacing(0, 0.5),
  },
  radio: {
    padding: theme.spacing(0, 1, 0, 0),
  },
}))

const MeasureSearchParameterCard = ({
  statistic,
  onClose,
  onArgumentChange,
}) => {
  const classes = useStyles()

  const {
    id,
    statisticName,
    statisticTitleDe,
    name,
    titleDe,
    definitionDe,
    dimensions,
  } = statistic

  const definitionWithLineBreaks =
    definitionDe && definitionDe.replace(/\n/g, '<br/>')

  const [statisticId, measureId] = statistic.id.split(':')

  const activeCombo = dimensions
    .filter((d) => d.active)
    .map((d) => d.name)
    .sort()

  const { data: inventory } = useSWR(
    `/api/inventory?statistic=${statisticId}&measure=${measureId}`,
    fetcher
  )

  return (
    <Accordion elevation={1}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.summary}>
          <div className={classes.headingAttribute}>
            {`${name} - ${titleDe}`}
          </div>
          <div className={classes.headingStatistic}>
            {`${statisticName} – ${statisticTitleDe}`}
          </div>
          {inventory && (
            <MeasureSearchComboSelection
              statistic={statistic}
              inventory={inventory}
              activeCombo={activeCombo}
              onArgumentChange={onArgumentChange}
            />
          )}
        </div>
        <IconButton
          aria-label="settings"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.measureDetails}>
          <div className={classes.measureDescription}>
            <div className={classes.headingDetails}>Beschreibung</div>
            <div
              dangerouslySetInnerHTML={{ __html: definitionWithLineBreaks }}
            />
          </div>
          <div className={classes.dimensionSelect}>
            <div className={classes.headingDetails}>Merkmalsausprägungen</div>
            {dimensions.map((dim, i) => (
              <div className={classes.dimension} key={dim.name}>
                <div className={classes.dimensionName}>{dim.name}</div>
                <span className={classes.dimensionDescription}>
                  {dim.titleDe}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

MeasureSearchParameterCard.propTypes = {
  statistic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onArgumentChange: PropTypes.func.isRequired,
}

export default MeasureSearchParameterCard
