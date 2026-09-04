import { ImageResponse } from 'next/og';

export const alt = 'Gusti Rais — Software Engineer & Data Scientist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a2e1f',
          backgroundImage: 'radial-gradient(circle, #39ff14 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 120,
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#ffffff',
            letterSpacing: '-4px',
            WebkitTextStroke: '3px #39ff14',
          }}
        >
          GUSTI RAIS
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 36,
            fontWeight: 700,
            color: '#39ff14',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Software Engineer &amp; Data Scientist
        </div>
      </div>
    ),
    { ...size }
  );
}
