"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

// Sweep duration and easing — same values used for both clip-path and leading edge bar
// so they stay perfectly in sync
const SWEEP = 0.58
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]
const HOLD_MS = 1600

export const PersonaDateIntro = ({ onComplete, onExitStart }: { onComplete: () => void; onExitStart?: () => void }) => {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter')
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    setDate(new Date())
    const exitAt = SWEEP * 1000 + HOLD_MS
    const doneAt = exitAt + SWEEP * 1000 + 150
    const t1 = setTimeout(() => { setPhase('exit'); onExitStart?.() }, exitAt)
    const t2 = setTimeout(onComplete, doneAt)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete, onExitStart])

  const day   = date ? DAYS[date.getDay()]                        : ''
  const month = date ? MONTHS[date.getMonth()]                    : ''
  const dateNum = date ? String(date.getDate()).padStart(2, '0')  : ''
  const year  = date ? date.getFullYear()                         : ''

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden ${phase === 'enter' ? 'bg-[#03120b]' : ''}`}>

      {/* ── Dark panel ────────────────────────────────────────────────
          Revealed on enter by clipping from right → left
          Hidden  on exit  by clipping from left  → right
          The clip-path and the leading-edge bar share the same
          duration + easing so the bar always sits exactly at the
          boundary of what's visible.                              ── */}
      <motion.div
        className="absolute inset-0 bg-[#03120b]"
        initial={{ clipPath: 'inset(0 100% 0 0%)' }}
        animate={{
          clipPath: phase === 'exit'
            ? 'inset(0 0% 0 100%)'
            : 'inset(0 0% 0 0%)',
        }}
        transition={{ duration: SWEEP, ease: EASE }}
      >
        {/* Static frame — no animation, just always present on the panel */}
        <div className="absolute top-0    inset-x-0 h-[2px]  bg-[#39ff14]" />
        <div className="absolute bottom-0 inset-x-0 h-[2px]  bg-[#39ff14]" />
        <div className="absolute top-5  left-5  w-7 h-7 border-t-2 border-l-2 border-[#39ff14]" />
        <div className="absolute top-5  right-5 w-7 h-7 border-t-2 border-r-2 border-[#39ff14]" />
        <div className="absolute bottom-5 left-5  w-7 h-7 border-b-2 border-l-2 border-[#39ff14]" />
        <div className="absolute bottom-5 right-5 w-7 h-7 border-b-2 border-r-2 border-[#39ff14]" />

        {/* ── Calendar-style date display ──────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">

          {/* Month + Year — top of the "calendar page" */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#39ff14] opacity-40" />
            <span
              className="font-black tracking-[0.35em] text-[#39ff14] uppercase"
              style={{ fontSize: 'clamp(11px, 1.6vw, 20px)' }}
            >
              {month}
            </span>
            <span
              className="font-black tracking-widest text-[#e0ffe8] opacity-35"
              style={{ fontSize: 'clamp(10px, 1.2vw, 16px)' }}
            >
              {year}
            </span>
            <div className="h-px w-8 bg-[#39ff14] opacity-40" />
          </div>

          {/* Thin rule */}
          <div className="w-40 h-px bg-[#39ff14] opacity-25 mb-1" />

          {/* Date number — the dominant element */}
          <span
            className="font-black leading-none text-white text-center block"
            style={{
              fontSize: 'clamp(110px, 23vw, 400px)',
              WebkitTextStroke: '2px #39ff14',
              textShadow: '0 0 60px rgba(57,255,20,0.07)',
            }}
          >
            {dateNum}
          </span>

          {/* Thin rule */}
          <div className="w-40 h-px bg-[#39ff14] opacity-25 mt-1 mb-3" />

          {/* Day of week — base of the calendar page */}
          <span
            className="font-black tracking-[0.5em] text-[#39ff14] uppercase"
            style={{ fontSize: 'clamp(11px, 1.6vw, 20px)' }}
          >
            {day}
          </span>
        </div>
      </motion.div>

      {/* ── Leading-edge bar ──────────────────────────────────────────
          A narrow lime-green line that sweeps just ahead of the clip
          boundary. Remounts with a new key on each phase so it always
          starts from the left edge for both enter and exit sweeps.  ── */}
      <AnimatePresence>
        <motion.div
          key={phase}
          className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#39ff14] z-10"
          initial={{ x: -3 }}
          animate={{ x: '100vw' }}
          transition={{ duration: SWEEP, ease: EASE }}
        />
      </AnimatePresence>

    </div>
  )
}
