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
import moment from 'moment'

const round = (number) => {
    return Math.round(number * 100) / 100
}

const Tables = (props) => {
    const [plan, setPlan] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] = useState([])

    const plans = []
    const _getPlan = () => {

    }

    const change = save => e => {
        save(e.target.value)
    }

    const calculate = () => {
        try {
            setError('')
            if(!plan) throw Error('Seleccione un plan')
            if(!amount > 0) throw Error('El monto debe ser mayor a 0')
            if(!date) throw Error('Seleccione un fecha')

            const _plan = _getPlan(plan)
            
            let _result = []
            let _amount = Number(amount)
            let _date = moment(date)

            for(let i = 1; i < Number(_plan.duration); i++){
                const performance = round(_amount * (Number(_plan.tax) / 100))
                _result.push({
                    name: i === 1
                        ? _plan.name
                        : '',
                    date: _date.format("YYYY/MM/DD"),
                    tax: `${_plan.tax}%`,
                    init_amount: _amount,
                    performance
                })
                _amount = round(_amount + performance)
                _date = _date.add(1, 'month')
            }

            _result.push({
                name: 'TOTAL, FINAL',
                date: _date.format("YYYY/MM/DD"),
                tax: `${_plan.tax}%`,
                init_amount: _amount,
            })

            setResult(_result)
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
