import apiClient from '@/services/apiClient';
import { OrganizationFormData } from '..';

export const fetchOrganizationById = async (orgId: number | string) => {
  const organization = await apiClient.get(`organizations/${orgId}`);
  return organization;
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
  const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

  return apiClient.put(`organizations/${orgId}`, data, headers);
};
