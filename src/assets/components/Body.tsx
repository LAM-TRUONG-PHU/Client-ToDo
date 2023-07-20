import React from "react";

interface IProps {
  children: React.ReactNode; //co the truyen mot cai element khac vao day
  className?: string;
}

export default function Body(props: IProps) {
  return (
    <div
      className={`bg-[url('assets/img/image.png')] h-screen w-full bg-no-repeat bg-cover relative bg-black ${props.className}`}
    >
      {props.children}
    </div>
  );
}