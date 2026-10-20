import { useEffect } from 'react';

interface PropsType {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
}
const useClickOutside = ({ dialogRef, isOpen }: PropsType) => {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
};

export default useClickOutside;
