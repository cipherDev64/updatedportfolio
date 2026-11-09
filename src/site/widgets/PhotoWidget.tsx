import type { RefObject } from "react";
import avatar from "../../assets/avatar.webp";
import { profile } from "../../content/profile";
import Widget from "./Widget";

export default function PhotoWidget({ bounds, className = "" }: { bounds?: RefObject<HTMLElement | null>; className?: string }) {
  return (
    <Widget label="Photo" bounds={bounds} delay={0.15} className={`overflow-hidden p-0 ${className}`}>
      <div className="relative aspect-[4/5] w-full">
        <img src={avatar} alt={`Portrait of ${profile.name}`} draggable={false} className="size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="absolute bottom-3 left-3.5 text-[15px] font-semibold text-white">hey, that’s me</p>
      </div>
    </Widget>
  );
}
