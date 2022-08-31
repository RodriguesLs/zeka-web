import { InputHTMLAttributes, useState, useEffect, useRef, useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import * as S from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  containerStyle?: React.CSSProperties;
  register?: any;
  typeMask?: 'phone' | 'cnpj' | 'cep' | 'cpf' | '';
}

const Input = ({
  error,
  name,
  label,
  containerStyle,
  typeMask = '',
  register,
  ...rest
}: InputProps) => {
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
        {typeMask === 'cnpj' && (
          <ReactInputMask mask='99.999.999/9999-99' ref={inputRef} {...register(name)} {...rest} />
        )}
        {typeMask === 'cpf' && (
          <ReactInputMask mask='999.999.999-99' ref={inputRef} {...register(name)} {...rest} />
        )}
        {typeMask === 'cep' && (
          <ReactInputMask mask='99999-999' ref={inputRef} {...register(name)} {...rest} />
        )}
        {typeMask === 'phone' && (
          <ReactInputMask mask='(99)99999-9999' ref={inputRef} {...register(name)} {...rest} />
        )}

        {typeMask === '' && <input ref={inputRef} {...register(name)} {...rest} />}
      </S.Container>
      {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
    </S.Wrapper>
  );
};

export default Input;
