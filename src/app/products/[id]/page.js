"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

const Products = () => {
  const params = useParams();

  const { id } = params;

  //   Mutations
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(`https://dummyjson.com/products/${id}`, newProduct);
    },
  });

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    // staleTime: 10000,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  if (mutation.isLoading) {
    return <h3>Updating...</h3>;
  }

  if (mutation.isError) {
    return <h3>Error while updating. {mutation.error.message}</h3>;
  }

  return (
    <>
      <div className="md:flex bg-white items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="border-2 border-gray-500">
          <img
            className="w-full"
            alt="img of a girl posing"
            src={product?.images[0]}
          />
          <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
            <img
              alt="img-tag-one"
              className="md:w-48 md:h-48 w-full border-2 border-gray-500"
              src={product?.images[1]}
            />
            <img
              alt="img-tag-one"
              className="md:w-48 md:h-48 w-full border-2 border-gray-500"
              src={product?.images[2]}
            />
            <img
              alt="img-tag-one"
              className="md:w-48 md:h-48 w-full border-2 border-gray-500"
              src={product?.images[3]}
            />
            <img
              alt="img-tag-one"
              className="md:w-48 md:h-48 w-full border-2 border-gray-500"
              src={product?.images[4]}
            />
          </div>
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600">
              {product?.brand}
            </p>
            <h1
              className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
            >
              {product?.title}
            </h1>
          </div>
          <div className="py-4 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Category</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600">
                {product?.category}
              </p>
            </div>
          </div>

          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
              {product?.description}
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600">
              Discount Percentage: {product?.discountPercentage}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Price: {product?.price}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Rating: {product?.rating}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Stock: {product?.stock}
            </p>
            <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
              Composition: 100% calf leather, inside: 100% lamb leather
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          mutation.mutate({ title: "Updated product" });
        }}
      >
        Create product
      </button>
    </>
  );
};

export default Products;
