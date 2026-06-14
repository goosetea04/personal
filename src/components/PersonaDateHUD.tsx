"use client"
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DAY_ABBR = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const MONTH_ABBR = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export const PersonaDateHUD = () => {
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => { setDate(new Date()) }, [])

  if (!date) return null

  return (
    <motion.div
      className="fixed top-4 right-4 z-40 pointer-events-none"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
    >
      <div className="-skew-x-12 bg-[#03120b] border-2 border-[#39ff14] px-4 py-1.5 shadow-[3px_3px_0px_0px_#39ff14]">
        <div className="skew-x-12 flex items-center gap-2.5">
          <span className="font-black text-[10px] tracking-[0.25em] text-[#39ff14] uppercase">
            {DAY_ABBR[date.getDay()]}
          </span>
          <div className="w-px h-3 bg-[#39ff14] opacity-40" />
          <span className="font-black text-base leading-none text-white">
            {String(date.getDate()).padStart(2, '0')}
          </span>
          <span className="font-black text-[10px] tracking-[0.2em] text-[#e0ffe8] opacity-55 uppercase">
            {MONTH_ABBR[date.getMonth()]}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
