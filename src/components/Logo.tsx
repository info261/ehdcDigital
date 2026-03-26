'use client'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon mark - stylized "e" that forms a digital/grid pattern */}
      <g>
        {/* Main square frame */}
        <rect
          x="2"
          y="4"
          width="24"
          height="24"
          rx="6"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Inner horizontal line creating the "e" shape */}
        <line
          x1="8"
          y1="16"
          x2="20"
          y2="16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Digital dot accent */}
        <circle
          cx="20"
          cy="10"
          r="2.5"
          fill="currentColor"
        />
      </g>

      {/* Wordmark */}
      <text
        x="36"
        y="22"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        ehdcDigital
      </text>
    </svg>
  )
}

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main square frame */}
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="7"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Inner horizontal line creating the "e" shape */}
      <line
        x1="9"
        y1="16"
        x2="23"
        y2="16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Digital dot accent */}
      <circle
        cx="22"
        cy="10"
        r="3"
        fill="currentColor"
      />
    </svg>
  )
}

export function LogoAlt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stacked bars forming abstract "E" */}
      <g>
        <rect x="2" y="4" width="20" height="4" rx="2" fill="currentColor" />
        <rect x="2" y="14" width="16" height="4" rx="2" fill="currentColor" />
        <rect x="2" y="24" width="20" height="4" rx="2" fill="currentColor" />
        {/* Vertical connector */}
        <rect x="2" y="4" width="4" height="24" rx="2" fill="currentColor" />
      </g>

      {/* Wordmark */}
      <text
        x="32"
        y="22"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        ehdcDigital
      </text>
    </svg>
  )
}
