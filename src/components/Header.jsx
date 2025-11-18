import { Baby, Syringe, Calendar, Shield } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-lg" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg">
            <Syringe size={28} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Хүүхдийн дархлаажуулалтын бүртгэл</h1>
          <p className="text-blue-200/80 text-sm">Товлолт вакцинжуулалтын бүртгэл, хяналт, товлол</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3 text-blue-300/70">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs"><Baby size={14}/>Хүүхэд</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs"><Shield size={14}/>Вакцин</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs"><Calendar size={14}/>Товлол</span>
      </div>
    </header>
  )
}
