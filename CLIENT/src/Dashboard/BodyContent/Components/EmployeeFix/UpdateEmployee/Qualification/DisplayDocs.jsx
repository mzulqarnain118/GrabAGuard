import React from 'react';
import { useLocation } from 'react-router-dom';
const ImageDisplay = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data, "state")
  return (
    <div>
      {data?.map((image) => (
        <img src={image.url} alt={image.type} key={image._id} />
      ))}
    </div>
  );
};

export default ImageDisplay;
