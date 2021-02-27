import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'
import { GET_PLANS, DELETE_PLAN } from 'src/api/plans'
import { useEffect } from 'react'
import { useState } from 'react'

const fields = ['name', 'inv_min', 'inv_max', 'tax', 'duration', 'actions']

const Tables = (props) => {
    const [ plans, setPlans ] = useState([])

    useEffect(() => {
        getPlans()
    }, [])

    const getPlans = async () => {
        const res = await GET_PLANS()
        setPlans(res.data)
    }

    const goToAdd = () => {
        props.history.push('/plans/form/')
    }

    const edit = (item) => {
        props.history.push('/plans/form/'+item.uuid)
    }

    const remove = async (item) => {
        await DELETE_PLAN(item.uuid)
        getPlans()
    }

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Planes de inversión
                            <CButton color="info" className="float-right" onClick={goToAdd}>
                                Agregar
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={plans}
                                fields={fields}
                                itemsPerPage={5}
                                pagination
                                columnHeaderSlot={{
                                    'name': 'Nombre',
                                    'inv_min': 'Inv. Minima ($)',
                                    'inv_max': 'Inv. Maxima ($)',
                                    'tax': 'Tasa Mensual (%)',
                                    'duration': 'Duración del plan (Meses)',
                                }}
                                scopedSlots = {{
                                    'actions':
                                        (item) => (
                                            <td>
                                                <CButton color="info" onClick={() => edit(item)}>
                                                    Editar
                                                </CButton>
                                                {' '}
                                                <CButton color="danger" onClick={() => remove(item)}>
                                                    Eliminar
                                                </CButton>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Tables
