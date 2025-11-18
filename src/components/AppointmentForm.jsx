import { useEffect, useState } from 'react'

export default function AppointmentForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [children, setChildren] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [form, setForm] = useState({ child_id: '', vaccine_id: '', dose_number: 1, scheduled_date: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${baseUrl}/api/children`).then(r => r.json()).then(setChildren)
    fetch(`${baseUrl}/api/vaccines`).then(r => r.json()).then(setVaccines)
  }, [])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          child_id: form.child_id,
          vaccine_id: form.vaccine_id,
          dose_number: Number(form.dose_number),
          scheduled_date: form.scheduled_date
        })
      })
      if (!res.ok) throw new Error('Хадгалалт амжилтгүй')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ child_id: '', vaccine_id: '', dose_number: 1, scheduled_date: '' })
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <select className="input" name="child_id" value={form.child_id} onChange={change} required>
        <option value="">Хүүхэд сонгох</option>
        {children.map(c => (
          <option key={c._id} value={c._id}>{c.first_name} {c.last_name}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-3">
        <select className="input" name="vaccine_id" value={form.vaccine_id} onChange={change} required>
          <option value="">Вакцин сонгох</option>
          {vaccines.map(v => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>
        <input className="input" name="dose_number" type="number" min={1} value={form.dose_number} onChange={change} />
      </div>

      <input className="input" name="scheduled_date" type="date" value={form.scheduled_date} onChange={change} required />

      <button disabled={loading} className="btn-primary w-full">{loading ? 'Хадгалж байна...' : 'Товлох'}</button>
    </form>
  )
}
