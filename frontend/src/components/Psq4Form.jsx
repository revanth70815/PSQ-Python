import { useState } from 'react'
import { Field, Fieldset, RadioGroup, SubmitBtn, input, today } from './FormHelpers'

export default function Psq4Form({ onSubmit }) {
  const [f, setF] = useState({
    submission_date: today(), reported_to_security_officer: null, reported_date: '', reported_date_estimated: false,
    clearance_action_taken: null, suspension_date: '', denial_date: '', revocation_date: '',
    action_agency: '', action_circumstances: '',
    arrested: null, offense_description: '', arrest_date: '', arrest_location: '',
    involves_domestic_violence: false, involves_firearms_explosives: false, involves_alcohol_drugs: false,
    counseling_ordered: null, offense_disposition: '',
    court_requirements_completed: null, court_requirements_explanation: '',
    probation_start: '', probation_end: '', remarks: '',
  })

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const bool = (v) => v === null ? '' : v ? 'yes' : 'no'
  const setBool = (k, v) => set(k, v === '' ? null : v === 'yes')

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(f) }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 20 }}>
        Report clearance actions and arrests since your last investigation or annual update.
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

      <Fieldset legend="Clearance Action Taken?">
        <RadioGroup name="clearance_action" value={bool(f.clearance_action_taken)} onChange={v => setBool('clearance_action_taken', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.clearance_action_taken && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 10 }}>
            <Field label="Suspension Date"><input style={input} type="date" value={f.suspension_date} onChange={e => set('suspension_date', e.target.value)} /></Field>
            <Field label="Denial Date"><input style={input} type="date" value={f.denial_date} onChange={e => set('denial_date', e.target.value)} /></Field>
            <Field label="Revocation Date"><input style={input} type="date" value={f.revocation_date} onChange={e => set('revocation_date', e.target.value)} /></Field>
            <Field label="Agency"><input style={input} value={f.action_agency} onChange={e => set('action_agency', e.target.value)} /></Field>
            <Field label="Circumstances" style={{ gridColumn: 'span 2' }}>
              <textarea style={{ ...input, minHeight: 60 }} value={f.action_circumstances} onChange={e => set('action_circumstances', e.target.value)} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Fieldset legend="Arrested or Charged?">
        <RadioGroup name="arrested" value={bool(f.arrested)} onChange={v => setBool('arrested', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.arrested && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
              <Field label="Arrest Date"><input style={input} type="date" value={f.arrest_date} onChange={e => set('arrest_date', e.target.value)} /></Field>
              <Field label="Arrest Location"><input style={input} value={f.arrest_location} onChange={e => set('arrest_location', e.target.value)} /></Field>
            </div>
            <Field label="Offense Description">
              <textarea style={{ ...input, minHeight: 60 }} value={f.offense_description} onChange={e => set('offense_description', e.target.value)} />
            </Field>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', margin: '8px 0' }}>
              {[
                ['involves_domestic_violence', 'Domestic Violence'],
                ['involves_firearms_explosives', 'Firearms/Explosives'],
                ['involves_alcohol_drugs', 'Alcohol/Drugs'],
              ].map(([k, label]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={f[k]} onChange={e => set(k, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>
            <Field label="Offense Disposition">
              <textarea style={{ ...input, minHeight: 60 }} value={f.offense_disposition} onChange={e => set('offense_disposition', e.target.value)} />
            </Field>
            <Fieldset legend="Court requirements completed?">
              <RadioGroup name="court_req" value={bool(f.court_requirements_completed)} onChange={v => setBool('court_requirements_completed', v)}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
              {f.court_requirements_completed === false && (
                <textarea style={{ ...input, marginTop: 8, minHeight: 60 }} placeholder="Explain" value={f.court_requirements_explanation} onChange={e => set('court_requirements_explanation', e.target.value)} />
              )}
            </Fieldset>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Probation Start"><input style={input} type="date" value={f.probation_start} onChange={e => set('probation_start', e.target.value)} /></Field>
              <Field label="Probation End"><input style={input} type="date" value={f.probation_end} onChange={e => set('probation_end', e.target.value)} /></Field>
            </div>
          </>
        )}
      </Fieldset>

      <Field label="Remarks">
        <textarea style={{ ...input, minHeight: 80 }} value={f.remarks} onChange={e => set('remarks', e.target.value)} />
      </Field>

      <SubmitBtn />
    </form>
  )
}
