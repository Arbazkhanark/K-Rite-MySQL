import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { addToCartAC } from "../redux/actions";
import { resetCartState } from "../redux/actions";
import {LazyLoadImage} from "react-lazy-load-image-component"

export default function Products({  }) {
  const products = useSelector((state) => state.products.products);
  const cartSuccess = useSelector((state) => state.cart.success);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const cartError = cart && cart.error;
  const dispatch = useDispatch();

  const addToCart = (product, userId) => {
    dispatch(addToCartAC(product, userId));
  };

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      dispatch(resetCartState());
    }
    if (cartSuccess) {
      toast.success(cartSuccess);
      dispatch(resetCartState());
    }
  }, [cartError, cartSuccess, dispatch]);

  return (
    <div className="bg-white">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-center font-bold text-3xl mb-10">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product._id}
              href={product.href}
              className="group border px-2 py-2 rounded"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                <LazyLoadImage
                  src={product.image}
                  alt="product"
                  loading="lazy"
                  // effect="blur"
                  // placeholderSrc={product.image}
                  className="w-full h-[50vh] object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-500">{product.name}</h3>
              <p className="mt-1 text-sm font-medium text-gray-500">
                ₹{product.price}
              </p>
              <button
                className="bg-gray-900 text-white rounded text-sm py-1.5 px-4 mt-4 w-full"
                onClick={() => addToCart(product, userId)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
