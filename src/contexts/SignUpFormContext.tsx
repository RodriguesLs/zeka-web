import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

interface SignUpFormData {
  imageProfile: File;
  companyName: string;
  cnpj: string;
  responsible: string;
  phoneNumber: string;
  cep: string;
  address: string;
  numberAddress: string;
  uf: string;
  city: string;
  district: string;
  actArea: string;
  email: string;
}

interface SignUpFormContextData {
  formData: SignUpFormData;
  handleUpdateSignupFormData: (data: any) => void;
}

interface SignUpFormContextProps {
  children: React.ReactNode;
}

const SignUpFormContext = createContext<SignUpFormContextData>({} as SignUpFormContextData);

const SignUpFormProvider = ({ children }: SignUpFormContextProps) => {
  const [formData, setFormData] = useState<SignUpFormData>({} as SignUpFormData);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleUpdateSignupFormData = useCallback(
    (data: any) => {
      setFormData({
        ...formData,
        ...data,
      });
    },
    [formData],
  );

  return (
    <SignUpFormContext.Provider
      value={{
        handleUpdateSignupFormData,
        formData,
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
