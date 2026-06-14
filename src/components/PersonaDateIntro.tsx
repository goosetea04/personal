"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const DAYS = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

const CORNER_CLASSES = [
  'top-5 left-5 border-t-2 border-l-2',
  'top-5 right-5 border-t-2 border-r-2',
  'bottom-5 left-5 border-b-2 border-l-2',
  'bottom-5 right-5 border-b-2 border-r-2',
]

export const PersonaDateIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isOut, setIsOut] = useState(false)
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    setDate(new Date())
    const t1 = setTimeout(() => setIsOut(true), 2600)
    const t2 = setTimeout(onComplete, 3550)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  // Always render — dark overlay must be visible from the very first render
  // so portfolio content never shows through while date is being set
  const day = date ? DAYS[date.getDay()] : ''
  const month = date ? MONTHS[date.getMonth()] : ''
  const dateNum = date ? String(date.getDate()).padStart(2, '0') : ''
  const year = date ? date.getFullYear() : ''

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Main panel — slides up on exit, carrying all content with it */}
      <motion.div
        className="absolute inset-0 bg-[#03120b]"
        animate={isOut ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.75, ease: [0.7, 0, 0.3, 1] }}
      >
        {/* Border: Top — extends left → right */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-[#39ff14] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        />
        {/* Border: Right — extends top → bottom */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] bg-[#39ff14] h-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ originY: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        />
        {/* Border: Bottom — extends right → left */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#39ff14] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
        />
        {/* Border: Left — extends bottom → top */}
        <motion.div
          className="absolute top-0 left-0 w-[2px] bg-[#39ff14] h-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ originY: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
        />

        {/* Corner brackets */}
        {CORNER_CLASSES.map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-7 h-7 border-[#39ff14] ${cls}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.42 + i * 0.05, duration: 0.22, ease: [0.175, 0.885, 0.32, 1.275] }}
          />
        ))}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">

          {/* Day of week — slides from left */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1], delay: 0.3 }}
          >
            <div className="h-px w-10 bg-[#39ff14]" />
            <div className="-skew-x-12 bg-[#39ff14] px-5 py-[3px]">
              <span className="skew-x-12 block font-black text-xs tracking-[0.5em] text-[#03120b] uppercase">
                {day}
              </span>
            </div>
            <div className="h-px w-10 bg-[#39ff14]" />
          </motion.div>

          {/* Date number — kinetic slam */}
          <motion.div
            initial={{ scale: 4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275], delay: 0.46 }}
          >
            <span
              className="font-black leading-none tracking-tighter text-white block text-center select-none"
              style={{
                fontSize: 'clamp(90px, 22vw, 380px)',
                WebkitTextStroke: '3px #39ff14',
                textShadow: '0 0 80px rgba(57,255,20,0.1)',
              }}
            >
              {dateNum}
            </span>
          </motion.div>

          {/* Month + Year — slides from right */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ x: '110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1], delay: 0.38 }}
          >
            <div className="h-px w-8 bg-[#39ff14] opacity-40" />
            <span
              className="font-black tracking-[0.3em] text-[#39ff14] -skew-x-6 uppercase"
              style={{ fontSize: 'clamp(13px, 2.4vw, 28px)' }}
            >
              {month}
            </span>
            <span
              className="font-black tracking-widest text-[#e0ffe8] opacity-35"
              style={{ fontSize: 'clamp(11px, 1.7vw, 20px)' }}
            >
              {year}
            </span>
            <div className="h-px w-8 bg-[#39ff14] opacity-40" />
          </motion.div>
        </div>

        {/* Decorative horizontal rule — extends after content appears */}
        <motion.div
          className="absolute left-16 right-16 h-px bg-[#39ff14] opacity-[0.15]"
          style={{ top: 'calc(50% + clamp(62px, 14vw, 230px))', originX: 0.5 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
        />
      </motion.div>

      {/* Green flash wipe — sweeps left → right as panel lifts */}
      <AnimatePresence>
        {isOut && (
          <motion.div
            key="wipe"
            className="absolute inset-0 z-10 bg-[#39ff14]"
            initial={{ x: '-101%' }}
            animate={{ x: '101%' }}
            transition={{ duration: 0.38, ease: [0.7, 0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
