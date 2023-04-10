import { ReactNode, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { useClickAway } from "react-use";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
  onCloseCallback?: () => void;
}

export const ModalWrapper = ({ title, children, onCloseCallback }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useClickAway(wrapperRef, () => { onCloseCallback?.() })

  useEffect(() => {
    // Close modal on escape char
    function handleEscKey(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        onCloseCallback?.();
      }
    }

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onCloseCallback]);

  return <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/70">
    <div className="px-10 lg:px-20 py-20 bg-white rounded-md w-[50rem] mx-5 lg:mx-0" ref={wrapperRef}>
      <div className="flex items-center justify-between w-full mb-10">
        <p className="text-2xl font-bold">{title}</p>

        <button type="button" onClick={() => onCloseCallback?.()}>
          <GrClose />
        </button>
      </div>
      {children}
    </div>
  </div>
}