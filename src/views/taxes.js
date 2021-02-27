import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CAlert
} from '@coreui/react'
import { useEffect } from 'react'
import { GET_PLANS, REPORT_PLAN } from 'src/api/plans'

const Tables = (props) => {
    const [plan, setPlan] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] = useState([])
    const [plans, setPlans] = useState([])

    useEffect(() => {
        getPlans()
    }, [])

    const getPlans = async () => {
        const res = await GET_PLANS()
        setPlans(res.data)
    }

    const change = save => e => {
        save(e.target.value)
    }

    const calculate = async () => {
        try {
            setError('')
            if(!plan) throw Error('Seleccione un plan')
            if(!amount > 0) throw Error('El monto debe ser mayor a 0')
            if(!date) throw Error('Seleccione un fecha')

            const res = await REPORT_PLAN(plan, { init_date: date, amount })
            setResult(res.data)
        }catch(err){
            setError(err.toString())
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Tabla de Rendimientos
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <CLabel htmlFor="ccplan">Plan</CLabel>
                                        <CSelect custom name="ccplan" id="ccplan" value={plan} onChange={change(setPlan)}>
                                            <option value="">Seleccione</option>
                                            {plans.map((p, i) => 
                                                <option key={i} value={p.uuid}>{p.name}</option>
                                            )}
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <CLabel htmlFor="ccamount">Monto</CLabel>
                                        <CInput custom name="ccamount" id="ccamount" value={amount} onChange={change(setAmount)} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="3">
                                    <CFormGroup row>
                                        <CLabel htmlFor="date-input">Date Input</CLabel>
                                        <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={change(setDate)} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="3">
                                    <CButton className="h-100 w-100" color="primary" onClick={calculate}>
                                        Ver tabla
                                    </CButton>
                                </CCol>
                            </CRow>
                            {error && 
                                <>
                                    <br />
                                    <CAlert color="danger">{error}</CAlert>
                                </>
                            }

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>PLAN</th>
                                        <th>FECHA</th>
                                        <th>TASA %</th>
                                        <th>MONTO INICIAL</th>
                                        <th>RENDIMIENTO GANADO</th>
                                        <th>PLAZO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((r, i) => 
                                        <tr key={i}>
                                            <td>{r.name}</td>
                                            <td>{r.date}</td>
                                            <td>{r.tax}</td>
                                            <td>{r.init_amount}</td>
                                            <td>{r.performance}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Tables
