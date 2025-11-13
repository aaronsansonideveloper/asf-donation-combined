import { CSSProperties, useEffect, useRef } from 'react';
import { useFlatInject } from 'src/service';

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
  const isPlayFlag = useRef(false);
  const { setCurrentVideoId, currentVideoId } = useFlatInject('appStore');
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (isPlayFlag.current && currentVideoId !== id) {
      ref.current!.pause();
    }
    isPlayFlag.current = currentVideoId === id;
  }, [currentVideoId]);
  useEffect(() => {
    return () => {
      if (isPlayFlag.current) {
        ref.current!?.pause();
      }
    };
  }, []);
  // deconstruct props from props and give optional values a default value
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
      ref={ref}
      width={width}
      height={height}
      controls={showControls}
      preload="auto"
      autoPlay={false}
      muted={false}
      loop={allowLoop}
      style={{ borderRadius: hasBorderRadius ? '12px' : '2px', objectFit: 'fill', ...style }}
      onPlay={() => {
        const handleOk = () => {
          setCurrentVideoId(id);
        };
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
