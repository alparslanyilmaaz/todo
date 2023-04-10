import { ErrorMessage as HookFormErrorMessage, Props } from '@hookform/error-message';

import type { FieldValues } from 'react-hook-form';

export const ErrorItem = ({ className = '', ...props }) => (
  <p
    className={`font-semibold text-red-500 text-[0.8em] ${className}`}
    role="alert"
    {...props}
  />
);

export function ErrorMessage<V extends FieldValues>(props: Props<V, 'p'>) {
  const { className } = props;

  return (
    <HookFormErrorMessage
      {...props}
      render={({ messages, message }) => (messages ? (
        Object.entries(messages).map(([type, m]) => (
          <ErrorItem key={type} className={className}>
            {m}
          </ErrorItem>
        ))
      ) : (
        <ErrorItem className={className}>{message}</ErrorItem>
      ))}
    />
  );
}
