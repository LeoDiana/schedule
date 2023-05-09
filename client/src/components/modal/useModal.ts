import { useState } from 'react';

type ReturnType = [boolean, () => void, () => void]

export function useModal(isOpen = false): ReturnType {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  function openModal(): void {
    setIsModalOpen(true);
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return [isModalOpen, openModal, closeModal];
}
