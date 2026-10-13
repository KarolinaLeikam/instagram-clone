import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from './Avatar';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 80,
    className: '',
  },
};

export const AvatarStories: Story = {
  args: {
    size: 70,
    className: '',
  },
};