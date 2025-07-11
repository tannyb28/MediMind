// src/hooks/useCurrentPatient.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { dataTagErrorSymbol } from '@tanstack/react-query';

export interface Patient {
  _id: string;
  email: string;
  name: { first: string; last: string };
  device_id: string;
  therapy_id: string;
  // … other fields
}

export function useCurrentPatient() {
  const [patient, setPatient] = useState<Patient| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Patient>('/patients/me')
      .then(res => setPatient(res.data))
      .catch(() => setPatient(null))
      .finally(() => setLoading(false));
  }, []);

  return { patient, loading };
}
