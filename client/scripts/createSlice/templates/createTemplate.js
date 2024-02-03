import { mkdir } from 'fs/promises'

import resolveRoot from '../resolveRoot.js'

import createModel from './createModel.js'
import createPublicApi from './createPublicApi.js'
import createUI from './createUI.js'

export default async (layer, sliceName) => {
  try {
    await mkdir(resolveRoot('src', layer, sliceName))
  } catch (e) {
    console.log(`не удалось создать директорию для слайса ${sliceName}`)
  }

  await createModel(layer, sliceName)
  await createUI(layer, sliceName)
  await createPublicApi(layer, sliceName)
}
