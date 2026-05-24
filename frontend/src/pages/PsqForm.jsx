import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { submitPsq } from '../api'
import Psq1Form from '../components/Psq1Form'
import Psq2Form from '../components/Psq2Form'
import Psq3Form from '../components/Psq3Form'
import Psq4Form from '../components/Psq4Form'
import Psq5Form from '../components/Psq5Form'

const FORMS = { psq1: Psq1Form, psq2: Psq2Form, psq3: Psq3Form, psq4: Psq4Form, psq5: Psq5Form }

const TITLES = {
  psq1: 'PSQ 1 – Foreign Affections',
  psq2: 'PSQ 2 – Foreign Associations',
  psq3: 'PSQ 3 – Foreign Travel',
  psq4: 'PSQ 4 – Personal Conduct',
  psq5: 'PSQ 5 – Financial Responsibilities',
}

export default function PsqForm() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const FormComponent = FORMS[type]
  if (!FormComponent) return <div style={{ padding: 40 }}>Unknown PSQ type.</div>

  const handleSubmit = async (data) => {
    setError('')
    try {
      await submitPsq(type, data)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please check your inputs.')
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
      <h2 style={{ color: '#1e3a5f', marginBottom: 8 }}>{TITLES[type]}</h2>
      {error && <p style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: 4, marginBottom: 16 }}>{error}</p>}
      {success && <p style={{ background: '#dcfce7', color: '#166534', padding: '10px 14px', borderRadius: 4, marginBottom: 16 }}>Submitted successfully! Redirecting…</p>}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 32 }}>
        <FormComponent onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
