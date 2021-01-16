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
import Service from '../../../../config/services'
import {
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../../components'
import { AlertMessage, formatDate, invalidValues } from '../../../../helpers'
import {
  createKebersihanHalaman,
  updateKebersihanHalaman,
  deleteKebersihanHalaman,
} from '../../../../modules/kebersihan/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class Halaman extends Component {
  state = {
    isShow: false,
    columns: [],
  }

  initialValues = {
    rumput: true,
    pohon: true,
    kolamIkan: true,
    airMancur: true,
    pavingBlock: true,
    sampahGulma: true,
    penyiraman: true,
    pendangiran: true,
    pemupukan: true,
    pemangkasan: true,
    pengendalianHama: true,
    penyulamanTanaman: true,
    penambahanMediaTanam: true,
  }

  componentDidMount() {
    const { fetchQueryProps } = this.props

    const { tableProps } = fetchQueryProps
    const { modalForm } = tableProps

    const columns = [
      {
        Header: 'Tanggal',
        width: 100,
        accessor: 'tanggal',
        filterable: false,
        show: true,
        Cell: (row) => <div style={{ textAlign: 'center' }}>{formatDate(row.value)}</div>,
      },
      {
        Header: 'Rumput',
        accessor: 'rumput',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pohon',
        accessor: 'pohon',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Kolam Ikan',
        accessor: 'kolamIkan',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Air Mancur',
        accessor: 'airMancur',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Paving Block',
        accessor: 'pavingBlock',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Sampah Dan Gulma',
        accessor: 'sampahGulma',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penyiraman',
        accessor: 'penyiraman',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pendangiran',
        accessor: 'pendangiran',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pemupukan',
        accessor: 'pemupukan',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pemangkasan',
        accessor: 'pemangkasan',
        show: true,
        filterable: false,
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Pengendalian Hama',
        accessor: 'pengendalianHama',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penyulaman Tanaman',
        accessor: 'penyulamanTanaman',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
      },
      {
        Header: 'Penambahan Media Tanam',
        accessor: 'penambahanMediaTanam',
        show: true,
        filterable: false,
        headerClassName: 'wordwrap',
        Cell: (row) => <IconSuccessOrFailed value={row.value} />,
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

    this.setState({ columns })
  }

  doRefresh = () => {
    const { fetchQueryProps, modalForm } = this.props
    modalForm.hide()
    fetchQueryProps.refresh()
  }

  handleSaveChanges = (values) => {
    const { id } = values
    const { createKebersihanHalaman, updateKebersihanHalaman } = this.props
    if (!invalidValues.includes(id)) {
      updateKebersihanHalaman(values, id, this.doRefresh)
    } else {
      createKebersihanHalaman(values, this.doRefresh)
    }
  }

  handleDelete = (e, state) => {
    e.preventDefault()

    const { id } = state
    const { deleteKebersihanHalaman } = this.props

    AlertMessage.warning()
      .then((result) => {
        if (result.value) {
          deleteKebersihanHalaman(id, this.doRefresh)
        } else {
          const paramsResponse = {
            title: 'Huff',
            text: 'Hampir saja kamu kehilangan data ini',
          }
          AlertMessage.info(paramsResponse)
        }
      })
      .catch((err) => {
        AlertMessage.error(err) // Internal Server Error
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
    } else {
      selected[keyIndex].show = false
    }

    this.setState({ columns: selected })
  }

  render() {
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps
    const { data } = tableProps
    const { isShow, columns } = this.state

    // const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const pageName = 'Halaman'
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
                          <ExcelColumn label="Tanggal" value={(col) => formatDate(col.tanggal)} />
                          <ExcelColumn label="Rumput" value={(col) => (col.rumput ? '✓' : '❌')} />
                          <ExcelColumn label="Pohon" value={(col) => (col.pohon ? '✓' : '❌')} />
                          <ExcelColumn
                            label="Kolam Ikan"
                            value={(col) => (col.kolamIkan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Air Mancur"
                            value={(col) => (col.airMancur ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Paving Block"
                            value={(col) => (col.pavingBlock ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Sampah dan Gulma"
                            value={(col) => (col.sampahGulma ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penyiraman"
                            value={(col) => (col.penyiraman ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pendangiran"
                            value={(col) => (col.pendangiran ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pemupukan"
                            value={(col) => (col.pemupukan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pemangkasan"
                            value={(col) => (col.pemangkasan ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Pengendalian Hama"
                            value={(col) => (col.pengendalianHama ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penyulaman Tanaman"
                            value={(col) => (col.penyulamanTanaman ? '✓' : '❌')}
                          />
                          <ExcelColumn
                            label="Penambahan Media Tanam"
                            value={(col) => (col.penambahanMediaTanam ? '✓' : '❌')}
                          />
                          <ExcelColumn label="Keterangan" value={(col) => col.information} />
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
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader toggle={modalForm.hide}>Form Halaman</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Tanggal"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          minDate={new Date()}
                          isRequired
                          placeholder="Tanggal"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <strong>Kondisi</strong>
                      <br />
                      <div style={{ marginLeft: '40px' }}>
                        <FormGroup>
                          <Field label="Rumput" name="rumput" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Pohon" name="pohon" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Kolam Ikan" name="kolamIkan" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Air Mancur" name="airMancur" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Paving Block"
                            name="pavingBlock"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Field
                            label="Sampah dan Gulma"
                            name="sampahGulma"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Penyiraman" name="penyiraman" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pendangiran"
                            name="pendangiran"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field label="Pemupukan" name="pemupukan" component={CfInputCheckbox} />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pemangkasan"
                            name="pemangkasan"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Pengendalian Hama"
                            name="pengendalianHama"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Penyulaman Tanaman"
                            name="penyulamanTanaman"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            label="Penambahan Media Tanam"
                            name="penambahanMediaTanam"
                            component={CfInputCheckbox}
                          />
                        </FormGroup>
                      </div>

                      <br />
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
                          'Save Changes'
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

Halaman.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createKebersihanHalaman: PropTypes.func.isRequired,
  updateKebersihanHalaman: PropTypes.func.isRequired,
  deleteKebersihanHalaman: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.kebersihan.isLoading,
  message: state.kebersihan.message,
})

const mapDispatchToProps = (dispatch) => ({
  createKebersihanHalaman: (formData, refresh) =>
    dispatch(createKebersihanHalaman(formData, refresh)),
  updateKebersihanHalaman: (formData, id, refresh) =>
    dispatch(updateKebersihanHalaman(formData, id, refresh)),
  deleteKebersihanHalaman: (id, refresh) => dispatch(deleteKebersihanHalaman(id, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getKebersihanHalaman(p),
    Component: withToggle({
      Component: Halaman,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
