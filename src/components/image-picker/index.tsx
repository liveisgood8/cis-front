import './styles.css';
import * as React from 'react';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  initialImageUrl?: string;
  imageUrlList: string[];
  onImageChange: (imageUrl: string, index: number) => void;
}

export const ImagePickerComponent: React.FC<IProps> = (props) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const { initialImageUrl, imageUrlList } = props;

  React.useEffect(() => {
    const initialImageIndex = imageUrlList.findIndex((e) => e === initialImageUrl);
    if (initialImageIndex !== -1) {
      setImageIndex(initialImageIndex);
    }
  }, [imageUrlList, initialImageUrl]);

  const onNextImage = (): void => {
    if (imageIndex < props.imageUrlList.length - 1) {
      const newImageIndex = imageIndex + 1;
      setImageIndex(newImageIndex);
      props.onImageChange(props.imageUrlList[newImageIndex], imageIndex);
    }
  };

  const onPreviousImage = (): void => {
    if (imageIndex > 0) {
      const newImageIndex = imageIndex - 1;
      setImageIndex(newImageIndex);
      props.onImageChange(props.imageUrlList[newImageIndex], newImageIndex);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <FontAwesomeIcon
        className="change-arrow"
        icon={faAngleLeft}
        onClick={onPreviousImage}
      />
      <Image className="profile-image" src={props.imageUrlList[imageIndex]} roundedCircle />
      <FontAwesomeIcon
        className="change-arrow"
        icon={faAngleRight}
        onClick={onNextImage}
      />
    </div>
  );
};
