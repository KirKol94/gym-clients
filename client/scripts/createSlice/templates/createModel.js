import { mkdir, writeFile } from 'fs/promises'

import resolveRoot from '../resolveRoot.js'

import reduxSliceTemplate from './reduxSliceTemplate.js'
import typesTemplate from './typesTemplate.js'

export default async (layer, sliceName) => {
  const resolveModelPath = (...segments) => resolveRoot('src', layer, sliceName, 'model', ...segments)

  const createModelStructure = async () => {
    try {
      await mkdir(resolveModelPath())
      await mkdir(resolveModelPath('types'))
      await mkdir(resolveModelPath('slice'))
    } catch (e) {
      console.log(`Не удалось создать model сегмент для слайса ${sliceName}`, e)
    }
  }

  const createReduxSlice = async () => {
    try {
      await writeFile(resolveModelPath('slice', `${sliceName}Slice.ts`), reduxSliceTemplate(sliceName))
      await writeFile(resolveModelPath('types', `index.ts`), typesTemplate(sliceName))
    } catch (e) {
      console.log('Не удалось создать редакс слайс', e)
    }
  }

  await createModelStructure()
  await createReduxSlice()
}
