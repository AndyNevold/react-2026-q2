import { create } from 'zustand';
import type { FormStore } from '../types/form';

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Ukraine',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
];

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries,

  addSubmission: (data) =>
    set((state) => ({
      submissions: [
        ...state.submissions,
        {
          ...data,
          id: crypto.randomUUID(),
          submittedAt: new Date(),
        },
      ],
    })),
}));
