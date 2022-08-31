import { InputHTMLAttributes, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import * as S from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  error?: FieldError;
  label?: string;
  mask?: string;
  name: string;
  register?: any;
}

const Input = ({ error, name, label, containerStyle, mask, register, ...rest }: InputProps) => {
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
    <S.Wrapper style={containerStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <S.Container
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={containerRef}
      >
        {mask ? (
          <ReactInputMask mask={mask} ref={inputRef} {...register(name)} {...rest} />
        ) : (
          <input ref={inputRef} {...register(name)} {...rest} />
        )}
      </S.Container>
      {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
    </S.Wrapper>
  );
};

export default Input;
