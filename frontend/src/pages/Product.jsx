import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedproducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("");
  const { fetchItemData, currency, getRelatedItems } = useContext(ShopContext);

  const [image, setImage] = useState();
  useEffect(() => {
    const res = fetchItemData(productId) || [];
    setProduct(res);
    setImage(() => res.image[0]);
    const relatedItems = getRelatedItems(res.category, res.subCategory);
    setRelatedProducts(relatedItems);
  }, [productId, fetchItemData, getRelatedItems]);

  const addToCart = () => {};
  return (
    <div className="border-t-2 space-y-10 pt-10">
      <div className="flex gap-2 sm:gap-12 flex-col sm:flex-row xl:h-[40vw]">
        <div className="flex-1 flex flex-col-reverse gap-3 xl:flex-row h-full">
          <div className="flex xl:flex-col overflow-x-auto xl:overflow-y-scroll xl:justify-between normal xl:w-[18.7%] w-full gap-2 xl:h-[75%] h-auto">
            {product?.image?.map((item, index) => (
              <img
                src={item}
                alt="image"
                key={index}
                className="w-[24%] xl:w-full object-contain cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          <div className="w-full">
            <img src={image} alt="" className="object-contain w-full" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product?.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CHART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews 122</p>
        </div>
        <div className="flex flex-col gap-4 p-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            consectetur similique sint laboriosam fugit itaque dolorum debitis
            distinctio quis iste repellat quo cumque sequi necessitatibus,
            tempora molestiae porro expedita nobis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus recusandae, laboriosam quas quasi accusantium labore,
            odit id tenetur possimus rem facere. Asperiores, voluptatum?
            Consequuntur laudantium animi ratione, veritatis quae eius.
          </p>
        </div>
      </div>

      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {relatedproducts?.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
