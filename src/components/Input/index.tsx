import React, { InputHTMLAttributes, useState, useEffect, useRef, useCallback } from 'react';
import { FieldError } from 'react-hook-form';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  containerStyle?: any;
  register?: any;
}

const Input: React.FC<InputProps> = ({ error, name, label, containerStyle, register, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current?.value) {
      setIsFilled(true);
    }
  }, [inputRef.current]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <S.Container
        style={containerStyle}
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={containerRef}
      >
        {label && <label htmlFor={name}>{label}</label>}
        <input ref={inputRef} {...register(name)} {...rest} />
      </S.Container>
      {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
    </>
  );
};

export default Input;
