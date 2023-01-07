import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, onSubmit }: FormProps) => {
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(event);
  };

  return (
    <form className="form" onSubmit={submitForm}>{children}</form>
  );
}
