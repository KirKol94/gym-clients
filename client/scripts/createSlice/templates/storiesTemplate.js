export default (componentName, layer) => `import type { Meta, Story } from '@storybook/react'

import type { ${componentName}Props } from './${componentName}'
import { ${componentName} } from './${componentName}'

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
  args: {},
} as Meta

const Template: Story<${componentName}Props> = (args) => <${componentName} {...args} />
export const Default = Template.bind({})
`
