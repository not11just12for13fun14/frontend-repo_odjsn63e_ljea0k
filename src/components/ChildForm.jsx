import { useState } from 'react'

export default function ChildForm({ onCreated }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    gender: 'male',
    date_of_birth: '',
    birth_certificate_number: '',
    national_id: '',
    guardian_id: ''
  })
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/children`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          gender: form.gender,
          date_of_birth: form.date_of_birth,
          birth_certificate_number: form.birth_certificate_number || null,
          national_id: form.national_id || null,
          guardian_id: form.guardian_id || null
        })
      })
      if (!res.ok) throw new Error('Хадгалалт амжилтгүй')
      const data = await res.json()
      onCreated && onCreated(data.id)
      setForm({ first_name: '', last_name: '', gender: 'male', date_of_birth: '', birth_certificate_number: '', national_id: '', guardian_id: '' })
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input className="input" name="first_name" placeholder="Нэр" value={form.first_name} onChange={change} required />
        <input className="input" name="last_name" placeholder="Овог" value={form.last_name} onChange={change} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select className="input" name="gender" value={form.gender} onChange={change}>
          <option value="male">Хүү</option>
          <option value="female">Охин</option>
        </select>
        <input className="input" name="date_of_birth" type="date" value={form.date_of_birth} onChange={change} required />
      </div>
      <input className="input" name="birth_certificate_number" placeholder="Төрсний гэрчилгээний дугаар" value={form.birth_certificate_number} onChange={change} />
      <input className="input" name="national_id" placeholder="Регистрийн дугаар" value={form.national_id} onChange={change} />
      <input className="input" name="guardian_id" placeholder="Асран хамгаалагчийн ID (сонголттой)" value={form.guardian_id} onChange={change} />

      <button disabled={loading} className="btn-primary w-full">{loading ? 'Хадгалж байна...' : 'Хүүхэд бүртгэх'}</button>
    </form>
  )
}
