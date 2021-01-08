import React from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap'
import { requireLabel } from '../../helpers'
// import { API_FILE } from '../../config/apiConfig'
import ErrorView from './ErrorView'

// const invalidValues = [undefined, null, '']

const CfInputMultiFile = ({
  label,
  onInputChange,
  isRequired,
  field,
  isHide,
  form: { setFieldValue, setFieldTouched },
  ...props
}) => {
  // const [filePreview, setfilePreview] = useState()
  // const [fileType, setfileType] = useState()
  // const [fileSize, setfileSize] = useState()

  const handleChangeImage = (e) => {
    const reader = new FileReader()
    const file = e.currentTarget.files
    if (file) {
      reader.onloadend = () => {
        // setfilePreview(file.name)
        // setfileType(file.type)
        // setfileSize(file.size)
      }

      // reader.readAsDataURL(file)

      if (onInputChange) {
        onInputChange(field.name, file)
      }

      setFieldValue(field.name, file)
    }
  }
  // console.log({ field })

  return (
    <>
      <Label>
        <b>{label}</b>
        &nbsp;
        {isRequired && requireLabel()}
      </Label>
      <Input
        {...props}
        id={field.name}
        name={field.name}
        type="file"
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(e) => handleChangeImage(e)}
        style={isHide ? { display: 'none' } : { marginBottom: '10px' }}
      />
      <ErrorView name={field.name} />

      {/* {filePreview && fileUploadPreview(filePreview, fileType, fileSize)} */}

      <>
        {/* {!invalidValues.includes(field.value) ? (
          <div>{checkFilePreview(`${API_FILE}${field.value}`)}</div>
        ) : (
          <div className="btn btn-secondary disabled">Tidak ada File</div>
        )} */}
      </>
    </>
  )
}

CfInputMultiFile.propTypes = {
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
  isHide: PropTypes.oneOfType([
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

export default CfInputMultiFile
