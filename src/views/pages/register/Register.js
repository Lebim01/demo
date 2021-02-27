import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { REGISTER } from 'src/api/auth'

const Register = (props) => {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const _addUser = async () => {
    try {
      setError('')
      await REGISTER({
        username,
        password
      })
      return true
    }catch(err){
      setError(err.response.data)
    }
    return false
  }

  const change = (e, save) => {
    save(e.target.value)
  }

  const create = () => {
    try {
      setError('')

      if(!username) throw Error('Favor de llenar el campo Username')
      if(!password) throw Error('Favor de llenar el campo Password')
      if(password !== repeatPassword) throw Error('Las conatraseñas no coinciden')

      if(_addUser()){
        props.history.push('/login?message=Usuario registrado')
      }
    }catch(err){
      setError(err.toString())
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  { error && <CAlert color="danger">{error}</CAlert> }
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => change(e, setUsername)} value={username} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={(e) => change(e, setPassword)} value={password} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" onChange={(e) => change(e, setRepeatPassword)} value={repeatPassword} />
                  </CInputGroup>
                  <CButton color="success" block onClick={create}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
