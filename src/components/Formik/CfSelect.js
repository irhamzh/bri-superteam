import React from 'react'
import Select from 'react-select'
import Async from 'react-select/async'
import PropTypes from 'prop-types'
import { Label } from 'reactstrap'
import { requireLabel } from '../../helpers'
import ErrorView from './ErrorView'

const CfSelect = ({
  label,
  isRequired,
  options,
  isMulti,
  isDisabled,
  field,
  form: { setFieldValue, setFieldTouched },
  onSelectChange,
  defaultValue,
  ...props
}) => {
  // Handle Select Multi or Single
  const handleChangeSelect = (option) => {
    // Return Callback
    if (onSelectChange) {
      onSelectChange(field.name, option.value)
    }
    // Handle Select
    if (isMulti) {
      setFieldValue(field.name, option)
    } else {
      setFieldValue(field.name, option.value)
    }
  }

  // Handle Value Select Multi or Single
  const handleValues = (options) => {
    if (isMulti) {
      return field.value
    }

    if (options) {
      return options.find((option) => option.value === field.value)
    }

    return ''
  }

  const resultValue = handleValues(options)

  return (
    <>
      <Label>
        <b>{label}</b>
        &nbsp;
        {isRequired && requireLabel()}
      </Label>
      <Select
        {...field}
        {...props}
        defaultValue
        defaultInputValue={defaultValue?.label}
        isMulti={isMulti}
        options={options}
        className="basic-single"
        classNamePrefix="select"
        value={resultValue}
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(option) => handleChangeSelect(option)}
        isDisabled={!(options && options.length > 0) || isDisabled}
      />
      <ErrorView name={field.name} />
    </>
  )
}

const CfAsyncSelect = ({
  label,
  isRequired,
  options,
  isMulti,
  isDisabled,
  field,
  form: { setFieldValue, setFieldTouched },
  onSelectChange,
  defaultValue,
  ...props
}) => {
  // Handle Select Multi or Single
  const handleChangeSelect = (option) => {
    // Return Callback
    if (onSelectChange) {
      onSelectChange(field.name, option.value)
    }
    // Handle Select
    if (isMulti) {
      setFieldValue(field.name, option)
    } else {
      setFieldValue(field.name, option.value)
    }
  }

  // Handle Value Select Multi or Single
  const handleValues = (options) => {
    if (isMulti) {
      return field.value
    }

    if (options) {
      return options.find((option) => option.value === field.value)
    }

    return ''
  }

  const resultValue = handleValues(options)

  return (
    <>
      <Label>
        <b>{label}</b>
        &nbsp;
        {isRequired && requireLabel()}
      </Label>
      <Async
        {...field}
        {...props}
        defaultValue
        defaultInputValue={defaultValue?.label}
        isMulti={isMulti}
        defaultOptions={options}
        className="basic-single"
        classNamePrefix="select"
        value={resultValue}
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(option) => handleChangeSelect(option)}
        // isDisabled={!(options && options.length > 0) || isDisabled}
      />
      <ErrorView name={field.name} />
    </>
  )
}

CfSelect.propTypes = {
  label: PropTypes.oneOfType([
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
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  isMulti: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  isDisabled: PropTypes.oneOfType([
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
  onSelectChange: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
}

CfAsyncSelect.propTypes = {
  label: PropTypes.oneOfType([
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
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  isMulti: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  isDisabled: PropTypes.oneOfType([
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
  onSelectChange: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
}

export { CfSelect, CfAsyncSelect }
