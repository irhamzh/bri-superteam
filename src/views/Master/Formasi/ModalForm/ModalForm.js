import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createFormasi, updateFormasi } from '../../../../modules/master/formasi/actions'
// import jenisBarangSchema from '../../../../validations/mvJenisBarang'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createFormasi, updateFormasi } = props
    if (!invalidValues.includes(id)) {
      updateFormasi(values, id, doRefresh)
    } else {
      createFormasi(values, doRefresh)
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
              <ModalHeader toggle={modalForm.hide}>Form Formasi</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Level Jabatan"
                    type="text"
                    name="levelJabatan"
                    isRequired
                    placeholder="Masukkan Level Jabatan"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Unit Kerja"
                    type="text"
                    name="unitKerja"
                    isRequired
                    placeholder="Masukkan Unit Kerja"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Formasi"
                    type="number"
                    name="formasi"
                    isRequired
                    placeholder="Masukkan Formasi"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Pemenuhan"
                    type="number"
                    name="pemenuhan"
                    isRequired
                    placeholder="Masukkan Pemenuhan"
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
  createFormasi: PropTypes.func.isRequired,
  updateFormasi: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.formasi.isLoading,
  message: state.formasi.message,
})

const mapDispatchToProps = (dispatch) => ({
  createFormasi: (formData, refresh) => dispatch(createFormasi(formData, refresh)),
  updateFormasi: (formData, id, refresh) => dispatch(updateFormasi(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
