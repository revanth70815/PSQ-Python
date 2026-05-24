import { useState } from 'react'
import { Field, Fieldset, RadioGroup, SubmitBtn, input, today } from './FormHelpers'

const CONTACT_METHODS = ['Phone', 'Email', 'In-person', 'Social media', 'Mail', 'Other']
const FREQ_OPTIONS = [
  { value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }, { value: 'annually', label: 'Annually' }, { value: 'other', label: 'Other' },
]

export default function Psq1Form({ onSubmit }) {
  const [f, setF] = useState({
    submission_date: today(), is_dual_citizen: false, dual_citizen_country: '',
    reported_to_security_officer: null, reported_date: '', reported_date_estimated: false,
    foreign_national_name: '', country_of_birth: '', relationship_to_nominee: '',
    citizenship_countries: '', current_address: '', initial_contact: '',
    visited_us: null, last_visit_us_date: '', occupation: '',
    contact_frequency: '', contact_frequency_other: '', contact_methods: [],
    contact_method_other_explanation: '', expressed_interest_in_job: null,
    interest_in_job_explanation: '', foreign_gov_affiliation: '',
    foreign_gov_affiliation_description: '', financial_material_emotional_ties: null,
    ties_description: '', marriage_date: '', cohabitation_start_date: '', remarks: '',
  })

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const toggleMethod = (m) => set('contact_methods', f.contact_methods.includes(m) ? f.contact_methods.filter(x => x !== m) : [...f.contact_methods, m])

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(f) }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 20 }}>
        Complete for each immediate family member who claims foreign or dual citizenship.
      </p>

      <Field label="Submission Date" required>
        <input style={input} type="date" required value={f.submission_date} onChange={e => set('submission_date', e.target.value)} />
      </Field>

      <Fieldset legend="Dual Citizenship">
        <RadioGroup name="is_dual_citizen" value={f.is_dual_citizen ? 'yes' : 'no'}
          onChange={v => set('is_dual_citizen', v === 'yes')}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.is_dual_citizen && (
          <Field label="Country of dual citizenship">
            <input style={input} value={f.dual_citizen_country} onChange={e => set('dual_citizen_country', e.target.value)} />
          </Field>
        )}
      </Fieldset>

      <Fieldset legend="Reported to Security Officer?">
        <RadioGroup name="reported" value={f.reported_to_security_officer === null ? '' : f.reported_to_security_officer ? 'yes' : 'no'}
          onChange={v => set('reported_to_security_officer', v === 'yes')}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
          <Field label="Date reported">
            <input style={input} type="date" value={f.reported_date} onChange={e => set('reported_date', e.target.value)} />
          </Field>
          <Field label=" ">
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', marginTop: 4 }}>
              <input type="checkbox" checked={f.reported_date_estimated} onChange={e => set('reported_date_estimated', e.target.checked)} />
              Date is estimated
            </label>
          </Field>
        </div>
      </Fieldset>

      <h3 style={{ color: '#1e3a5f', fontSize: '1rem', margin: '20px 0 12px' }}>Foreign Relation Information</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Name of Foreign National" required>
          <input style={input} required value={f.foreign_national_name} onChange={e => set('foreign_national_name', e.target.value)} />
        </Field>
        <Field label="Country of Birth" required>
          <input style={input} required value={f.country_of_birth} onChange={e => set('country_of_birth', e.target.value)} />
        </Field>
        <Field label="Relationship to Nominee" required>
          <input style={input} required value={f.relationship_to_nominee} onChange={e => set('relationship_to_nominee', e.target.value)} />
        </Field>
        <Field label="Citizenship Countries" required>
          <input style={input} required value={f.citizenship_countries} onChange={e => set('citizenship_countries', e.target.value)} />
        </Field>
      </div>

      <Field label="Current Address" required>
        <textarea style={{ ...input, minHeight: 60 }} required value={f.current_address} onChange={e => set('current_address', e.target.value)} />
      </Field>
      <Field label="How did you first make contact?" required>
        <textarea style={{ ...input, minHeight: 60 }} required value={f.initial_contact} onChange={e => set('initial_contact', e.target.value)} />
      </Field>
      <Field label="Occupation">
        <input style={input} value={f.occupation} onChange={e => set('occupation', e.target.value)} />
      </Field>

      <Fieldset legend="Has this person visited the U.S.?">
        <RadioGroup name="visited_us" value={f.visited_us === null ? '' : f.visited_us ? 'yes' : 'no'}
          onChange={v => set('visited_us', v === 'yes')}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.visited_us && (
          <Field label="Date of last U.S. visit">
            <input style={input} type="date" value={f.last_visit_us_date} onChange={e => set('last_visit_us_date', e.target.value)} />
          </Field>
        )}
      </Fieldset>

      <Field label="Contact Frequency">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          {FREQ_OPTIONS.map(o => (
            <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <input type="radio" name="contact_frequency" value={o.value} checked={f.contact_frequency === o.value} onChange={() => set('contact_frequency', o.value)} />
              {o.label}
            </label>
          ))}
        </div>
        {f.contact_frequency === 'other' && (
          <input style={{ ...input, marginTop: 8 }} placeholder="Please specify" value={f.contact_frequency_other} onChange={e => set('contact_frequency_other', e.target.value)} />
        )}
      </Field>

      <Field label="Contact Methods">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          {CONTACT_METHODS.map(m => (
            <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={f.contact_methods.includes(m)} onChange={() => toggleMethod(m)} />
              {m}
            </label>
          ))}
        </div>
        {f.contact_methods.includes('Other') && (
          <input style={{ ...input, marginTop: 8 }} placeholder="Explain other contact method" value={f.contact_method_other_explanation} onChange={e => set('contact_method_other_explanation', e.target.value)} />
        )}
      </Field>

      <Fieldset legend="Has this person expressed interest in your job or workplace?">
        <RadioGroup name="expressed_interest" value={f.expressed_interest_in_job === null ? '' : f.expressed_interest_in_job ? 'yes' : 'no'}
          onChange={v => set('expressed_interest_in_job', v === 'yes')}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.expressed_interest_in_job && (
          <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Explain" value={f.interest_in_job_explanation} onChange={e => set('interest_in_job_explanation', e.target.value)} />
        )}
      </Fieldset>

      <Field label="Foreign Government Affiliation">
        <select style={input} value={f.foreign_gov_affiliation} onChange={e => set('foreign_gov_affiliation', e.target.value)}>
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unknown">Unknown</option>
        </select>
        {f.foreign_gov_affiliation === 'yes' && (
          <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Describe affiliation" value={f.foreign_gov_affiliation_description} onChange={e => set('foreign_gov_affiliation_description', e.target.value)} />
        )}
      </Field>

      <Fieldset legend="Financial, material, or emotional ties to a foreign country?">
        <RadioGroup name="ties" value={f.financial_material_emotional_ties === null ? '' : f.financial_material_emotional_ties ? 'yes' : 'no'}
          onChange={v => set('financial_material_emotional_ties', v === 'yes')}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.financial_material_emotional_ties && (
          <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Describe ties" value={f.ties_description} onChange={e => set('ties_description', e.target.value)} />
        )}
      </Fieldset>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Marriage Date (if applicable)">
          <input style={input} type="date" value={f.marriage_date} onChange={e => set('marriage_date', e.target.value)} />
        </Field>
        <Field label="Cohabitation Start Date (if applicable)">
          <input style={input} type="date" value={f.cohabitation_start_date} onChange={e => set('cohabitation_start_date', e.target.value)} />
        </Field>
      </div>

      <Field label="Remarks">
        <textarea style={{ ...input, minHeight: 80 }} value={f.remarks} onChange={e => set('remarks', e.target.value)} />
      </Field>

      <SubmitBtn />
    </form>
  )
}
