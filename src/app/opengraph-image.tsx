import { ImageResponse } from 'next/og'

export const alt = 'ehdcDigital: high-converting websites for startups, agencies and founders'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AVATAR =
  'https://cdn.prod.website-files.com/671feb5fa37d8eda3aaf78c7/680f55fbb602a243bb1fc091_6720fed9b8f304e5b57a2480_IMG_6426%203%20(1).jpeg'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#FAFBFC',
          color: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AVATAR} width={72} height={72} style={{ borderRadius: 999, objectFit: 'cover' }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 600 }}>ehdcDigital</span>
            <span style={{ fontSize: 22, color: '#64748b' }}>Erik Hudec · Webflow Certified Partner</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            High-converting websites
          </span>
          <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#64748b' }}>
            for startups, agencies & founders
          </span>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#64748b' }}>
          {['Web design', 'Webflow development', 'Branding', 'Automations'].map((s) => (
            <span
              key={s}
              style={{ padding: '10px 20px', borderRadius: 14, background: '#ffffff', border: '1px solid #e2e8f0' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
