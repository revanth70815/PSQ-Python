import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api'
import { useAuth } from '../App'

export default function Login() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await login(form)
      setUser(data)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password.')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <button style={styles.btn} type="submit">Log In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.9rem' }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 50px)', background: '#f3f4f6' },
  card: { background: '#fff', padding: '40px 36px', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.12)', width: 360 },
  title: { margin: '0 0 24px', textAlign: 'center', color: '#1e3a5f' },
  form: { display: 'flex', flexDirection: 'column', gap: 10 },
  label: { fontSize: '0.85rem', fontWeight: 600, color: '#374151' },
  input: { padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 4, fontSize: '0.95rem' },
  btn: { marginTop: 8, padding: '10px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 },
  error: { background: '#fee2e2', color: '#b91c1c', padding: '8px 12px', borderRadius: 4, fontSize: '0.9rem' },
}
