import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Context } from "../../utils/context";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  // find product by id
  const { id } = useParams();
  const { handleAddToCart } = useContext(Context);
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const product = data?.data?.[0]?.attributes;
  console.log(product);

  // quantity

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  // handle Add To Cart

  return (
    <div className="single-product-main-content">
      <div className="layout">
        {!data ? (
          <h1 style={{ padding: "20px", color: "#8E2DE2", fontSize: "36px" }}>
            Product Loading
          </h1>
        ) : (
          <div className="single-product-page">
            <div className="left">
              <img src={product?.img.data.attributes.url} alt="" />
            </div>
            <div className="right">
              <span className="name">{product?.title}</span>
              <span className="price">{product?.price}</span>
              <spam className="desc">{product?.desc}</spam>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  <span onClick={decrement}>-</span>
                  <span>{quantity}</span>
                  <span onClick={increment}>+</span>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => {
                    handleAddToCart(data?.data?.[0], quantity);
                    setQuantity(1);
                  }}
                >
                  <FaCartPlus size={20} />
                  ADD TO CART
                </button>
              </div>

              <span className="divider" />

              <div className="info-item">
                <span className="text-bold">
                  Category:
                  <span>
                    {" "}
                    {product?.categories?.data[0]?.attributes?.title}
                  </span>
                </span>
                <span className="text-bold">
                  Category:
                  <span>
                    <FaFacebookF size={16} />
                    <FaTwitter size={16} />
                    <FaInstagram size={16} />
                    <FaLinkedinIn size={16} />
                    <FaPinterest size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        <RelatedProducts
          productId={id}
          categoryId={product?.categories?.data[0]?.id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
