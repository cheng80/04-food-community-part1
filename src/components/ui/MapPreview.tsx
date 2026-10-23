import Image from "next/image";
import { Utensils } from "lucide-react";
import { cx } from "@/lib/cx";
import mapImage from "../../../generated.png";
import { Icon } from "./Icon";

export interface MapPreviewProps {
  /** 없으면 "주소를 고르면…" 빈 상태 */
  address?: string;
  className?: string;
}

/** design.pen 02 상세 · Kakao Map / 03 등록 · Map Placeholder (정적 지도 이미지 + 핀) */
export function MapPreview({ address, className }: MapPreviewProps) {
  if (!address) {
    return (
      <div
        className={cx(
          "flex h-[140px] w-full flex-col items-center justify-center gap-(--spacing-8) rounded-xl bg-background-subtle",
          className,
        )}
      >
        <Icon name="image" size={24} className="text-icon-disabled" />
        <p className="body-md text-text-tertiary">주소를 고르면 지도에 핀이 표시돼요</p>
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${address} 지도`}
      className={cx(
        "relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-[14px] border border-border-default",
        className,
      )}
    >
      <Image src={mapImage} alt="" fill sizes="(min-width: 1280px) 620px, 100vw" className="object-cover" />
      <span className="relative flex size-10 items-center justify-center rounded-full border-[3px] border-border-surface bg-background-brand shadow-[0_4px_10px_var(--color-shadow-default)]">
        <Utensils size={18} aria-hidden className="text-icon-on-brand" />
      </span>
    </div>
  );
}
