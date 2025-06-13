import React from 'react';

// Wrapper component for tests
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
