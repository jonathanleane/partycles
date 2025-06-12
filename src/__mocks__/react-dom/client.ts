export const createRoot = jest.fn((_container) => ({
  render: jest.fn(),
  unmount: jest.fn(),
}));