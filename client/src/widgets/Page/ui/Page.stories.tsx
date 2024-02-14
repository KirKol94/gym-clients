import type { Meta, Story } from '@storybook/react'

import type { PageProps } from './Page'
import { Page } from './Page'

export default {
  title: 'widgets/Page',
  component: Page,
} as Meta

const Template: Story<PageProps> = () => (
  <Page>
    <div>Some page</div>
  </Page>
)
export const Default = Template.bind({})
