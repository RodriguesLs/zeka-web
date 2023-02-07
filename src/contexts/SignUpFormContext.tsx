import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

interface AddressFormData {
  street: string;
  complement: string;
  cep: string;
  city: string;
  uf: string;
  district: string;
}

interface SignUpFormData {
  imageProfile: File;
  name?: string;
  cpf?: string;
  rg?: string;
  instagram?: string;
  companyName?: string;
  cnpj?: string;
  responsible?: string;
  phoneNumber?: string;
  address: AddressFormData;
  email: string;
  password: string;
  confirmPassword: string;
  number: string;
  holderName: string;
  month: string;
  year: string;
  cvv: string;
}

interface SignUpFormContextData {
  signUpFormData: SignUpFormData;
  handleUpdateSignupFormData: (data: any) => void;
}

interface SignUpFormContextProps {
  children: React.ReactNode;
}

const SignUpFormContext = createContext<SignUpFormContextData>({} as SignUpFormContextData);

const SignUpFormProvider = ({ children }: SignUpFormContextProps) => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({} as SignUpFormData);

  const handleUpdateSignupFormData = useCallback(
    (data: Partial<SignUpFormData>) => {
      setSignUpFormData({
        ...signUpFormData,
        ...data,
      });
    },
    [signUpFormData],
  );

  return (
    <SignUpFormContext.Provider
      value={{
        handleUpdateSignupFormData,
        signUpFormData,
      }}
    >
      {children}
    </SignUpFormContext.Provider>
  );
};

function useSignUpForm(): SignUpFormContextData {
  const context = useContext(SignUpFormContext);

  if (!context) {
    throw new Error('useSignUpForm must be used within an SignUpFormProvider');
  }

  return context;
}

export { SignUpFormProvider, useSignUpForm };
