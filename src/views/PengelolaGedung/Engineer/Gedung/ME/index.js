import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  FormGroup,
} from 'reactstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Service from '../../../../../config/services'
import { CfInput, CfInputDate, CfInputRadio, CfSelect } from '../../../../../components'
import { AlertMessage, ErrorMessage, invalidValues } from '../../../../../helpers'
import { createRole, updateRole, deleteRole } from '../../../../../modules/master/role/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

const roleSchema = Yup.object().shape({
  nama: Yup.string().required('nama role belum diisi'),
})

class ME extends Component {
  initialValues = {
    nama: '',
    id: '',
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createRole, updateRole } = this.props
    if (!invalidValues.includes(id)) {
      updateRole(values, id, this.doRefresh)
    } else {
      createRole(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteRole } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          console.log('delete object', id)
          deleteRole(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // ME Server Error
      })
  }

  render() {
    const { message, isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'Gedung',
        accessor: 'gedung',
        filterable: false,
      },
      {
        Header: 'Lantai',
        accessor: 'lantai',
        filterable: false,
      },
      {
        Header: 'Smoke Detector',
        accessor: 'smokeDetector',
        filterable: false,
      },
      {
        Header: 'AC System',
        accessor: 'sistemAC',
        filterable: false,
      },
      {
        Header: 'Thermostat',
        accessor: 'thermostat',
        filterable: false,
      },
      {
        Header: 'Telephone',
        accessor: 'telephone',
        filterable: false,
      },
      {
        Header: 'Fire Alarm',
        accessor: 'fireAlarm',
        filterable: false,
      },
      {
        Header: 'Exhaust',
        accessor: 'exhaust',
        filterable: false,
      },
      {
        Header: 'Ceiling Speaker',
        accessor: 'ceilingSpeaker',
        filterable: false,
      },
      {
        Header: 'Head Sprinkler',
        accessor: 'headSprinkler',
        filterable: false,
      },
      {
        Header: 'CCTV',
        accessor: 'cctv',
        filterable: false,
      },
      {
        Header: 'MCCB',
        accessor: 'mccb',
        filterable: false,
      },
      {
        Header: 'Hydrant Box',
        columns: [
          {
            Header: 'APAR',
            accessor: 'apar',
            filterable: false,
          },
          {
            Header: 'Segel',
            accessor: 'segel',
            filterable: false,
          },
          {
            Header: 'PIN',
            accessor: 'pin',
            filterable: false,
          },
          {
            Header: 'Selang',
            accessor: 'selang',
            filterable: false,
          },
          {
            Header: 'Nozle',
            accessor: 'nozle',
            filterable: false,
          },
          {
            Header: 'Hose',
            accessor: 'hose',
            filterable: false,
          },
          {
            Header: 'Valves',
            accessor: 'valves',
            filterable: false,
          },
          {
            Header: 'Alarm',
            accessor: 'alarm',
            filterable: false,
          },
          {
            Header: 'Pintu / Engsel',
            accessor: 'pintuEngsel',
            filterable: false,
          },
          {
            Header: 'Lampu Indikator',
            accessor: 'lampuIndikator',
            filterable: false,
          },
          {
            Header: 'Expired Tabung',
            accessor: 'expiredTabung',
            filterable: false,
          },
        ],
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: false,
      },
      {
        Header: 'Aksi',
        width: 150,
        filterable: false,
        Cell: (props) => (
          <>
            <Button
              color="success"
              onClick={() => modalForm.show({ data: props.original })}
              className="mr-1"
              title="Edit"
            >
              <i className="fa fa-pencil" />
            </Button>
            &nbsp; | &nbsp;
            <Button
              color="success"
              onClick={() => modalForm.show({ data: props.original })}
              className="mr-1"
              title="Edit"
            >
              <i className="fa fa-pencil" />
            </Button>
          </>
        ),
      },
    ]

    const pageName = 'Mechanical Electrical'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="6">
                    <Button color="default" className="mr-1">
                      {pageName}
                    </Button>
                  </Col>
                  <Col sm="6">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        color="primary"
                        onClick={() => modalForm.show({ data: this.initialValues })}
                        className="mr-1"
                      >
                        {/* <i className="fa fa-plus" style={isIcon} /> */}
                        {/* &nbsp; */}
                        Tambah Data
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        className="mr-3 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Show
                      </Button>
                      <Button
                        className="mr-1 mb-2 px-4"
                        color="secondary"
                        style={{ borderRadius: '20px' }}
                      >
                        Export
                      </Button>
                    </div>
                  </Col>
                </Row>
                <ReactTable
                  filterable
                  columns={columns}
                  defaultPageSize={10}
                  className="-highlight"
                  {...tableProps}
                />
              </CardBody>
            </Card>

            <Modal
              isOpen={modalForm.isOpen}
              toggle={modalForm.toggle}
              backdrop="static"
              className={className}
              size="lg"
            >
              <Formik
                initialValues={modalForm.prop.data}
                validationSchema={roleSchema}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Mechanical Electrical</ModalHeader>
                    <ModalBody>
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Jenis Gedung"
                              options={[
                                { value: 'Innovation Building', label: 'Innovation Building' },
                                { value: 'Smart Building', label: 'Smart Building' },
                              ]}
                              isRequired
                              name="jenisGedung"
                              placeholder="Pilih atau Cari Jenis Gedung"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Lantai"
                              options={[
                                { value: '1', label: 'Lantai 1' },
                                { value: '2', label: 'Lantai 2' },
                                { value: '3', label: 'Lantai 3' },
                                { value: '4', label: 'Lantai 4' },
                                { value: '5', label: 'Lantai 5' },
                                { value: '6', label: 'Lantai 6' },
                              ]}
                              isRequired
                              name="lantai"
                              placeholder="Pilih atau Cari Lantai"
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <strong>Kondisi</strong>
                      <br />
                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Smoke Detector</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="smokeDetector"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="smokeDetector"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>AC System</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="acSystem"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="acSystem"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Thermostat</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="thermostat"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="thermostat"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Telephone</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="telephone"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="telephone"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Fire Alarm</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="fireAlarm"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="fireAlarm"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Exhaust</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="exhaust" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="exhaust"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Ceiling Speaker</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="ceilingSpeaker"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="ceilingSpeaker"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Head Sprinkler</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="headSprinkler"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="headSprinkler"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>CCTV</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="cctv" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="cctv"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>MCCB</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="mccb" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="mccb"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <strong>Hydrant Box</strong>
                      <br />
                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Valves</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="valve" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="valve"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Apar</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="apar" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="apar"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Segel</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="segel" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="segel"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>PIN</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="pin" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pin"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Selang</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="selang" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="selang"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Nozle</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="nozle" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="nozle"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Hose</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="hose" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="hose"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Valves</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="valves" id="Baik" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="valves"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Pintu/Engsel</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="pintuEngsel"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pintuEngsel"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Lampu Indikator</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Baik"
                              name="lampuIndikator"
                              id="Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lampuIndikator"
                              id="Tidak Baik"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <br />
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Expired Tabung"
                              name="expiredTabung"
                              classIcon="fa fa-calendar"
                              blockLabel
                              minDate={new Date()}
                              isRequired
                              placeholder="Pilih Tanggal"
                              component={CfInputDate}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Keterangan"
                              type="text"
                              name="keterangan"
                              isRequired
                              placeholder="Masukkan Keterangan"
                              component={CfInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {ErrorMessage(message)}
                    </ModalBody>
                    <ModalFooter>
                      <Button type="button" color="secondary" onClick={modalForm.hide}>
                        Cancel
                      </Button>
                      &nbsp;
                      <Button
                        type="submit"
                        color="primary"
                        className="px-4"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting || isLoading ? (
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
          </Col>
        </Row>
      </div>
    )
  }
}

ME.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
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
  deleteRole: (id, refresh) => dispatch(deleteRole(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getRoles(p),
    Component: withToggle({
      Component: ME,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
