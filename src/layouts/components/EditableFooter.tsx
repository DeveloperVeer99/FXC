import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { EditableWrapper } from '../../components/EditableWrapper'
import api from '../../services/api'

interface FooterData {
  companyName: string;
  email: string;
  phone: string;
  copyrightText: string;
  disclaimerText: string;
}

const defaultFooterData: FooterData = {
  companyName: 'FXC',
  email: 'contact@fxc.com',
  phone: '',
  copyrightText: '© 2026 FXC. All rights reserved.',
  disclaimerText: 'Tools for futures, currency & options involves substantial risk. Only risk capital should be used for trading.',
}

export default function EditableFooter() {
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData)

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get('/footer')
        setFooterData(response.data)
      } catch (error) {
        console.error('Failed to fetch footer data:', error)
        setFooterData(defaultFooterData)
      }
    }
    fetchFooterData()
  }, [])

  const { setEditingItem } = useAdmin()

  const handleEdit = (data: FooterData) => {
    setEditingItem({
      type: 'footer',
      data,
    })
  }

  return (
    <EditableWrapper
      type="footer"
      data={footerData}
      onEdit={handleEdit}
    >
      <footer className="border-t border-white/8 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">

          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                  <span className="text-[10px] font-black text-white tracking-tight">{footerData.companyName}</span>
                </div>
                <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white">
                  {footerData.companyName}
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-zinc-400 leading-6">
                Live trading • Real discussions • No signals • No hype
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#" className="text-zinc-500 hover:text-white transition text-sm">Instagram</a>
                <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition text-sm">Discord</a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Product</h3>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('courses')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block text-sm text-zinc-400 hover:text-white transition bg-none border-none cursor-pointer"
                >
                  Courses
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('community')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block text-sm text-zinc-400 hover:text-white transition bg-none border-none cursor-pointer"
                >
                  Community
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('plans')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block text-sm text-zinc-400 hover:text-white transition bg-none border-none cursor-pointer"
                >
                  Pricing
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Contact</h3>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-zinc-400 hover:text-white transition">Instagram</a>
                <a href="https://discord.gg/vrHwGxE3VA" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-400 hover:text-white transition">Discord</a>
                <a href={`mailto:${footerData.email}`} className="block text-sm text-zinc-400 hover:text-white transition">Email</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Legal</h3>
              <div className="space-y-3">
                <Link to="/terms" className="block text-sm text-zinc-400 hover:text-white transition">Terms & Conditions</Link>
                <Link to="/privacy" className="block text-sm text-zinc-400 hover:text-white transition">Privacy Policy</Link>
              </div>
            </div>

          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-zinc-600 md:flex-row">
            <p>{footerData.copyrightText}</p>
            <p>{footerData.disclaimerText}</p>
          </div>

        </div>
      </footer>
    </EditableWrapper>
  )
}
