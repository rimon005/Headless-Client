import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
const Product = ({ data, id }) => {
  // console.log(data);
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="thumbnail">
        <img
          src={
            process.env.REACT_APP_DEV_URL +
            data.attributes.img.data[0].attributes.url
          }
          alt=""
        />
      </div>
      <div className="prod-details">
        <span className="name">{data.attributes.title}</span>
        <span className="price">${data.attributes.price}</span>
      </div>
    </div>
  );
};

export default Product;
