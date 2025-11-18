import { useEffect, useState } from 'react'
import { Baby, Syringe, Calendar } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-blue-500/20 bg-slate-800/40 p-5">
      <div className="mb-3 flex items-center gap-2 text-blue-100">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function Table({ headers, rows, icon }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-blue-100/90">
        <thead>
          <tr className="text-blue-200/70">
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap border-b border-blue-500/10 px-3 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-3 py-4 text-blue-300/60">Мэдээлэл алга</td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i} className="border-b border-blue-500/5">
                {r.map((c, j) => (
                  <td key={j} className="px-3 py-2">{c}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export function ChildList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/children`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  const rows = items.map(c => [
    c.first_name + ' ' + c.last_name,
    c.gender || '-',
    c.date_of_birth,
    c.national_id || '-',
  ])

  return (
    <Section title="Хүүхдийн жагсаалт" icon={<Baby size={16} />}>
      <Table headers={["Нэр", "Хүйс", "Төрсөн огноо", "РД"]} rows={rows} />
    </Section>
  )
}

export function VaccineList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/vaccines`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  const rows = items.map(v => [
    v.name,
    v.code || '-',
    v.doses_required || '-',
  ])

  return (
    <Section title="Вакцинууд" icon={<Syringe size={16} />}>
      <Table headers={["Нэр", "Код", "Тун"]} rows={rows} />
    </Section>
  )
}

export function AppointmentList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/appointments`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  const rows = items.map(a => [
    a.child_id,
    a.vaccine_id,
    a.dose_number,
    a.scheduled_date,
  ])

  return (
    <Section title="Товлосон вакцин" icon={<Calendar size={16} />}>
      <Table headers={["Хүүхэд", "Вакцин", "Тун", "Огноо"]} rows={rows} />
    </Section>
  )
}
