import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createLantai, updateLantai } from '../../../../modules/lantai/actions'
// import roomSchema from '../../../../validations/mvRoom'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createLantai, updateLantai } = props
    if (!invalidValues.includes(id)) {
      updateLantai(values, id, doRefresh)
    } else {
      createLantai(values, doRefresh)
    }
  }

  return (
    <>
      <Modal
        isOpen={modalForm.isOpen}
        toggle={modalForm.toggle}
        backdrop="static"
        className={className}
      >
        <Formik
          initialValues={modalForm.prop.data}
          // validationSchema={}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveChanges(values)
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader toggle={modalForm.hide}>Form Lantai</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Lantai"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama lantai"
                    component={CfInput}
                  />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button type="button" color="secondary" onClick={modalForm.hide}>
                  Cancel
                </Button>
                &nbsp;
                <Button type="submit" color="primary" className="px-4" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" color="light" />
                      &nbsp;Loading...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

ModalForm.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createLantai: PropTypes.func.isRequired,
  updateLantai: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.lantai.isLoading,
  message: state.lantai.message,
})

const mapDispatchToProps = (dispatch) => ({
  createLantai: (formData, refresh) => dispatch(createLantai(formData, refresh)),
  updateLantai: (formData, id, refresh) => dispatch(updateLantai(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
