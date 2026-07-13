'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useMemo } from 'react'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  // Debug: Config ausgeben
  console.log('Sanity Config:', config)
  
  if (!config) {
    return <div>Error: Config konnte nicht geladen werden!</div>
  }
    const studioConfig = useMemo(() => config, [])
  
  return <NextStudio config={studioConfig} />
}

