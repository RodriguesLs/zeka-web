import apiClient from '@/services/apiClient';
import { LicenseFormData } from '..';

export const fetchLicenseById = (licenseId: number | string) => {
  return apiClient.get(`licenses/${licenseId}`);
};

export const createLicense = (data: LicenseFormData) => {
  return apiClient.post('licenses', {
    license: data,
  });
};

export const fetchOrganizations = () => apiClient.get('organizations');

export const updateLicense = (licenseId: number | string, data: LicenseFormData) => {
  return apiClient.put(`licenses/${licenseId}`, {
    license: data,
  });
};
