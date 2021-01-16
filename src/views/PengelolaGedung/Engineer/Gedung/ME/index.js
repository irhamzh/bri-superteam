/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-wrap-multilines */
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
import ReactExport from 'react-export-excel'
import Service from '../../../../../config/services'
import {
  CfInput,
  CfInputDate,
  CfInputRadio,
  CfSelect,
  ListCheckboxShow,
} from '../../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../../helpers'
import {
  createEngineerGedungME,
  updateEngineerGedungME,
  deleteEngineerGedungME,
} from '../../../../../modules/engineer/actions'
import withTableFetchQuery, {
  WithTableFetchQueryProp,
} from '../../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile
class ME extends Component {
  state = {
    optJenisGedung: [],
    optLantai: [],
    isShow: false,
    columns: [],
  }

  initialValues = {
    smokeDetector: 'Baik',
    thermostat: 'Baik',
    fireAlarm: 'Baik',
    ceillingSpeaker: 'Baik',
    cctv: 'Baik',
    acSystem: 'Baik',
    telephone: 'Baik',
    exhaust: 'Baik',
    hedSprinkler: 'Baik',
    mccb: 'Baik',
    valves: 'Baik',
    segel: 'Baik',
    selang: 'Baik',
    hose: 'Baik',
    pintu: 'Baik',
    apar: 'Baik',
    pin: 'Baik',
    nozle: 'Baik',
    lampuIndikator: 'Baik',
  }

  async componentDidMount() {
    const { fetchQueryProps } = this.props

    const resDataJenisGedung = await Service.getJenisGedung()
    const dataJenisGedung = resDataJenisGedung.data.data
    const optJenisGedung = dataJenisGedung.map((row) => ({ label: row.name, value: row.id }))

    const resDataLantai = await Service.getLantai()
    const dataLantai = resDataLantai.data.data
    const optLantai = dataLantai.map((row) => ({ label: row.name, value: row.id }))

    const { tableProps } = fetchQueryProps
    const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Jenis Gedung',
        accessor: 'buildingType.name',
        show: true,
        filterable: false,
      },
      {
        Header: 'Lantai',
        accessor: 'floor.name',
        show: true,
        filterable: false,
      },
      {
        Header: 'Smoke Detector',
        accessor: 'smokeDetector',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'AC System',
        accessor: 'acSystem',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Thermostat',
        accessor: 'thermostat',
        filterable: false,
        show: true,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Telephone',
        accessor: 'telephone',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Fire Alarm',
        accessor: 'fireAlarm',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Exhaust',
        accessor: 'exhaust',
        show: true,
        filterable: false,
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Ceilling Speaker',
        accessor: 'ceillingSpeaker',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Head Sprinkler',
        accessor: 'headSprinkler',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'CCTV',
        accessor: 'cctv',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'MCCB',
        accessor: 'mccb',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
      },
      {
        Header: 'Hydrant Box',
        show: true,
        columns: [
          {
            Header: 'APAR',
            accessor: 'apar',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Segel',
            accessor: 'segel',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'PIN',
            accessor: 'pin',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Selang',
            accessor: 'selang',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Nozle',
            accessor: 'nozle',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Hose',
            accessor: 'hose',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Valves',
            accessor: 'valves',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Alarm',
            accessor: 'alarm',
            show: true,
            filterable: false,
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Pintu / Engsel',
            accessor: 'pintu',
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Lampu Indikator',
            accessor: 'lampuIndikator',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
            Cell: (props) => (props.value === 'yes' ? 'Baik' : 'Tidak Baik'),
          },
          {
            Header: 'Expired Tabung',
            accessor: 'expiredTabung',
            show: true,
            filterable: false,
            headerClassName: 'wordwrap',
          },
        ],
      },
      {
        Header: 'Keterangan',
        accessor: 'information',
        show: true,
        filterable: false,
      },
      {
        Header: 'Aksi',
        width: 150,
        show: true,
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
              color="danger"
              onClick={(e) => this.handleDelete(e, props.original)}
              className="mr-1"
              title="Delete"
            >
              <i className="fa fa-trash" />
            </Button>
          </>
        ),
      },
    ]

    this.setState({ optJenisGedung, optLantai, columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id, buildingType, floor } = values
    const { createEngineerGedungME, updateEngineerGedungME } = this.props
    if (!invalidValues.includes(id)) {
      if (buildingType && Object.keys(buildingType).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.buildingType = buildingType.id || buildingType
      }
      if (floor && Object.keys(floor).length > 0) {
        // eslint-disable-next-line no-param-reassign
        values.floor = floor.id || floor
      }
      updateEngineerGedungME(values, id, this.doRefresh)
    } else {
      createEngineerGedungME(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteEngineerGedungME } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteEngineerGedungME(id, this.doRefresh)
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

  toggleShow = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isShow: !prevState.isShow,
      }
    })
  }

  handleShowCheckbox = (e, data) => {
    const { columns } = this.state

    const selected = [...columns]
    const keyIndex = columns.indexOf(data)
    if (e.target.checked) {
      selected[keyIndex].show = true
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = true
        })
      }
    } else {
      selected[keyIndex].show = false
      if (selected[keyIndex].columns) {
        selected[keyIndex].columns.forEach(function (item) {
          item.show = false
        })
      }
    }

    this.setState({ columns: selected })
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { optJenisGedung, optLantai, isShow, columns } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Mechanical Electrical'
    // const isIcon = { paddingRight: '7px' }

    if (!auth) return <Redirect to="/login" />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card style={{ borderRadius: '20px' }}>
              <CardHeader style={{ backgroundColor: 'white', borderRadius: '20px 20px 0px 0px' }}>
                <Row>
                  <Col sm="6">
                    <Button
                      color="default"
                      className="mr-1"
                      style={{ color: '#2D69AF', fontSize: '1.1rem' }}
                    >
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
                        onClick={this.toggleShow}
                      >
                        Show
                      </Button>

                      <ExcelFile
                        filename={pageName}
                        element={
                          <Button
                            className="mr-1 mb-2 px-4"
                            color="secondary"
                            style={{ borderRadius: '20px' }}
                          >
                            Export
                          </Button>
                        }
                      >
                        <ExcelSheet data={data} name={pageName}>
                          <ExcelColumn
                            label="Jenis Gedung"
                            value={(col) => col.buildingType?.name}
                          />
                          <ExcelColumn label="Lantai" value={(col) => col.floor?.name} />
                          <ExcelColumn label="Smoke Detector" value="smokeDetector" />
                          <ExcelColumn label="AC System" value="acSystem" />
                          <ExcelColumn label="Thermostat" value="thermostat" />
                          <ExcelColumn label="Telephone" value="telephone" />
                          <ExcelColumn label="Fire Alarm" value="fireAlarm" />
                          <ExcelColumn label="Exhaust" value="exhaust" />
                          <ExcelColumn label="Ceiling Speaker" value="ceillingSpeaker" />
                          <ExcelColumn label="Head Sprinkler" value="headSprinkler" />
                          <ExcelColumn label="CCTV" value="cctv" />
                          <ExcelColumn label="MCCB" value="mccb" />
                          <ExcelColumn label="APAR" value="apar" />
                          <ExcelColumn label="Segel" value="segel" />
                          <ExcelColumn label="PIN" value="pin" />
                          <ExcelColumn label="Selang" value="selang" />
                          <ExcelColumn label="Nozle" value="nozle" />
                          <ExcelColumn label="Hose" value="hose" />
                          <ExcelColumn label="Valves" value="valves" />
                          <ExcelColumn label="Alarm" value="alarm" />
                          <ExcelColumn label="Pintu/Engsel" value="pintu" />
                          <ExcelColumn label="Lampu Indikator" value="lampuIndikator" />
                          <ExcelColumn
                            label="Expired Tabung"
                            value={(col) => formatDate(col.expiredTabung)}
                          />
                          <ExcelColumn label="Keterangan" value="information" />
                        </ExcelSheet>
                      </ExcelFile>
                    </div>
                  </Col>
                </Row>
                {/* Card Show */}
                <ListCheckboxShow
                  data={columns}
                  isShow={isShow}
                  handleShowCheckbox={this.handleShowCheckbox}
                />
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
                // validationSchema={}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    this.handleSaveChanges(values)
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ values, isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Mechanical Electrical</ModalHeader>
                    <ModalBody>
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Jenis Gedung"
                              options={optJenisGedung}
                              isRequired
                              name="buildingType"
                              placeholder="Pilih atau Cari Jenis Gedung"
                              defaultValue={
                                values.buildingType
                                  ? {
                                      value: values.buildingType.id,
                                      label: values.buildingType.name,
                                    }
                                  : null
                              }
                              component={CfSelect}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <FormGroup>
                            <Field
                              label="Lantai"
                              options={optLantai}
                              isRequired
                              name="floor"
                              placeholder="Pilih atau Cari Lantai"
                              defaultValue={
                                values.floor
                                  ? { value: values.floor.id, label: values.floor.name }
                                  : null
                              }
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="smokeDetector"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>AC System</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="acSystem" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="acSystem"
                              id="no"
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="thermostat"
                              id="no"
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="telephone"
                              id="no"
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="fireAlarm"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Exhaust</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="exhaust" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="exhaust"
                              id="no"
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
                              name="ceillingSpeaker"
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="ceillingSpeaker"
                              id="no"
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="headSprinkler"
                              id="no"
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
                            <Field label="Baik" name="cctv" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="cctv"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>MCCB</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="mccb" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="mccb"
                              id="no"
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
                            <Field label="Baik" name="valve" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="valve"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Apar</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="apar" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="apar"
                              id="no"
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
                            <Field label="Baik" name="segel" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="segel"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>PIN</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="pin" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Tidak Baik" name="pin" id="no" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Selang</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="selang" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="selang"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Nozle</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="nozle" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="nozle"
                              id="no"
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
                            <Field label="Baik" name="hose" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="hose"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <em>Valves</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="valves" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="valves"
                              id="no"
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
                            <Field label="Baik" name="pintu" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="pintu"
                              id="no"
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
                              id="yes"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="lampuIndikator"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: '15px' }}>
                        <Col>
                          <em>Alarm</em>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field label="Baik" name="alarm" id="yes" component={CfInputRadio} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Field
                              label="Tidak Baik"
                              name="alarm"
                              id="no"
                              component={CfInputRadio}
                            />
                          </FormGroup>
                        </Col>

                        <Col />
                        <Col />
                        <Col />
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
                              name="information"
                              isRequired
                              placeholder="Masukkan Keterangan"
                              component={CfInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
  createEngineerGedungME: PropTypes.func.isRequired,
  updateEngineerGedungME: PropTypes.func.isRequired,
  deleteEngineerGedungME: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.engineer.isLoading,
  message: state.engineer.message,
})

const mapDispatchToProps = (dispatch) => ({
  createEngineerGedungME: (formData, refresh) =>
    dispatch(createEngineerGedungME(formData, refresh)),
  updateEngineerGedungME: (formData, id, refresh) =>
    dispatch(updateEngineerGedungME(formData, id, refresh)),
  deleteEngineerGedungME: (id, refresh) => dispatch(deleteEngineerGedungME(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getEngineerGedungME(p),
    Component: withToggle({
      Component: ME,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
