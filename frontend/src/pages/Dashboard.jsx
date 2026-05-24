import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNomineeDashboard, getOfficerDashboard } from '../api'
import { useAuth } from '../App'

const PSQ_LABELS = {
  psq1: 'PSQ 1 – Foreign Affections',
  psq2: 'PSQ 2 – Foreign Associations',
  psq3: 'PSQ 3 – Foreign Travel',
  psq4: 'PSQ 4 – Personal Conduct',
  psq5: 'PSQ 5 – Financial Responsibilities',
}

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch = user?.role === 'security_officer' ? getOfficerDashboard : getNomineeDashboard
    fetch().then(r => setData(r.data)).catch(() => {})
  }, [user])

  if (!data) return <div style={{ padding: 40 }}>Loading…</div>

  if (user?.role === 'security_officer') return <OfficerView nominees={data} />
  return <NomineeView data={data} />
}

function NomineeView({ data }) {
  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>My PSQ Submissions</h2>
      {Object.entries(PSQ_LABELS).map(([key, label]) => (
        <div key={key} style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>{label}</h3>
            <Link to={`/psq/${key}`} style={styles.btn}>+ New Submission</Link>
          </div>
          {data.submissions[key].length === 0
            ? <p style={styles.empty}>No submissions yet.</p>
            : (
              <table style={styles.table}>
                <thead><tr>
                  <th style={styles.th}>Submission Date</th>
                  <th style={styles.th}>Reported to Officer</th>
                  <th style={styles.th}>Recorded</th>
                </tr></thead>
                <tbody>
                  {data.submissions[key].map(s => (
                    <tr key={s.id}>
                      <td style={styles.td}>{s.submission_date}</td>
                      <td style={styles.td}>
                        {s.reported_to_security_officer === true ? <span style={{ color: '#16a34a' }}>Yes</span>
                          : s.reported_to_security_officer === false ? <span style={{ color: '#dc2626' }}>No</span>
                          : '—'}
                      </td>
                      <td style={{ ...styles.td, color: '#6b7280' }}>{s.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      ))}
    </div>
  )
}

function OfficerView({ nominees }) {
  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Security Officer Dashboard</h2>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>All Nominees</h3>
        {nominees.length === 0
          ? <p style={styles.empty}>No nominees registered yet.</p>
          : (
            <table style={styles.table}>
              <thead><tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                {Object.values(PSQ_LABELS).map(l => <th key={l} style={styles.th}>{l.split('–')[0].trim()}</th>)}
              </tr></thead>
              <tbody>
                {nominees.map(({ user, counts }) => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    {Object.keys(PSQ_LABELS).map(k => <td key={k} style={{ ...styles.td, textAlign: 'center' }}>{counts[k]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  )
}

const styles = {
  page: { maxWidth: 900, margin: '0 auto', padding: '32px 16px' },
  heading: { color: '#1e3a5f', marginBottom: 24 },
  card: { background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 24, marginBottom: 20 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { margin: 0, color: '#1f2937', fontSize: '1rem' },
  btn: { background: '#1e3a5f', color: '#fff', padding: '6px 14px', borderRadius: 4, textDecoration: 'none', fontSize: '0.85rem' },
  empty: { color: '#9ca3af', fontSize: '0.9rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  th: { textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '8px 12px', borderBottom: '1px solid #f3f4f6' },
}
