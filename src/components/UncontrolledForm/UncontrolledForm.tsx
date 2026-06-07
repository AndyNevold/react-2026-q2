import { useRef, useState } from 'react';
import { useFormStore } from '../../store/formStore';
import styles from './UncontrolledForm.module.css';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  terms?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  image?: string;
}

const validateForm = (formData: FormData, countries: string[]): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.get('name')) {
    errors.name = 'Name is required';
  } else {
    const name = formData.get('name') as string;
    if (name[0] !== name[0].toUpperCase()) {
      errors.name = 'First letter must be uppercase';
    }
  }

  const age = formData.get('age') as string;
  if (!age) {
    errors.age = 'Age is required';
  } else {
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 0) {
      errors.age = 'Age must be a positive number';
    }
  }

  const email = formData.get('email') as string;
  if (!email) {
    errors.email = 'Email is required';
  } else {
    const atIndex = email.indexOf('@');
    const lastAtIndex = email.lastIndexOf('@');
    const dotIndex = email.lastIndexOf('.');

    if (atIndex === -1 || atIndex !== lastAtIndex) {
      errors.email = 'Email must contain exactly one @';
    } else if (atIndex === 0) {
      errors.email = 'Local part before @ cannot be empty';
    } else if (dotIndex === -1 || dotIndex < atIndex) {
      errors.email = 'Domain must contain a dot';
    }
  }

  const gender = formData.get('gender') as string;
  if (!gender) {
    errors.gender = 'Please select gender';
  }

  const terms = formData.get('terms') as string;
  if (!terms) {
    errors.terms = 'You must accept Terms and Conditions';
  }

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  if (!password) {
    errors.password = 'Password is required';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  const country = formData.get('country') as string;
  if (!country) {
    errors.country = 'Country is required';
  } else if (!countries.includes(country)) {
    errors.country = 'Country must be selected from the list';
  }

  return errors;
};

const getPasswordStrength = (
  password: string
): { score: number; text: string; className: string } => {
  let score = 0;

  if (password.length === 0) {
    return { score: 0, text: '', className: '' };
  }

  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 2) {
    return { score, text: 'Weak password', className: styles.strengthWeak };
  } else if (score === 3) {
    return { score, text: 'Medium password', className: styles.strengthMedium };
  } else {
    return { score, text: 'Strong password', className: styles.strengthStrong };
  }
};

interface UncontrolledFormProps {
  onClose: () => void;
}

export function UncontrolledForm({ onClose }: UncontrolledFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageError, setImageError] = useState('');

  const { addSubmission, countries } = useFormStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) {
      setImageBase64('');
      return;
    }

    if (!file.type.includes('png') && !file.type.includes('jpeg')) {
      setImageError('Only PNG or JPEG images are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.set('imageBase64', imageBase64);

    const validationErrors = validateForm(formData, countries);

    if (imageError) {
      validationErrors.image = imageError;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addSubmission({
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      gender: formData.get('gender') as 'male' | 'female' | 'other',
      termsAccepted: formData.get('terms') === 'on',
      imageBase64,
      password: formData.get('password') as string,
      country: formData.get('country') as string,
    });

    formRef.current.reset();
    setPassword('');
    setConfirmPassword('');
    setImageBase64('');
    setErrors({});

    onClose();
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="age" className={styles.label}>
          Age *
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
        />
        {errors.age && <div className={styles.error}>{errors.age}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.label}>Gender *</span>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" name="gender" value="male" aria-label="Male" />{' '}
            Male
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="female"
              aria-label="Female"
            />{' '}
            Female
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="other"
              aria-label="Other"
            />{' '}
            Other
          </label>
        </div>
        {errors.gender && <div className={styles.error}>{errors.gender}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Password *
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {passwordStrength.text && (
          <div
            className={`${styles.strengthIndicator} ${passwordStrength.className}`}
          >
            {passwordStrength.text}
          </div>
        )}
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password *
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="country" className={styles.label}>
          Country *
        </label>
        <select
          id="country"
          name="country"
          className={`${styles.input} ${errors.country ? styles.inputError : ''}`}
        >
          <option value="">-- Select a country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <div className={styles.error}>{errors.country}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="image" className={styles.label}>
          Profile Image * (PNG/JPEG, max 2MB)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageUpload}
          className={styles.input}
        />
        {imageError && <div className={styles.error}>{imageError}</div>}
        {imageBase64 && (
          <div style={{ marginTop: '8px' }}>
            <img
              src={imageBase64}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.radioLabel}>
          <input type="checkbox" name="terms" /> I accept the Terms and
          Conditions *
        </label>
        {errors.terms && <div className={styles.error}>{errors.terms}</div>}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}
