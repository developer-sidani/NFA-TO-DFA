import React, { FC } from 'react'
import { Avatar, StepIconProps } from '@mui/material'
import { CheckIcon } from '../index'

const StepIcon: FC<StepIconProps> = (props) => {
  const { active, completed, icon } = props

  const highlight = active || completed

  return (
    <Avatar
      // @ts-ignore
      sx={{
        backgroundColor: highlight && 'secondary.main',
        color: highlight && 'secondary.contrastText',
        height: 40,
        width: 40,
      }}
      variant="rounded"
    >
      {
        completed
          ? <CheckIcon fontSize="small" />
          : icon
      }
    </Avatar>
  )
}
export { StepIcon }
