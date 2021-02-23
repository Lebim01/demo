import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CAlert
} from '@coreui/react'

const Form = (props) => {
    const [uuid] = useState(props.match.params.uuid)
    const [error, setError] = useState('')
    const [data, setData] = useState({
        name: '',
        inv_min: 0,
        inv_max: 0,
        tax: 0,
        duration: 0
    })
    
    const _getPlan = () => {

    }

    useEffect(() => {
        if(uuid){
            setData(_getPlan(uuid))
        }else{
            setData({})
        }
    }, [uuid])

    const change = name => e => {
        setData(data => ({
            ...data,
            [name]: e.target.value
        }))
    }

    const save = () => {
        try {
            setError('')

            if(!data.name) throw Error('El nombre no puede ser vacio')
            if(!data.inv_min > 0) throw Error('La inversión mínima no puede ser vacia o cero')
            if(!data.inv_max > 0) throw Error('La inversión máxima no puede ser vacia o cero')
            if(Number(data.inv_max) < Number(data.inv_min)) throw Error('La inversión máxima no pueder ser menor a la mínima')
            if(!data.tax > 0) throw Error('La tasa mensual no puede ser vacia o cero')
            if(!data.duration > 0) throw Error('El duración no puede ser vacia o cero')

            if(data.uuid){

            }
            else{

            }
                
            cancel()
        }catch(err){
            setError(err.toString())
        }
    }
    
    const cancel = () => props.history.push('/plans')

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Agregar plan
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Nombre</CLabel>
                                        <CInput id="name" placeholder="Nombre del plan" required value={data.name} onChange={change('name')} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="inv_min">Inv. Mínima ($)</CLabel>
                                        <CInput id="inv_min" placeholder="($)" required type="number" value={data.inv_min} onChange={change('inv_min')} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="inv_max">Inv. Máxima ($)</CLabel>
                                        <CInput id="inv_max" placeholder="($)" required type="number" value={data.inv_max} onChange={change('inv_max')} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="tax">Tasa Mensual (%)</CLabel>
                                        <CInput id="tax" placeholder="(%)" required type="number" value={data.tax} onChange={change('tax')} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="duration">Duración del plan (Meses)</CLabel>
                                        <CInput id="duration" placeholder="Meses" required type="number" value={data.duration} onChange={change('duration')} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            { error && <CAlert className="text-center" color="danger">{error}</CAlert> }
                            <CButton color="secondary" onClick={cancel}>
                                Cancelar
                            </CButton>
                            {' '}
                            <CButton color="success" onClick={save}>
                                Guardar
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Form