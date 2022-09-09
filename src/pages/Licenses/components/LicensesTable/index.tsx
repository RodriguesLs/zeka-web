import { useCallback } from 'react';
import { FiEdit } from 'react-icons/fi';

import { ILicense, FilterOptions } from '../../types';

import formatDate from '@/utils/formatDate';

import * as S from './styles';

interface LicenseTableProps {
  data: ILicense[];
  filterSelected: FilterOptions;
}

const LicensesTable = ({ data, filterSelected }: LicenseTableProps) => {
  const getLicensesFiltered = useCallback(
    (licenses: ILicense[]) => {
      switch (filterSelected) {
        case 'active':
          return licenses.filter((license) => license.status);
        case 'inactive':
          return licenses.filter((license) => !license.status);
        default:
          return licenses;
      }
    },
    [data, filterSelected],
  );

  return (
    <S.Container>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Data expiração</th>
          <th>Total de uso</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {getLicensesFiltered(data).map((license) => (
          <LicenseRow key={license.id} license={license} />
        ))}
      </tbody>
    </S.Container>
  );
};

interface LicenseRowProps {
  license: ILicense;
}

const LicenseRow = ({ license }: LicenseRowProps) => {
  return (
    <tr key={license.id}>
      <td>{license.name}</td>
      <td>{formatDate(license.expiration_date)}</td>
      <td>{license.total_uses}</td>
      <td>{license.status ? 'Ativo' : 'Inativo'}</td>
      <td>
        <button type='button'>
          <FiEdit />
        </button>
      </td>
    </tr>
  );
};

export default LicensesTable;
