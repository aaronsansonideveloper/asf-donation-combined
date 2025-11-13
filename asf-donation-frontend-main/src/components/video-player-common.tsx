import { CSSProperties, useRef } from 'react';

export function Videoplayer({
  id,
  props,
}: {
  id: string;
  props: {
    src: string;
    type: 'video/mp4';
    label?: string;
    width?: number | string;
    height?: number | string;
    showControls?: boolean;
    isAutoPlay?: boolean;
    allowLoop?: boolean;
    hasBorderRadius?: boolean;
    srcLang?: string;
    handlePlay?: (onOk: () => void, handleFail: () => void) => void;
    style?: CSSProperties;
  };
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const {
    src,
    type,
    width = '100%',
    height,
    showControls = true,
    isAutoPlay = true,
    allowLoop = true,
    hasBorderRadius = true,
    handlePlay = (onOk) => onOk?.(),
    style = {},
  } = props;

  return (
    <video
      muted={true}
      ref={ref}
      width={width}
      height={height}
      controls={showControls}
      preload="auto"
      autoPlay={isAutoPlay}
      loop={allowLoop}
      style={{ borderRadius: hasBorderRadius ? '12px' : '2px', objectFit: 'fill', ...style }}
      onPlay={() => {
        const handleOk = () => {};
        const handleFail = () => {
          ref.current!.pause();
        };
        handlePlay?.(handleOk, handleFail);
      }}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
