import firstCharLowerCase from '../firstCharLowerCase.js'
import firstCharUpperCase from '../firstCharUpperCase.js'

export default (componentName) => `import { memo } from 'react'
import cx from 'classix'

import cls from './${firstCharUpperCase(componentName)}.module.scss'

export interface ${firstCharUpperCase(componentName)}Props {
  className?: string
}

export const ${firstCharUpperCase(componentName)} = memo(({className}: ${firstCharUpperCase(componentName)}Props) => {
  const ${firstCharLowerCase(componentName)}Class = cx(cls.${firstCharLowerCase(componentName)}, className)

  return <div className={${firstCharLowerCase(componentName)}Class}>${componentName}</div>
})
`
