import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error })

// @TODO report top-level await bug
// Using a dynamic import here as `loadEnvConfig` needs to run before this file is loaded
// const { projectId, dataset } = await import('lib/sanity.api')


export default defineCliConfig({ api: 
    { projectId: 'nv63bt3c', dataset: 'production' } 
        ,
    deployment: {
        appId: 'sqjb6u3g0z82voeqzm8yr79f',
    }
}
)
