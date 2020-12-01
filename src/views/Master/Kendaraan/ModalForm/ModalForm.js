import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfInput } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createKendaraan, updateKendaraan } from '../../../../modules/master/kendaraan/actions'
// import jenisBarangSchema from '../../../../validations/mvJenisBarang'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createKendaraan, updateKendaraan } = props
    if (!invalidValues.includes(id)) {
      updateKendaraan(values, id, doRefresh)
    } else {
      createKendaraan(values, doRefresh)
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
              <ModalHeader toggle={modalForm.hide}>Form Kendaraan</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Merk Kendaraan"
                    type="text"
                    name="merk"
                    isRequired
                    placeholder="Masukkan Merk"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Warna Kendaraan"
                    type="text"
                    name="color"
                    isRequired
                    placeholder="Masukkan Warna"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Plat Nomor"
                    type="text"
                    name="platNomor"
                    isRequired
                    placeholder="Masukkan PlatNomor"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="KM Akhir"
                    type="number"
                    name="kmAkhir"
                    isRequired
                    placeholder="Masukkan KM Akhir"
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
  createKendaraan: PropTypes.func.isRequired,
  updateKendaraan: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.kendaraan.isLoading,
  message: state.kendaraan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createKendaraan: (formData, refresh) => dispatch(createKendaraan(formData, refresh)),
  updateKendaraan: (formData, id, refresh) => dispatch(updateKendaraan(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
