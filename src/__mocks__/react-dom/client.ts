export const createRoot = jest.fn((container) => ({
  render: jest.fn(),
  unmount: jest.fn(),
}));