import React from 'react'
import jwt from 'jsonwebtoken'
import { Button } from 'reactstrap'

const invalidValues = [undefined, null, '', 0, false]

const userData = () => {
  const token = localStorage.getItem('token')
  let User = ''

  if (token) {
    // let getToken = ''
    // const splitToken = token.split(' ')
    // if (splitToken.length === 2) {
    //   ;[, getToken] = splitToken
    // }

    User = jwt.decode(token)
  }
  return User
}

const formDataFilterByKeys = (objFormData) => {
  const formData = new FormData()
  const ObjKeys = Object.keys(objFormData)

  for (let i = 0; i < ObjKeys.length; i += 1) {
    const dataItems = ObjKeys[i]
    if (objFormData[dataItems]) {
      formData.append(dataItems, objFormData[dataItems])
    }
  }
  return formData
}

const fileUploadPreview = (filePreviewUrl, fileType, fileSize) => {
  let filterFileSize = ''
  if (Math.ceil(fileSize / 1024) > 1024) {
    filterFileSize = `${Math.ceil(fileSize / 1048576)} Mb`
  } else {
    filterFileSize = `${Math.ceil(fileSize / 1024)} Kb`
  }
  return (
    <>
      <Button type="button" size="sm" color="secondary" disabled>
        <b>{filePreviewUrl}</b>
      </Button>
      &nbsp;&nbsp;
      {!invalidValues.includes(fileType) ? (
        <Button type="button" size="sm" color="info" disabled>
          <b>{fileType}</b>
        </Button>
      ) : (
        <span>&nbsp;</span>
      )}
      &nbsp;&nbsp;
      {!invalidValues.includes(fileSize) ? (
        <Button type="button" size="sm" color="warning" disabled>
          <b>{filterFileSize}</b>
        </Button>
      ) : (
        <span>&nbsp;</span>
      )}
    </>
  )
}

const badgeSizeDokumen = (fileSize) => {
  let filterFileSize = ''
  if (Math.ceil(fileSize / 1024) > 1024) {
    filterFileSize = `${Math.ceil(fileSize / 1048576)} Mb`
  } else {
    filterFileSize = `${Math.ceil(fileSize / 1024)} Kb`
  }

  return (
    <>
      {!invalidValues.includes(fileSize) && (
        <Button type="button" size="sm" color="warning" disabled>
          <b>{filterFileSize}</b>
        </Button>
      )}
    </>
  )
}

const badgeTypeDokumen = (fileType) => {
  const typeImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml']
  const typeDok = ['application/pdf']

  if (typeImage.includes(fileType)) {
    return (
      <Button type="button" size="sm" color="success" disabled>
        <b>{fileType}</b>
      </Button>
    )
  }

  if (typeDok.includes(fileType)) {
    return (
      <Button type="button" size="sm" color="danger" disabled>
        <b>{fileType}</b>
      </Button>
    )
  }
}

const checkFilePreview = (paramsURL) => (
  <a href={paramsURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
    Lihat File
  </a>
)

const placeholderInputFile = () => (
  <span style={{ color: 'rgba(54, 54, 54, 0.3)' }}>File belum diupload...</span>
)

const requireLabel = () => (
  <span className="text-danger" style={{ paddingLeft: '1px' }}>
    *
  </span>
)

const getYearOptions = (option = 5) => {
  const options = []
  const thisYear = new Date().getFullYear()
  for (let i = option; i > 0; i -= 1) {
    options.push({ value: thisYear - i, label: thisYear - i })
  }

  for (let i = 0; i < option; i += 1) {
    options.push({ value: thisYear + i, label: thisYear + i })
  }

  return options
}

const formatCurrencyIDR = (value) => {
  if (value && Number(value)) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value)
  }
  return null
}

export {
  userData,
  formDataFilterByKeys,
  fileUploadPreview,
  placeholderInputFile,
  requireLabel,
  badgeSizeDokumen,
  badgeTypeDokumen,
  checkFilePreview,
  invalidValues,
  getYearOptions,
  formatCurrencyIDR,
}
