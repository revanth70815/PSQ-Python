import { useState } from 'react'
import { Field, Fieldset, RadioGroup, SubmitBtn, input, today } from './FormHelpers'

const FREQ_OPTIONS = [
  { value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }, { value: 'annually', label: 'Annually' }, { value: 'other', label: 'Other' },
]
const CONTACT_METHODS = ['Phone', 'Email', 'In-person', 'Social media', 'Mail', 'Other']
const CONTACT_TYPES = ['Personal', 'Professional', 'Financial', 'Other']

export default function Psq2Form({ onSubmit }) {
  const [f, setF] = useState({
    submission_date: today(), reported_to_security_officer: null, reported_date: '', reported_date_estimated: false,
    has_foreign_associations: null, foreign_national_name: '', citizenship_countries: '', country_of_residence: '',
    how_long_known: '', occupation: '', relationship_to_nominee: '', contact_frequency: '', contact_frequency_other: '',
    contact_methods: [], contact_method_other_explanation: '', contact_types: [],
    expressed_interest_in_job: null, interest_in_job_explanation: '',
    financial_material_emotional_ties: null, ties_description: '',
    foreign_gov_affiliation: '', foreign_gov_affiliation_description: '',
    has_foreign_financial_interests: null, owns_foreign_real_estate: null,
    real_estate_country: '', real_estate_type: '', real_estate_acquired_date: '',
    real_estate_value: '', real_estate_visit_frequency: '', real_estate_has_co_owner: null,
    real_estate_co_owner: '', real_estate_plans: '',
    has_foreign_bank_account: null, bank_account_country: '', bank_account_balance: '', bank_account_purpose: '',
    has_foreign_investment: null, foreign_investment_description: '',
    special_conditions_required: null, special_conditions_description: '',
    disposal_financial_hardship: null, disposal_hardship_explanation: '', remarks: '',
  })

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const toggle = (k, v) => set(k, f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v])
  const bool = (v) => v === null ? '' : v ? 'yes' : 'no'
  const setBool = (k, v) => set(k, v === '' ? null : v === 'yes')

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(f) }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 20 }}>
        Report foreign nationals you have close, continuing contact with outside of official duties.
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

      <h3 style={{ color: '#1e3a5f', fontSize: '1rem', margin: '20px 0 12px' }}>Foreign National Information</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Name"><input style={input} value={f.foreign_national_name} onChange={e => set('foreign_national_name', e.target.value)} /></Field>
        <Field label="Citizenship Countries"><input style={input} value={f.citizenship_countries} onChange={e => set('citizenship_countries', e.target.value)} /></Field>
        <Field label="Country of Residence"><input style={input} value={f.country_of_residence} onChange={e => set('country_of_residence', e.target.value)} /></Field>
        <Field label="How Long Known"><input style={input} value={f.how_long_known} onChange={e => set('how_long_known', e.target.value)} /></Field>
        <Field label="Occupation"><input style={input} value={f.occupation} onChange={e => set('occupation', e.target.value)} /></Field>
        <Field label="Relationship to Nominee"><input style={input} value={f.relationship_to_nominee} onChange={e => set('relationship_to_nominee', e.target.value)} /></Field>
      </div>

      <Field label="Contact Frequency">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          {FREQ_OPTIONS.map(o => (
            <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <input type="radio" name="contact_frequency" value={o.value} checked={f.contact_frequency === o.value} onChange={() => set('contact_frequency', o.value)} />
              {o.label}
            </label>
          ))}
        </div>
        {f.contact_frequency === 'other' && <input style={{ ...input, marginTop: 8 }} value={f.contact_frequency_other} onChange={e => set('contact_frequency_other', e.target.value)} />}
      </Field>

      <Field label="Contact Methods">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          {CONTACT_METHODS.map(m => (
            <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={f.contact_methods.includes(m)} onChange={() => toggle('contact_methods', m)} />
              {m}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Type of Contact">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          {CONTACT_TYPES.map(t => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={f.contact_types.includes(t)} onChange={() => toggle('contact_types', t)} />
              {t}
            </label>
          ))}
        </div>
      </Field>

      <Fieldset legend="Foreign Financial Interests">
        <Fieldset legend="Owns foreign real estate?">
          <RadioGroup name="real_estate" value={bool(f.owns_foreign_real_estate)} onChange={v => setBool('owns_foreign_real_estate', v)}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          {f.owns_foreign_real_estate && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
              <Field label="Country"><input style={input} value={f.real_estate_country} onChange={e => set('real_estate_country', e.target.value)} /></Field>
              <Field label="Type"><input style={input} value={f.real_estate_type} onChange={e => set('real_estate_type', e.target.value)} /></Field>
              <Field label="Acquired Date"><input style={input} type="date" value={f.real_estate_acquired_date} onChange={e => set('real_estate_acquired_date', e.target.value)} /></Field>
              <Field label="Value ($)"><input style={input} type="number" value={f.real_estate_value} onChange={e => set('real_estate_value', e.target.value)} /></Field>
            </div>
          )}
        </Fieldset>

        <Fieldset legend="Foreign bank account?">
          <RadioGroup name="bank" value={bool(f.has_foreign_bank_account)} onChange={v => setBool('has_foreign_bank_account', v)}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          {f.has_foreign_bank_account && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
              <Field label="Country"><input style={input} value={f.bank_account_country} onChange={e => set('bank_account_country', e.target.value)} /></Field>
              <Field label="Balance ($)"><input style={input} type="number" value={f.bank_account_balance} onChange={e => set('bank_account_balance', e.target.value)} /></Field>
              <Field label="Purpose"><input style={input} value={f.bank_account_purpose} onChange={e => set('bank_account_purpose', e.target.value)} /></Field>
            </div>
          )}
        </Fieldset>

        <Fieldset legend="Foreign investments?">
          <RadioGroup name="investment" value={bool(f.has_foreign_investment)} onChange={v => setBool('has_foreign_investment', v)}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          {f.has_foreign_investment && (
            <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Describe investments" value={f.foreign_investment_description} onChange={e => set('foreign_investment_description', e.target.value)} />
          )}
        </Fieldset>
      </Fieldset>

      <Field label="Remarks">
        <textarea style={{ ...input, minHeight: 80 }} value={f.remarks} onChange={e => set('remarks', e.target.value)} />
      </Field>

      <SubmitBtn />
    </form>
  )
}
