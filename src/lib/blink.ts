import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'promptpage-ai-71adpk0q',
  authRequired: false // Since this is a public tool, we don't require auth
})