import { useContext } from "react";
import SearchBar from "@/components/SearchBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Pagination from "rc-pagination";
import { ShopContext } from "@/context/ShopContext";

const size = 20;

function Collection() {
  const {
    productData,
    currentPageProducts,
    setCurrentPage,
    currentPage,
    listRef,
  } = useContext(ShopContext);

  return (
    <div className="flex flex-col gap-1 sm:gap-10 border-t" ref={listRef}>
      <SearchBar />
      <main className="flex gap-10 flex-1">
        <Filter />
        <div className="flex-1">
          <div className="flex justify-between">
            <Title text1="all" text2="collections" />
            <Sort />
          </div>

          <div className="my-4 flex gap-5 flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {currentPageProducts?.map((item) => (
                <ProductItem item={item} key={item._id} />
              ))}
            </div>
            <Pagination
              className="self-end"
              onChange={setCurrentPage}
              current={currentPage}
              pageSize={size}
              total={productData?.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Collection;
