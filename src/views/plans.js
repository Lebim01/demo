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
import { useDispatch, useSelector } from 'react-redux'
import { removePlan } from 'src/redux/actions/plans'

const fields = ['name', 'inv_min', 'inv_max', 'tax', 'duration', 'actions']

const Tables = (props) => {
    const dispatch = useDispatch()
    const plans = useSelector(state => state.plans.plans)

    const goToAdd = () => {
        props.history.push('/plans/form/')
    }

    const edit = (uuid) => {
        props.history.push('/plans/form/'+uuid)
    }

    const remove = (uuid) => {
        dispatch(removePlan(uuid))
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
                                                <CButton color="info" onClick={() => edit(item.uuid)}>
                                                    Editar
                                                </CButton>
                                                {' '}
                                                <CButton color="danger" onClick={() => remove(item.uuid)}>
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
