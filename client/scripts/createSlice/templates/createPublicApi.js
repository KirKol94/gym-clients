import { writeFile } from 'fs/promises'

import firstCharUpperCase from '../firstCharUpperCase.js'
import resolveRoot from '../resolveRoot.js'

export default async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName)

  try {
    await writeFile(
      resolveRoot('src', layer, sliceName, 'index.ts'),
      `export { ${componentName} } from './ui/${componentName}'
`,
    )
  } catch (e) {
    console.log('Не удалось создать PUBLIC API')
  }
}
