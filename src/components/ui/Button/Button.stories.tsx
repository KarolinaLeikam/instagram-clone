import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Button from './Button';

// meta — "паспорт" компонента: где его показывать в сайдбаре (title),
// какой компонент рендерим (component), автогенерировать ли вкладку
// документации (tags: ['autodocs']).
const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  // fn() — просто шпион (как vi.fn() в тестах), чтобы клики по кнопке
  // в Storybook UI показывались во вкладке "Actions", а не терялись.
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Каждый named export ниже — ОТДЕЛЬНАЯ story: один зафиксированный набор
// пропов = один конкретный визуальный вид компонента.
export const Default: Story = {
  args: {
    children: 'Log in',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Log in',
    disabled: true,
  },
};
