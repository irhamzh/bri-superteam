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
import Service from '../../../config/services'
import {
  CfInput,
  CfInputCheckbox,
  CfInputDate,
  CfInputMultiFile,
  CfSelect,
  IconSuccessOrFailed,
  ListCheckboxShow,
} from '../../../components'
import { AlertMessage, invalidValues, formatDate, formatCurrencyIDR } from '../../../helpers'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../HOC/withToggle'
import {
    createDailyActivities,
    deleteDailyActivities,
    updateDailyActivities,
} from '../../../modules/daily_activities/actions'

// Export
const { ExcelFile } = ReactExport
const { ExcelSheet } = ReactExport.ExcelFile
const { ExcelColumn } = ReactExport.ExcelFile

class FIDailyActivities extends Component{
    state = {
        isShow: false,
        columns: [],
    }

    initialValues = {}

    componentDidMount(){

        // const { fetchQueryProps } = this.props
        //     fetchQueryProps.setFilteredByObject({
        //     typePendidikan: 'Non Pendidikan',
        //     seksi: 'Fixed Asset',
        //     })
        // const  { fetchQueryProps } = this.props
        // const { tableProps } = fetchQueryProps

        // const numbData = (row) => tableProps.pageSize * tableProps.page + row.index + 1

        const columns = [
            {
                Header: 'Activity',
                accessor: 'activity',
                show: true,
                filterable: false,
                headerClassName: 'wordwrap',
                Cell: (row) => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>),
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
        // const { activity } = values

        const { createDailyActivities } = this.props

        const newObject = {...values, isChecked: false, dept: 'financial_admin', }

        console.log("newObjectt = "+ newObject)
        // if (!invalidValues.includes(id)) {
        //     updateFIPayment(values, id, this.doRefresh)
        // } else {
        // }
        // doRefresh()
        createDailyActivities(newObject, this.doRefresh)
    }


    handleCheck = (e, state) => {
        e.preventDefault()

        
        var { id } = state
        var { activity } = state
        var { dept } = state
        var { isChecked } = state
        var {createdAt} = state


        isChecked = true
  
        const newObject = {...state, isChecked: true}

        console.log(newObject)
        
        // const newObjectTemp = {id, activity, dept, isChecked, createdAt}
        
        // const newObject = Object.create(newObjectTemp)
        
        // console.log(newObjectTemp)
        
        // var { id } = state
        // var { activity } = state
        // var { dept } = state
        // var { isChecked } = state
        
        const { updateDailyActivities } = this.props
        
        // updateDailyActivities(state, id, this.doRefresh)
        
        if (!invalidValues.includes(id)) {
            console.log("masuk if")
            updateDailyActivities(newObject, id, this.doRefresh)
        }
        // console.log("id = " + id);
        // console.log("activity = " + activity);
        // console.log("dept = " + dept);
        // console.log("isChecked = " + isChecked);
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

    render(){
        const  { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
        const { tableProps } = fetchQueryProps
        const { data } = tableProps
        const { isShow, columns } = this.state

        const numbData = (row) => tableProps.pageSize * tableProps.page + row.index + 1

        const tableCols = [
            {
                Header: '#',
                width: 60,
                filterable: false,
                Cell: (row) => <div style={{ textAlign: 'center' }}>{numbData(row)}</div>,
            },
            ...columns,
            {
                Header: 'Checklist',
                // accessor: 'checklist',
                show: true,
                width: 180,
                filterable: false,
                // headerClassName: 'wordwrap',
                Cell: (props) => 
                props.original.isChecked ? 
                <>
                    <div style={{ 
                            marginLeft: 78,
                            }}>
                        <i className="fa fa-check" /> 
                    </div> 
                </> 
                :
                <>
                    <div style={{ 
                            marginLeft: 65,
                            }}>
                        <Button
                        color="success"
                        onClick={(e) => this.handleCheck( e, props.original )}
                        className="mr-1"
                        title="check"
                        >
                        <i className="fa fa-check" />
                        </Button>  
                    </div>      
                </>,
            },
        ]

        const pageName = "Daily Activities"

        // if (!auth) return <Redirect to="/login" />
        
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card style={{borderRadius: '20px'}}>
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
                                            Tambah Aktivitas
                                        </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12">
                                        <div style={{textAlign: 'right'}}>
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
                                                <ExcelColumn label="No" value="no" />
                                                <ExcelColumn label="Activity" value="activity" />
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
                                columns={tableCols}
                                // defaultPageSize={10}
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
                                <ModalHeader toggle={modalForm.hide}>Tambah Aktivitas</ModalHeader>
                                <ModalBody>
                                <FormGroup>
                                    <Field
                                    label="Aktivitas"
                                    type="text"
                                    name="activity"
                                    isRequired
                                    placeholder="Masukkan Aktivitas"
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

FIDailyActivities.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  createDailyActivities: PropTypes.func.isRequired,
//   deleteEvaluasiKlinik: PropTypes.func.isRequired,
  updateDailyActivities: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}


const mapStateToProps = (state) => ({
    auth: state.auth.authenticated,
    isLoading: state.dailyActivitiesModules.isLoading,
    message: state.dailyActivitiesModules.message,
  })
  
const mapDispatchToProps = (dispatch) => ({
  createDailyActivities: (formData, refresh) => dispatch(createDailyActivities(formData, refresh)),
  updateDailyActivities: (formData, id, refresh) =>  dispatch(updateDailyActivities(formData, id, refresh)),
// deleteFIPayment: (id, refresh) => dispatch(deleteFIPayment(id, refresh)),
})
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(
withTableFetchQuery({
    API: (p) => Service.getDailyActivitiesByName("financial_admin"),
    // console.log
    Component: withToggle({
        Component: FIDailyActivities,
        toggles: {
            modalForm: false,
        },
    }),
})
)
