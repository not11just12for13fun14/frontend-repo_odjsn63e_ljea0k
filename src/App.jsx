import Header from './components/Header'
import ChildForm from './components/ChildForm'
import VaccineForm from './components/VaccineForm'
import AppointmentForm from './components/AppointmentForm'
import { ChildList, VaccineList, AppointmentList } from './components/Lists'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl p-6 space-y-6">
        <Header />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-blue-500/20 bg-slate-800/40 p-5">
              <h2 className="mb-4 text-blue-100 font-semibold">Хүүхэд бүртгэх</h2>
              <ChildForm />
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-slate-800/40 p-5">
              <h2 className="mb-4 text-blue-100 font-semibold">Вакцин нэмэх</h2>
              <VaccineForm />
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-slate-800/40 p-5">
              <h2 className="mb-4 text-blue-100 font-semibold">Вакцин товлох</h2>
              <AppointmentForm />
            </div>
          </div>

          <div className="space-y-6">
            <ChildList />
            <VaccineList />
            <AppointmentList />
          </div>
        </div>

        <div className="text-center text-blue-300/60 text-xs">
          © {new Date().getFullYear()} Хүүхдийн дархлаажуулалтын бүртгэл
        </div>
      </div>
    </div>
  )
}

export default App
