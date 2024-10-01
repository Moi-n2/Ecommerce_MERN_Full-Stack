import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

function Gallery({ title, products }) {
  return (
    <div className="my-5">
      <Title
        text1={title.text1}
        text2={title.text2}
        subtitle={title.subtitle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-10">
        {products?.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
