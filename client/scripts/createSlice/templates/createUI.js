import { mkdir, writeFile } from 'fs/promises'

import firstCharUpperCase from '../firstCharUpperCase.js'
import resolveRoot from '../resolveRoot.js'

import componentTemplate from './componentTemplate.js'
import styleTemplate from './styleTemplate.js'

export default async (layer, sliceName) => {
  const resolveUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments)

  const createUIDir = async () => {
    try {
      await mkdir(resolveUIPath())
    } catch (e) {
      console.log('Не удалось создать UI директорию')
    }
  }

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName)

      await writeFile(resolveUIPath(`${componentName}.tsx`), componentTemplate(componentName))
      await writeFile(resolveUIPath(`${componentName}.module.scss`), styleTemplate(componentName))
    } catch (e) {
      console.log('Не удалось создать компонент')
    }
  }

  await createUIDir()
  await createComponent()
}
