import { useEffect, useState } from 'react';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Input, Select } from '@/components';
import { fetchLicense } from './services/apiHandlers';
import { useForm } from 'react-hook-form';

interface ILicense {
  name: string;
  code: string;
  expiration_date: string;
  total_uses: number;
  available_uses: number;
  status: string;
}

const ShowLicense = () => {
  const [license, setLicense] = useState<ILicense | undefined>();

  const { data: licenseResp } = useQuery(['my-license'], async () => {
    const { data } = await fetchLicense();

    return data;
  });

  const { register } = useForm<any>();

  useEffect(() => {
    console.log({ licenseResp })
    if (licenseResp) {
      setLicense(licenseResp)
    } else {
      fetchLicense().then((data: any) => setLicense(data));
    }
  }, [license]);

  const onSubmit = async () => console.log('do nothing');

  return (
    <Box as='section' w='100%'>
      <Box as='form' w='100%' maxWidth='700px' onSubmit={onSubmit}>
        <VStack gap='1rem'>
          <Input
            isDisabled
            type='text'
            name='name'
            placeholder='Ex: Básico'
            register={register}
            autoComplete='off'
            label='Descrição*'
            value={license?.name}
          />
          <HStack w='100%'>
            <Input
              isDisabled
              type='text'
              name='code'
              placeholder='Ex: A1B2C3D4'
              register={register}
              autoComplete='off'
              label='Código:*'
              value={license?.code}
            />
            <Input
              isDisabled
              type='text'
              name='expiration_date'
              placeholder='Data de expiração*'
              register={register}
              autoComplete='off'
              label='Data de expiração*'
              mask='99/99/9999'
              value={license?.expiration_date}
            />
          </HStack>
          <HStack w='100%'>
            <Input
              isDisabled
              type='text'
              name='available_uses'
              placeholder='Ex: 20'
              register={register}
              autoComplete='off'
              label='Quantidade disponível*'
              value={license?.available_uses}
            />
            <Input
              isDisabled
              type='text'
              name='total_uses'
              placeholder='Ex: 20'
              register={register}
              autoComplete='off'
              label='Quantidade total'
              value={license?.total_uses}
            />
            <Select isDisabled name='status' label='Status' register={register}>
              <option value='active'>Ativa</option>
              <option value='inactive'>Inativa</option>
            </Select>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ShowLicense;
