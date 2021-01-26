import { Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import { CfInput, CfInputCheckbox } from '../../../../components'
import { invalidValues } from '../../../../helpers'
import { WithToggleProps } from '../../../../HOC/withToggle'
import { createRole, updateRole } from '../../../../modules/master/role/actions'
import roleSchema from '../../../../validations/mvRole'

function ModalForm(props) {
  const { modalForm, doRefresh, className } = props

  function handleSaveChanges(values) {
    const { id } = values
    const { createRole, updateRole } = props
    if (!invalidValues.includes(id)) {
      updateRole(values, id, doRefresh)
    } else {
      createRole(values, doRefresh)
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
          validationSchema={roleSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveChanges(values)
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader toggle={modalForm.hide}>Form Role</ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Field
                    label="Nama Role"
                    type="text"
                    name="name"
                    isRequired
                    placeholder="Masukkan nama role"
                    component={CfInput}
                  />
                </FormGroup>

                <strong>Fixed Asset</strong>
                <div style={{ marginLeft: '20px' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Create"
                          name="fixedAsset.create"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Update"
                          name="fixedAsset.update"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="Read" name="fixedAsset.read" component={CfInputCheckbox} />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Delete"
                          name="fixedAsset.delete"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Dashboard"
                          name="fixedAsset.dashboard"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Kabag"
                          name="fixedAsset.approvalKabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Wakabag"
                          name="fixedAsset.approvalWakabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Supervisor"
                          name="fixedAsset.approvalSupervisor"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <strong>Procurement</strong>
                <div style={{ marginLeft: '20px' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Create"
                          name="procurement.create"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Update"
                          name="procurement.update"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="Read" name="procurement.read" component={CfInputCheckbox} />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Delete"
                          name="procurement.delete"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Dashboard"
                          name="procurement.dashboard"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Kabag"
                          name="procurement.approvalKabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Wakabag"
                          name="procurement.approvalWakabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Supervisor"
                          name="procurement.approvalSupervisor"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <strong>General Affair</strong>
                <div style={{ marginLeft: '20px' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Create"
                          name="generalAffair.create"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Update"
                          name="generalAffair.update"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="Read" name="generalAffair.read" component={CfInputCheckbox} />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Delete"
                          name="generalAffair.delete"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Dashboard"
                          name="generalAffair.dashboard"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Kabag"
                          name="generalAffair.approvalKabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Wakabag"
                          name="generalAffair.approvalWakabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Supervisor"
                          name="generalAffair.approvalSupervisor"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <strong>Financial Admin</strong>
                <div style={{ marginLeft: '20px' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Create"
                          name="financialAdmin.create"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Update"
                          name="financialAdmin.update"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Read"
                          name="financialAdmin.read"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Delete"
                          name="financialAdmin.delete"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Dashboard"
                          name="financialAdmin.dashboard"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Kabag"
                          name="financialAdmin.approvalKabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Wakabag"
                          name="financialAdmin.approvalWakabag"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Approval Supervisor"
                          name="financialAdmin.approvalSupervisor"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <strong>Master Data</strong>
                <div style={{ marginLeft: '20px' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Field
                          label="Create"
                          name="masterData.create"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Update"
                          name="masterData.update"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="Read" name="masterData.read" component={CfInputCheckbox} />
                      </FormGroup>

                      <FormGroup>
                        <Field
                          label="Delete"
                          name="masterData.delete"
                          component={CfInputCheckbox}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
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
                    'Save Changes'
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
  createRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  doRefresh: PropTypes.func,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.role.isLoading,
  message: state.role.message,
})

const mapDispatchToProps = (dispatch) => ({
  createRole: (formData, refresh) => dispatch(createRole(formData, refresh)),
  updateRole: (formData, id, refresh) => dispatch(updateRole(formData, id, refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
