import React from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap'
import { requireLabel } from '../../helpers'
import ErrorView from './ErrorView'

const CfInput = ({
  label,
  onInputChange,
  isRequired,
  field,
  form: { setFieldValue },
  ...props
}) => {
  const handleChangeInput = (e) => {
    const { value } = e.currentTarget

    if (onInputChange) {
      onInputChange(field.name, value)
    }

    setFieldValue(field.name, value)
  }

  return (
    <>
      <Label>
        <b>{label}</b>
        &nbsp;
        {isRequired && requireLabel()}
      </Label>
      <Input {...field} {...props} onChange={(e) => handleChangeInput(e)} autocomplete="off" />
      <ErrorView name={field.name} />
    </>
  )
}

CfInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  onInputChange: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  isRequired: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  field: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  form: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
}

export default CfInput
