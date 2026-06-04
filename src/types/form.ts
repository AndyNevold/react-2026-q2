export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  termsAccepted: boolean;
  imageBase64: string;
  password: string;
  country: string;
  submittedAt: Date;
}

export interface FormStore {
  submissions: FormData[];
  countries: string[];
  addSubmission: (data: Omit<FormData, 'id' | 'submittedAt'>) => void;
}
