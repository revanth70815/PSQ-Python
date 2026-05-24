import { useState } from 'react'
import { Field, Fieldset, RadioGroup, SubmitBtn, input, today } from './FormHelpers'

const PURPOSES = [
  { value: '1', label: '1 – Personal vacation/tourism' },
  { value: '2', label: '2 – Family visit' },
  { value: '3', label: '3 – Business' },
  { value: '4', label: '4 – Education' },
  { value: '5', label: '5 – Medical' },
  { value: '6', label: '6 – Government/military' },
  { value: '7', label: '7 – Other' },
]

export default function Psq3Form({ onSubmit }) {
  const [f, setF] = useState({
    submission_date: today(), reported_to_security_officer: null, reported_date: '', reported_date_estimated: false,
    purpose_code: '', purpose_other_explanation: '', travel_month_year: '', number_of_days: '',
    countries_and_cities: '', deviated_from_itinerary: null, deviation_explanation: '',
    questioned_or_detained: null, questioned_detained_explanation: '',
    police_or_security_encounter: null, police_encounter_explanation: '',
    contact_with_foreign_intelligence: null, foreign_intelligence_explanation: '',
    excessive_interest_in_job: null, excessive_interest_explanation: '',
    attempt_to_obtain_classified_info: null, classified_info_explanation: '',
    threatened_or_coerced: null, coercion_explanation: '', remarks: '',
  })

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const bool = (v) => v === null ? '' : v ? 'yes' : 'no'
  const setBool = (k, v) => set(k, v === '' ? null : v === 'yes')

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(f) }

  const YesNoField = ({ name, label, explainKey }) => (
    <Fieldset legend={label}>
      <RadioGroup name={name} value={bool(f[name])} onChange={v => setBool(name, v)}
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
      {f[name] && <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Explain" value={f[explainKey]} onChange={e => set(explainKey, e.target.value)} />}
    </Fieldset>
  )

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 20 }}>
        Report all non-official foreign travel since your last investigation or annual update.
      </p>

      <Field label="Submission Date" required>
        <input style={input} type="date" required value={f.submission_date} onChange={e => set('submission_date', e.target.value)} />
      </Field>

      <Fieldset legend="Reported to Security Officer?">
        <RadioGroup name="reported" value={bool(f.reported_to_security_officer)} onChange={v => setBool('reported_to_security_officer', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        <Field label="Date reported"><input style={input} type="date" value={f.reported_date} onChange={e => set('reported_date', e.target.value)} /></Field>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
          <input type="checkbox" checked={f.reported_date_estimated} onChange={e => set('reported_date_estimated', e.target.checked)} />
          Date is estimated
        </label>
      </Fieldset>

      <h3 style={{ color: '#1e3a5f', fontSize: '1rem', margin: '20px 0 12px' }}>Travel Details</h3>

      <Field label="Purpose of Travel">
        <select style={input} value={f.purpose_code} onChange={e => set('purpose_code', e.target.value)}>
          <option value="">Select…</option>
          {PURPOSES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        {f.purpose_code === '7' && (
          <input style={{ ...input, marginTop: 8 }} placeholder="Explain other purpose" value={f.purpose_other_explanation} onChange={e => set('purpose_other_explanation', e.target.value)} />
        )}
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Month/Year of Travel" required>
          <input style={input} required placeholder="e.g. March 2025" value={f.travel_month_year} onChange={e => set('travel_month_year', e.target.value)} />
        </Field>
        <Field label="Number of Days" required>
          <input style={input} type="number" min="1" required value={f.number_of_days} onChange={e => set('number_of_days', e.target.value)} />
        </Field>
      </div>

      <Field label="Countries and Cities Visited" required>
        <textarea style={{ ...input, minHeight: 60 }} required placeholder="List all countries and cities" value={f.countries_and_cities} onChange={e => set('countries_and_cities', e.target.value)} />
      </Field>

      <h3 style={{ color: '#1e3a5f', fontSize: '1rem', margin: '20px 0 12px' }}>Security Incidents</h3>

      <YesNoField name="deviated_from_itinerary" label="Did you deviate from your planned itinerary?" explainKey="deviation_explanation" />
      <YesNoField name="questioned_or_detained" label="Were you questioned or detained by any authorities?" explainKey="questioned_detained_explanation" />
      <YesNoField name="police_or_security_encounter" label="Did you have contact with police or security forces?" explainKey="police_encounter_explanation" />
      <YesNoField name="contact_with_foreign_intelligence" label="Did you have contact with foreign intelligence or security services?" explainKey="foreign_intelligence_explanation" />
      <YesNoField name="excessive_interest_in_job" label="Did anyone show excessive interest in your job or workplace?" explainKey="excessive_interest_explanation" />
      <YesNoField name="attempt_to_obtain_classified_info" label="Did anyone attempt to obtain classified information from you?" explainKey="classified_info_explanation" />
      <YesNoField name="threatened_or_coerced" label="Were you threatened or coerced in any way?" explainKey="coercion_explanation" />

      <Field label="Remarks">
        <textarea style={{ ...input, minHeight: 80 }} value={f.remarks} onChange={e => set('remarks', e.target.value)} />
      </Field>

      <SubmitBtn />
    </form>
  )
}
