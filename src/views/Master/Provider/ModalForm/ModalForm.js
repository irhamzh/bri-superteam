import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createProvider, updateProvider } from '../../../../modules/provider/actions'
// import jenisBarangSchema from '../../../../validations/mvJenisBarang'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createProvider, updateProvider } = props
    if (!invalidValues.includes(id)) {
      updateProvider(values, id, doRefresh)
    } else {
      createProvider(values, doRefresh)
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
          // validationSchema={jenisBarangSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveChanges(values)
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader toggle={modalForm.hide}>Form Provider</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Provider"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama Provider"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Alamat Provider"
                    type="text"
                    name="address"
                    isRequired
                    placeholder="Masukkan Alamat"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Contact Provider"
                    type="text"
                    name="contact"
                    isRequired
                    placeholder="Masukkan Contact Provider"
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
  createProvider: PropTypes.func.isRequired,
  updateProvider: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.provider.isLoading,
  message: state.provider.message,
})

const mapDispatchToProps = (dispatch) => ({
  createProvider: (formData, refresh) => dispatch(createProvider(formData, refresh)),
  updateProvider: (formData, id, refresh) => dispatch(updateProvider(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
