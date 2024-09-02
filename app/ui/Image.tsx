interface ImageProps {
  className?: string;
  src?: string;
}

const Image: React.FC<ImageProps> = ({ className, src }) => {
  return <img src={src} className={`""+ ${className}`} />;
};

export default Image;
