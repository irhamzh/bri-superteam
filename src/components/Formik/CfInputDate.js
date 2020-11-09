import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import moment from 'moment'
import 'moment/locale/id'
import { id } from 'date-fns/locale'
import { requireLabel } from '../../helpers'
import ErrorView from './ErrorView'

moment.locale('id')

const DateCustomInput = ({ classGroup, classIcon, value, onClick, ...props }) => (
  <InputGroup className={classGroup}>
    <InputGroupAddon addonType="prepend">
      <InputGroupText>
        <i className={classIcon} />
      </InputGroupText>
    </InputGroupAddon>
    <Input {...props} value={value || undefined} onClick={onClick} />
  </InputGroup>
)

const CfInputDate = ({
  label,
  minDate,
  isRequired,
  blockLabel,
  styleLabel,
  field,
  form: { setFieldValue, setFieldTouched },
  placeholder,
  dateFormat,
  ...props
}) => {
  return (
    <>
      <Label style={blockLabel ? { display: 'block' } : styleLabel}>
        <b>{label}</b>
        &nbsp;
        {isRequired && requireLabel()}
      </Label>

      <DatePicker
        {...field}
        {...props}
        dateFormat={dateFormat || 'MM/dd/yyyy'}
        dropdownMode="select"
        locale={id}
        minDate={minDate}
        showYearDropdown
        showMonthDropdown
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => setFieldValue(field.name, date)}
        onBlur={() => setFieldTouched(field.name, true)}
        placeholderText={placeholder}
        customInput={<DateCustomInput {...field} {...props} />}
      />
      <ErrorView name={field.name} />
    </>
  )
}

CfInputDate.propTypes = {
  blockLabel: PropTypes.bool,
  styleLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
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
  placeholder: PropTypes.oneOfType([
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

DateCustomInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  onClick: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  classGroup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  classIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
}

export default CfInputDate
