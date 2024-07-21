import React from 'react';
import styled from 'styled-components';

const GalleryWrapper = styled.section`
  align-content: flex-start;
  flex-wrap: wrap;
  align-self: center;
  margin-top: 70px;
  width: 100%;
  max-width: 1109px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  @media (max-width: 991px) {
    margin-top: 27px;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 120px;
`;

const images = [
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a802f0336b4f09df5209d8e7cc4f6d1c1ee1aacc8700a3efac4e8f010650d1db?apiKey=e3765372b84f44f7af794f9207eac8b0&',
    aspectRatio: '0.63',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ce811972508e4e50035ad50f28fc9a8cc61aee21d63d6113581af98080794347?apiKey=e3765372b84f44f7af794f9207eac8b0&',
    aspectRatio: '0.49',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cf4b08d7be7fb9a5d0adf24e71921ed62fa9e673c11506f3d7250cd0df34ef81?apiKey=e3765372b84f44f7af794f9207eac8b0&',
    aspectRatio: '0.41',
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/12438d942d359376e927d2712063bed136cd4d68f51999e3213b29d1fd889d7a?apiKey=e3765372b84f44f7af794f9207eac8b0&',
    aspectRatio: '0.35',
  },
];

function ImageGallery() {
  return (
    <GalleryWrapper>
      <GalleryGrid>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <GalleryImage
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              style={{ aspectRatio: image.aspectRatio }}
              loading="lazy"
            />
          </ImageWrapper>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
}

export default ImageGallery;