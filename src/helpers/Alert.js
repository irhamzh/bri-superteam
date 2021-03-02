import React from 'react'
import { Alert } from 'reactstrap'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const invalidValues = [undefined, null, '']

class AlertMessage {
  // Success Response
  static success(params = {}) {
    const { title, text, html } = params
    const defaultMessage = {
      title: 'Success',
      text: 'Data berhasil ditambahkan!',
    }

    return Swal.fire({
      title: !invalidValues.includes(title) ? title : defaultMessage.title,
      text: !invalidValues.includes(text) ? text : defaultMessage.text,
      icon: 'success',
      html,
      confirmButtonColor: '#20a8d8',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((response) => response)
  }

  // Info Response
  static info(params) {
    return Swal.fire({
      title: params.title,
      text: params.text,
      icon: 'info',
      confirmButtonColor: '#20a8d8',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((response) => response)
  }

  // Error Response
  static error(err) {
    let pesanError
    if (err.response) {
      pesanError = err.response.data.message
    } else {
      pesanError = 'Internal server error'
    }

    return Swal.fire({
      title: 'Oops!',
      text: pesanError,
      icon: 'error',
      confirmButtonColor: '#20a8d8',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((response) => response)
  }

  // Deprecated: Warning Response (deleted data only)
  static warning(params = {}) {
    const { title, text, confirmButtonText, cancelButtonText } = params
    const defaultMessage = {
      title: 'Apa kamu yakin?',
      text: 'Setelah dihapus, Kamu tidak dapat memulihkan data ini!',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Kembali',
    }

    return Swal.fire({
      title: !invalidValues.includes(title) ? title : defaultMessage.title,
      text: !invalidValues.includes(text) ? text : defaultMessage.text,
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      confirmButtonText: !invalidValues.includes(confirmButtonText)
        ? confirmButtonText
        : defaultMessage.confirmButtonText,
      cancelButtonText: !invalidValues.includes(cancelButtonText)
        ? cancelButtonText
        : defaultMessage.cancelButtonText,
    }).then((result) => result)
  }

  // Custom Response
  static custom(params = {}) {
    const { title, text, icon } = params
    const defaultMessage = {
      title: 'Success',
      text: 'Data berhasil ditambahkan!',
      icon: 'success',
    }

    return Swal.fire({
      title: !invalidValues.includes(title) ? title : defaultMessage.title,
      text: !invalidValues.includes(text) ? text : defaultMessage.text,
      icon: !invalidValues.includes(icon) ? icon : defaultMessage.icon,
      confirmButtonColor: '#20a8d8',
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }
}

const ErrorMessage = (message) => {
  if (!invalidValues.includes(message)) {
    return <Alert color="danger">{message}</Alert>
  }
}

export { AlertMessage, ErrorMessage }
