import {useState} from "react";

export function useModal(isOpen = false): [boolean, ()=>void, ()=>void] {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  function openModal():void {
    setIsModalOpen(true);
  }

  function closeModal():void {
    setIsModalOpen(false);
  }

  return [isModalOpen, openModal, closeModal];
}
