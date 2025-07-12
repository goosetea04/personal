import localFont from 'next/font/local'

export const nimbusSans = localFont({
  src: [
    {
      path: '../public/fonts/NimbusSanL-Reg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NimbusSanL-Bol.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NimbusSanL-RegIta.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/NimbusSanL-BolIta.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-nimbus-sans',
  display: 'swap',
})