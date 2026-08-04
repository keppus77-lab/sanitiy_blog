'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useMemo } from 'react'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  const studioConfig = useMemo(() => config, [])

  if (!studioConfig) {
    return <div>Error: Config konnte nicht geladen werden!</div>
  }

  return <NextStudio config={studioConfig} />
}