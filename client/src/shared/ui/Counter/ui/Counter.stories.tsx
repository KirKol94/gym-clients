import type { StoryFn } from '@storybook/react'

import { counterColor, counterSize } from '../model/types/counter'

import type { CounterProps } from './Counter'
import { Counter } from './Counter'

export default {
  title: 'shared/ui/Counter',
  component: Counter,
  args: {
    size: {
      type: 'radio',
      options: [counterSize.small, counterSize.medium],
    },
  },
}

const Template: StoryFn<CounterProps> = (args) => <Counter {...args} />

export const Yellow = Template.bind({})
Yellow.args = {
  count: 20,
  size: counterSize.small,
  color: counterColor.yellow,
}

const TemplateWithBg: StoryFn<CounterProps> = (args) => (
  <div
    style={{
      backgroundColor: 'gray',
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Counter {...args} />
  </div>
)

export const White = TemplateWithBg.bind({})
White.args = {
  count: 20,
  size: counterSize.small,
  color: counterColor.white,
}
