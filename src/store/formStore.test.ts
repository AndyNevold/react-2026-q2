import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from './formStore';

describe('formStore', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('should add submission correctly', () => {
    const testData = {
      name: 'John',
      age: 25,
      email: 'john@example.com',
      gender: 'male' as const,
      termsAccepted: true,
      imageBase64: 'data:image/png;base64,...',
      password: 'Password123!',
      country: 'USA',
    };

    useFormStore.getState().addSubmission(testData);

    const submissions = useFormStore.getState().submissions;
    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toBe('John');
    expect(submissions[0].id).toBeDefined();
    expect(submissions[0].submittedAt).toBeInstanceOf(Date);
  });

  it('should have default countries list', () => {
    const countries = useFormStore.getState().countries;
    expect(countries).toHaveLength(20);
    expect(countries).toContain('United States');
  });
});
