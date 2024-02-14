import type { Story } from '@storybook/react'

import { LoaderColor, LoaderSize } from '../model/types/loader'

import type { LoaderProps } from './Loader'
import { Loader } from './Loader'

export default {
  title: 'shared/ui/Loader',
  component: Loader,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: [LoaderSize.SMALL, LoaderSize.BIG],
      },
    },
    color: {
      type: 'radio',
      options: [LoaderColor.WHITE],
    },
  },
}

const Template: Story<LoaderProps> = (args) => <Loader {...args} />

export const Small = Template.bind({})
Small.args = {
  size: LoaderSize.SMALL,
}
export const Big = Template.bind({})
Big.args = {
  size: LoaderSize.BIG,
}

const TemplateWithBg: Story<LoaderProps> = (args) => (
  <div style={{ backgroundColor: 'gray', width: '100%' }}>
    <Loader {...args} />
  </div>
)

export const SmallWhite = TemplateWithBg.bind({})
SmallWhite.args = {
  size: LoaderSize.SMALL,
  color: LoaderColor.WHITE,
}
export const BigWhite = TemplateWithBg.bind({})
BigWhite.args = {
  size: LoaderSize.BIG,
  color: LoaderColor.WHITE,
}
