import { useRef } from "react";
import { useClickAway } from 'react-use';
import { LeftBar } from "./left-bar";

interface Props {
  clickAwayCb: () => void;
}

export const MobileLeftBar = ({ clickAwayCb }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useClickAway(wrapperRef, () => {
    clickAwayCb();
  });

  return <div className="fixed top-0 left-0 w-full h-full bg-black/80">
    <div ref={wrapperRef}>
      <LeftBar mobileCloseCb={() => clickAwayCb()} />
    </div>
  </div>
}