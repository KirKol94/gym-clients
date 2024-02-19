import type { StoryFn } from '@storybook/react'

import { loaderColor, loaderSize } from '../model/types/loader'

import type { LoaderProps } from './Loader'
import { Loader } from './Loader'

export default {
  title: 'shared/ui/Loader',
  component: Loader,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: [loaderSize.small, loaderSize.big],
      },
    },
    color: {
      type: 'radio',
      options: [loaderColor.white],
    },
  },
}

const Template: StoryFn<LoaderProps> = (args) => <Loader {...args} />

export const Small = Template.bind({})
Small.args = {
  size: loaderSize.small,
}
export const Big = Template.bind({})
Big.args = {
  size: loaderSize.big,
}

const TemplateWithBg: StoryFn<LoaderProps> = (args) => (
  <div style={{ backgroundColor: 'gray', width: '100%' }}>
    <Loader {...args} />
  </div>
)

export const SmallWhite = TemplateWithBg.bind({})
SmallWhite.args = {
  size: loaderSize.small,
  color: loaderColor.white,
}
export const BigWhite = TemplateWithBg.bind({})
BigWhite.args = {
  size: loaderSize.big,
  color: loaderColor.white,
}
