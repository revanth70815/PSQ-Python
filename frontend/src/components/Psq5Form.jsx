import { useState } from 'react'
import { Field, Fieldset, RadioGroup, SubmitBtn, input, today } from './FormHelpers'

export default function Psq5Form({ onSubmit }) {
  const [f, setF] = useState({
    submission_date: today(), reported_to_security_officer: null, reported_date: '', reported_date_estimated: false,
    bills_in_collections: null, account_type: '', account_name: '', collection_amount: '',
    property_type: '', property_seized: null, financial_issue_start_date: '', financial_issue_resolved_date: '',
    settlement_amount: '', collection_circumstances: '', repayment_plan: '',
    wages_garnished: null, garnishment_court_ordered_support: null, garnishment_circumstances: '',
    garnishment_start_date: '', garnishment_end_date: '', garnishment_amount: '', garnishment_frequency: '',
    has_tax_liens: null, tax_lien_reason: '', tax_lien_reason_explanation: '', tax_lien_years: '',
    tax_lien_agency: '', tax_lien_amount: '', tax_lien_type: '', tax_lien_resolved_date: '', tax_lien_current_status: '',
    filed_bankruptcy: null, bankruptcy_type: '', bankruptcy_filed_date: '', bankruptcy_discharged: null,
    bankruptcy_amount: '', bankruptcy_court: '', bankruptcy_reason: '',
    chapter13_plan_approved: null, chapter13_terms: '', bankruptcy_current_status: '', remarks: '',
  })

  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const bool = (v) => v === null ? '' : v ? 'yes' : 'no'
  const setBool = (k, v) => set(k, v === '' ? null : v === 'yes')

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(f) }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 20 }}>
        Report financial issues including collections, garnishments, tax liens, and bankruptcy.
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

      <Fieldset legend="Bills in Collections?">
        <RadioGroup name="collections" value={bool(f.bills_in_collections)} onChange={v => setBool('bills_in_collections', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.bills_in_collections && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Account Type"><input style={input} value={f.account_type} onChange={e => set('account_type', e.target.value)} /></Field>
              <Field label="Account/Creditor Name"><input style={input} value={f.account_name} onChange={e => set('account_name', e.target.value)} /></Field>
              <Field label="Amount ($)"><input style={input} type="number" value={f.collection_amount} onChange={e => set('collection_amount', e.target.value)} /></Field>
              <Field label="Settlement Amount ($)"><input style={input} type="number" value={f.settlement_amount} onChange={e => set('settlement_amount', e.target.value)} /></Field>
              <Field label="Issue Start Date"><input style={input} type="date" value={f.financial_issue_start_date} onChange={e => set('financial_issue_start_date', e.target.value)} /></Field>
              <Field label="Resolved Date"><input style={input} type="date" value={f.financial_issue_resolved_date} onChange={e => set('financial_issue_resolved_date', e.target.value)} /></Field>
            </div>
            <Field label="Circumstances">
              <textarea style={{ ...input, minHeight: 60 }} value={f.collection_circumstances} onChange={e => set('collection_circumstances', e.target.value)} />
            </Field>
            <Field label="Repayment Plan">
              <textarea style={{ ...input, minHeight: 60 }} value={f.repayment_plan} onChange={e => set('repayment_plan', e.target.value)} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Fieldset legend="Wages Garnished?">
        <RadioGroup name="garnished" value={bool(f.wages_garnished)} onChange={v => setBool('wages_garnished', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.wages_garnished && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Start Date"><input style={input} type="date" value={f.garnishment_start_date} onChange={e => set('garnishment_start_date', e.target.value)} /></Field>
              <Field label="End Date"><input style={input} type="date" value={f.garnishment_end_date} onChange={e => set('garnishment_end_date', e.target.value)} /></Field>
              <Field label="Amount ($)"><input style={input} type="number" value={f.garnishment_amount} onChange={e => set('garnishment_amount', e.target.value)} /></Field>
              <Field label="Frequency"><input style={input} value={f.garnishment_frequency} onChange={e => set('garnishment_frequency', e.target.value)} /></Field>
            </div>
            <Field label="Circumstances">
              <textarea style={{ ...input, minHeight: 60 }} value={f.garnishment_circumstances} onChange={e => set('garnishment_circumstances', e.target.value)} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Fieldset legend="Tax Liens?">
        <RadioGroup name="tax_liens" value={bool(f.has_tax_liens)} onChange={v => setBool('has_tax_liens', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.has_tax_liens && (
          <div style={{ marginTop: 10 }}>
            <Field label="Reason">
              <select style={input} value={f.tax_lien_reason} onChange={e => set('tax_lien_reason', e.target.value)}>
                <option value="">Select…</option>
                <option value="failed_to_file">Failed to file</option>
                <option value="failed_to_pay">Failed to pay</option>
              </select>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Years"><input style={input} value={f.tax_lien_years} onChange={e => set('tax_lien_years', e.target.value)} /></Field>
              <Field label="Agency"><input style={input} value={f.tax_lien_agency} onChange={e => set('tax_lien_agency', e.target.value)} /></Field>
              <Field label="Amount ($)"><input style={input} type="number" value={f.tax_lien_amount} onChange={e => set('tax_lien_amount', e.target.value)} /></Field>
              <Field label="Resolved Date"><input style={input} type="date" value={f.tax_lien_resolved_date} onChange={e => set('tax_lien_resolved_date', e.target.value)} /></Field>
            </div>
            <Field label="Current Status">
              <textarea style={{ ...input, minHeight: 60 }} value={f.tax_lien_current_status} onChange={e => set('tax_lien_current_status', e.target.value)} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Fieldset legend="Filed for Bankruptcy?">
        <RadioGroup name="bankruptcy" value={bool(f.filed_bankruptcy)} onChange={v => setBool('filed_bankruptcy', v)}
          options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        {f.filed_bankruptcy && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Type">
                <select style={input} value={f.bankruptcy_type} onChange={e => set('bankruptcy_type', e.target.value)}>
                  <option value="">Select…</option>
                  <option value="chapter_7">Chapter 7</option>
                  <option value="chapter_11">Chapter 11</option>
                  <option value="chapter_13">Chapter 13</option>
                </select>
              </Field>
              <Field label="Filed Date"><input style={input} type="date" value={f.bankruptcy_filed_date} onChange={e => set('bankruptcy_filed_date', e.target.value)} /></Field>
              <Field label="Amount ($)"><input style={input} type="number" value={f.bankruptcy_amount} onChange={e => set('bankruptcy_amount', e.target.value)} /></Field>
              <Field label="Court"><input style={input} value={f.bankruptcy_court} onChange={e => set('bankruptcy_court', e.target.value)} /></Field>
            </div>
            <Field label="Reason">
              <textarea style={{ ...input, minHeight: 60 }} value={f.bankruptcy_reason} onChange={e => set('bankruptcy_reason', e.target.value)} />
            </Field>
            <Field label="Current Status">
              <textarea style={{ ...input, minHeight: 60 }} value={f.bankruptcy_current_status} onChange={e => set('bankruptcy_current_status', e.target.value)} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Field label="Remarks">
        <textarea style={{ ...input, minHeight: 80 }} value={f.remarks} onChange={e => set('remarks', e.target.value)} />
      </Field>

      <SubmitBtn />
    </form>
  )
}
