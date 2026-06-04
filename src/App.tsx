import './App.css';

import { useFormStore } from './store/formStore';

export function App() {
  const { submissions, addSubmission, countries } = useFormStore();

  console.log('countries:', countries);
  console.log('submissions:', submissions.length);

  return (
    <div>
      <button
        onClick={() =>
          addSubmission({
            name: 'Test',
            age: 20,
            email: 'test@test.com',
            gender: 'male',
            termsAccepted: true,
            imageBase64: '',
            password: 'Test123!',
            country: 'USA',
          })
        }
      >
        Add Test Submission
      </button>

      {submissions.map((sub) => (
        <div key={sub.id}>
          {sub.name} - {sub.email}
        </div>
      ))}
    </div>
  );
}
