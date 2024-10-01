import { useContext } from "react";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import { ShopContext } from "../context/ShopContext";
import Policy from "../components/Policy";
import Subscribe from "../components/subscribe";

function Home() {
  const { latesProducts, bestSellerProdcuts, title1, title2, ourPolicy } =
    useContext(ShopContext);

  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Gallery title={title1} products={latesProducts} />
      <Gallery title={title2} products={bestSellerProdcuts} />

      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        {ourPolicy.map((item, index) => (
          <Policy item={item} key={index} />
        ))}
      </div>

      <Subscribe />
    </div>
  );
}

export default Home;
