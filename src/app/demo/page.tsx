'use client'

import { useState } from 'react'

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = 'info@ehdcdigital.com'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative">
      {/* Tooltip */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-foreground rounded-lg whitespace-nowrap transition-all duration-300 ease-out pointer-events-none ${
          copied
            ? 'opacity-100 scale-100 blur-0 translate-y-0'
            : 'opacity-0 scale-[0.85] blur-[4px] translate-y-1'
        }`}
      >
        Copied to clipboard
      </div>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-3 h-12 px-5 text-sm font-medium bg-white text-foreground/70 shadow-button rounded-[16px] hover:bg-[#f8f8f8] hover:text-foreground hover:shadow-button-hover transition-all duration-200 focus:outline-none"
      >
        <div className="relative w-5 h-5" aria-hidden="true">
          {/* Check icon - appears when copied */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-[opacity,filter,transform] duration-300 ease-in-out will-change-[opacity,filter,transform] ${
              copied
                ? 'scale-100 opacity-100 blur-0'
                : 'scale-[0.25] opacity-0 blur-[4px]'
            }`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
                fill="currentColor"
              />
            </svg>
          </div>
          {/* Copy icon - default state */}
          <div
            className={`transition-[opacity,filter,transform] duration-300 ease-in-out will-change-[opacity,filter,transform] ${
              copied
                ? 'scale-[0.25] opacity-0 blur-[4px]'
                : 'scale-100 opacity-100 blur-0'
            }`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 5.25C22 3.45507 20.5449 2 18.75 2H11.25C9.45508 2 8 3.45507 8 5.25V8H5.25C3.45508 8 2 9.45507 2 11.25V18.75C2 20.5449 3.45507 22 5.25 22H12.75C14.5449 22 16 20.5449 16 18.75V16H18.75C20.5449 16 22 14.5449 22 12.75V5.25ZM16 14H18.75C19.4404 14 20 13.4404 20 12.75V5.25C20 4.55964 19.4404 4 18.75 4H11.25C10.5596 4 10 4.55964 10 5.25V8H12.75C14.5449 8 16 9.45507 16 11.25V14Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <span>{email}</span>
      </button>
    </div>
  )
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background grain-overlay flex items-center justify-center">
      <CopyEmailButton />
    </div>
  )
}
