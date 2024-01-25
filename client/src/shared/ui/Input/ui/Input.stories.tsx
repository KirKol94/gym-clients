import type { Meta, StoryObj } from '@storybook/react';

import {Input} from './Input.tsx';

const meta = {
	title: 'Shared/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		inputName: 'Введите данные'
	},
};
