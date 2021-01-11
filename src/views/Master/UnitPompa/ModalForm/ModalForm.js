import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput, CfSelect } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createUnitPompa, updateUnitPompa } from '../../../../modules/unitPompa/actions'
// import jenisBarangSchema from '../../../../validations/mvJenisBarang'
import Service from '../../../../config/services'

function ModalForm(props) {
  const [optPompa, setOptPompa] = useState([])

  useEffect(() => {
    Service.getPompa().then((res) => {
      const option = res.data.data.map((row) => ({ label: row.name, value: row.id }))
      setOptPompa(option)
    })
  }, [])
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createUnitPompa, updateUnitPompa } = props
    if (!invalidValues.includes(id)) {
      updateUnitPompa(values, id, doRefresh)
    } else {
      createUnitPompa(values, doRefresh)
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
              <ModalHeader toggle={modalForm.hide}>Form Unit Pompa</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Unit Pompa"
                    type="text"
                    name="nameUnit"
                    isRequired
                    placeholder="Masukkan nama"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Pompa"
                    options={optPompa}
                    isRequired
                    name="pump"
                    placeholder="Pilih atau Cari Pompa"
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
  createUnitPompa: PropTypes.func.isRequired,
  updateUnitPompa: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.jenisBarang.isLoading,
  message: state.jenisBarang.message,
})

const mapDispatchToProps = (dispatch) => ({
  createUnitPompa: (formData, refresh) => dispatch(createUnitPompa(formData, refresh)),
  updateUnitPompa: (formData, id, refresh) => dispatch(updateUnitPompa(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
