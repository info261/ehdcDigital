'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-8 px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-background/40 text-sm">
          {currentYear} ehdcDigital
        </p>
        <div className="flex items-center gap-8">
          {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ y: -2 }}
              className="text-sm text-background/40 hover:text-background transition-colors duration-300"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
