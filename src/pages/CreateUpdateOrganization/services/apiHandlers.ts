import apiClient from '@/services/apiClient';
import { OrganizationFormData } from '..';

export const fetchOrganizationById = (orgId: number | string) => {
  return apiClient.get(`organizations/${orgId}`);
};

export const fetchOperationAreas = () => {
  return apiClient.get('operation_areas');
};

export const createOrganization = (data: any) => {
  return apiClient.post('organizations', {
    organization: data,
  });
};

export const updateOrganization = (orgId: number | string, data: OrganizationFormData) => {
  return apiClient.put(`organizations/${orgId}`, {
    organization: data,
  });
};
