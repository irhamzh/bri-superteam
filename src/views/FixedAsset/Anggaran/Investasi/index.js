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
import Select from 'react-select'
import Service from '../../../../config/services'
import { CfInputDate, CfInputFile } from '../../../../components'
import { formatDate } from '../../../../helpers'
import { uploadAnggaranInvestasi } from '../../../../modules/anggaran/investasi/actions'
import withTableFetchQuery, { WithTableFetchQueryProp } from '../../../../HOC/withTableFetchQuery'
import withToggle, { WithToggleProps } from '../../../../HOC/withToggle'

class InvestasiAnggaran extends Component {
  state = {
    tahun: '',
    bulan: '',
    optBulan: [
      { label: 'Januari', value: '1' },
      { label: 'Februari', value: '2' },
      { label: 'Maret', value: '3' },
      { label: 'April', value: '4' },
      { label: 'Mei', value: '5' },
      { label: 'Juni', value: '6' },
      { label: 'Juli', value: '7' },
      { label: 'Agustus', value: '8' },
      { label: 'September', value: '9' },
      { label: 'Oktober', value: '10' },
      { label: 'November', value: '11' },
      { label: 'Desember', value: '12' },
    ],
    optTahun: [
      { label: '2015', value: '2015' },
      { label: '2016', value: '2016' },
      { label: '2017', value: '2017' },
      { label: '2018', value: '2018' },
      { label: '2019', value: '2019' },
      { label: '2020', value: '2020' },
      { label: '2021', value: '2021' },
      { label: '2022', value: '2022' },
      { label: '2023', value: '2023' },
      { label: '2024', value: '2024' },
      { label: '2025', value: '2025' },
      { label: '2026', value: '2026' },
    ],
  }

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
    const { uploadAnggaranInvestasi } = this.props

    uploadAnggaranInvestasi(values, this.doRefresh)
  }

  handleChangeSelect = (name, value) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.doRefresh()
      }
    )
  }

  render() {
    const { optBulan, optTahun, tahun, bulan } = this.state
    const { isLoading, auth, className, fetchQueryProps, modalForm } = this.props
    const { tableProps } = fetchQueryProps

    const numbData = (props) => tableProps.pageSize * tableProps.page + props.index + 1

    const columns = [
      {
        Header: 'No.',
        width: 50,
        // accessor: `none`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{numbData(props)}</p>,
      },
      {
        Header: 'Tanggal',
        accessor: `tanggal`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{formatDate(props.value)}</p>,
      },
      {
        Header: 'Kode',
        accessor: `kode`,
        filterable: false,
        Cell: (props) => <p style={{ textAlign: 'center' }}>{props.value}</p>,
      },
      {
        Header: 'Deskripsi',
        accessor: `deskripsi`,
        filterable: false,
        width: 200,
        headerClassName: 'wordwrap',
        Cell: (props) => <p className="wordwrap">{props.value}</p>,
      },
      {
        Header: 'BRI CORPU',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'briCorpuBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'briCorpuSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'briCorpu',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Medan',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusMedanBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusMedanSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusMedan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Padang',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusPadangBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusPadangSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusPadang',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Jakarta',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusJakartaBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusJakartaSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusJakarta',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Bandung',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusBandungBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusBandungSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusBandung',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Yogyakarta',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusYogyakartaSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusYogyakarta',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Surabaya',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusSurabayaBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusSurabayaSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusSurabaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Campus Makassar',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'campusMakassarBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'campusMakassarSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'campusMakassar',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },

      {
        Header: 'Total Campus',
        filterable: false,
        columns: [
          {
            Header: 'Breakdown Anggaran Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownAnggaranBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Jumlah (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownAnggaranJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Breakdown Anggaran Total Biaya (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownAnggaranTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Biaya Satuan (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownRealisasiBiayaSatuan',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Jumlah (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownRealisasiJumlah',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Realisasi Total Biaya (Rp)',
            filterable: false,
            accessor: 'totalCampusBreakdownRealisasiTotalBiaya',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: 'Sisa Anggaran (Rp)',
            filterable: false,
            accessor: 'totalCampusSisaAnggaran',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
          {
            Header: '%',
            filterable: false,
            accessor: 'totalCampus',
            headerClassName: 'wordwrap',
            Cell: (row) => <p style={{ textAlign: 'center' }}>{row.value}</p>,
          },
        ],
      },
    ]

    const pageName = 'Investasi Anggaran'
    const isIcon = { paddingRight: '7px' }

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
                        <i className="fa fa-plus" style={isIcon} />
                        &nbsp;Upload
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="2">
                    <Select
                      // isClearable
                      onChange={(v) => this.handleChangeSelect('bulan', v)}
                      options={optBulan}
                      value={bulan}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Bulan"
                    />
                  </Col>

                  <Col sm="2">
                    <Select
                      // isClearable
                      onChange={(v) => this.handleChangeSelect('tahun', v)}
                      options={optTahun}
                      value={tahun}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Tahun"
                    />
                  </Col>

                  <Col sm="8">
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
                <br />
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
                    <ModalHeader toggle={modalForm.hide}>Upload File</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Field
                          label="Bulan/Tahun"
                          name="tanggal"
                          classIcon="fa fa-calendar"
                          blockLabel
                          // minDate={new Date()}
                          isRequired
                          placeholder="Pilih Tanggal"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          dateFormat="MM/yyyy"
                          component={CfInputDate}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Field label="File Excel" name="excel" isRequired component={CfInputFile} />
                      </FormGroup>

                      {/* {ErrorMessage(message)} */}
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

InvestasiAnggaran.propTypes = {
  auth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  uploadAnggaranInvestasi: PropTypes.func.isRequired,
  fetchQueryProps: WithTableFetchQueryProp,
  modalForm: WithToggleProps,
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  isLoading: state.anggaranInvestasi.isLoading,
  message: state.anggaranInvestasi.message,
})

const mapDispatchToProps = (dispatch) => ({
  uploadAnggaranInvestasi: (formData, refresh) =>
    dispatch(uploadAnggaranInvestasi(formData, refresh)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTableFetchQuery({
    API: (p) => Service.getAnggaranInvestasi(p),
    Component: withToggle({
      Component: InvestasiAnggaran,
      toggles: {
        modalForm: false,
      },
    }),
  })
)
