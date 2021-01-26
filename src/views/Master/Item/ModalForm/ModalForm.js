import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput, CfSelect } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createItem, updateItem } from '../../../../modules/item/actions'
// import roomSchema from '../../../../validations/mvRoom'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createItem, updateItem } = props
    if (!invalidValues.includes(id)) {
      updateItem(values, id, doRefresh)
    } else {
      createItem(values, doRefresh)
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
              <ModalHeader toggle={modalForm.hide}>Form Item</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Item"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama item"
                    component={CfInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    label="Tipe Item"
                    options={[
                      { value: 'fisik', label: 'fisik' },
                      { value: 'jaringan', label: 'jaringan' },
                    ]}
                    isRequired
                    name="typeItem"
                    placeholder="Pilih atau Cari tipe"
                    component={CfSelect}
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
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.item.isLoading,
  message: state.item.message,
})

const mapDispatchToProps = (dispatch) => ({
  createItem: (formData, refresh) => dispatch(createItem(formData, refresh)),
  updateItem: (formData, id, refresh) => dispatch(updateItem(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
