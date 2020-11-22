import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createPartner, updatePartner } from '../../../../modules/partners/actions'
// import jenisBarangSchema from '../../../../validations/mvJenisBarang'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createPartner, updatePartner } = props
    if (!invalidValues.includes(id)) {
      updatePartner(values, id, doRefresh)
    } else {
      createPartner(values, doRefresh)
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
              <ModalHeader toggle={modalForm.hide}>Form Partner</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Parner"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama Provider"
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
  createPartner: PropTypes.func.isRequired,
  updatePartner: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.partner.isLoading,
  message: state.partner.message,
})

const mapDispatchToProps = (dispatch) => ({
  createPartner: (formData, refresh) => dispatch(createPartner(formData, refresh)),
  updatePartner: (formData, id, refresh) => dispatch(updatePartner(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
