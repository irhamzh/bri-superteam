import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { CfAsyncSelect, CfInput, CfSelect } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createUser, updateUser } from '../../../../modules/master/user/actions'
import Service from '../../../../config/services'

function ModalForm(props) {
  const [optRoles, setOptRoles] = useState([])

  useEffect(() => {
    ;(async function getOptRoles() {
      let optRoles
      await Service.getRoles().then((res) => {
        optRoles = res.data.data.map((item) => ({ label: item.name, value: item.id }))

        setOptRoles(optRoles)
      })
    })()
  }, [])

  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createUser, updateUser } = props
    if (!invalidValues.includes(id)) {
      updateUser(values, id, doRefresh)
    } else {
      createUser(values, doRefresh)
    }
  }

  async function handleInputRole(value) {
    const filtered = [{ id: 'name', value: `${value}` }]
    const filterString = JSON.stringify(filtered)
    const params = `?filtered=${filterString}`
    const paramsEncoded = encodeURI(params)
    let option = []
    await Service.getRoles(paramsEncoded).then((res) => {
      option = res.data.data.map((row) => ({
        label: row.name,
        value: row.id,
      }))
    })
    return option
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
          {({ values, isSubmitting }) => (
            <Form>
              <ModalHeader toggle={modalForm.hide}>Form User</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    isRequired
                    placeholder="Masukkan Email"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Password"
                    type="password"
                    name="password"
                    isRequired
                    placeholder="Masukkan Password"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Confirm Password"
                    type="password"
                    name="passwordConfirm"
                    isRequired
                    placeholder="Masukkan Password"
                    component={CfInput}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Role"
                    cacheOptions
                    options={optRoles}
                    defaultOptions
                    loadOptions={handleInputRole}
                    name="role"
                    isRequired
                    placeholder="Pilih atau cari"
                    defaultValue={
                      values.role ? { value: values.role.id, label: values.role.name } : null
                    }
                    component={CfAsyncSelect}
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    label="Division"
                    options={[
                      { label: 'Fixed Asset', value: 'Fixed Asset' },
                      { label: 'Procurement', value: 'Procurement' },
                      { label: 'General Affair', value: 'General Affair' },
                      { label: 'Financial Admin', value: 'Financial Admin' },
                      { label: 'All', value: 'All' },
                    ]}
                    isRequired
                    name="division"
                    placeholder="Pilih atau Cari divisi"
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
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.uker.isLoading,
  message: state.uker.message,
})

const mapDispatchToProps = (dispatch) => ({
  createUser: (formData, refresh) => dispatch(createUser(formData, refresh)),
  updateUser: (formData, id, refresh) => dispatch(updateUser(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
