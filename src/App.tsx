import { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Forms Demo</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Open Uncontrolled Form
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
