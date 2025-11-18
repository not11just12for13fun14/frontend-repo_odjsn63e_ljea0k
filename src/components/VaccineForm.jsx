import { useState } from 'react'

export default function VaccineForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', code: '', doses_required: 1 })
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/vaccines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          code: form.code || null,
          doses_required: Number(form.doses_required) || 1
        })
      })
      if (!res.ok) throw new Error('Хадгалалт амжилтгүй')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ name: '', code: '', doses_required: 1 })
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input" name="name" placeholder="Вакцины нэр (ж: BCG)" value={form.name} onChange={change} required />
      <div className="grid grid-cols-2 gap-3">
        <input className="input" name="code" placeholder="Код" value={form.code} onChange={change} />
        <input className="input" name="doses_required" type="number" min={1} value={form.doses_required} onChange={change} />
      </div>
      <button disabled={loading} className="btn-primary w-full">{loading ? 'Хадгалж байна...' : 'Вакцин нэмэх'}</button>
    </form>
  )
}
