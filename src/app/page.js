"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

const Home = () => {
  const search = useSearchParams();
  const skip = parseInt(search.get("skip") || 0);
  const limit = parseInt(search.get("limit") || 8);
  const router = useRouter();

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", limit, skip],
    queryFn: async () => {
      const data = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      ).then((res) => res.json());
      return data.products;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await fetch("https://dummyjson.com/products/categories").then(
        (res) => res.json()
      );
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const handlePrevClick = () => {
    navigateWithQueryParams(-4);
  };

  const handleNextClick = () => {
    navigateWithQueryParams(4);
  };

  const navigateWithQueryParams = (moveCount) => {
    const newSkip = Math.max(skip + moveCount, 0);
    router.push(`/?skip=${newSkip}&limit=${limit}`);
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              My store
            </h2>
          </div>

          <div>
            <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
              <input
                onChange={() => {}}
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="IPhone"
              />
              <select className="border p-2 text-gray-800" onChange={() => {}}>
                <option>Select category</option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={products} />

          <div className="flex gap-2 justify-center mt-12">
            <button
              disabled={skip < limit}
              className="bg-purple-500 px-4 py-1 text-white rounded"
              onClick={handlePrevClick}
            >
              Prev
            </button>
            <button
              disabled={limit + skip >= products?.total}
              className="bg-purple-500 px-4 py-1 text-white rounded"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="relative flex justify-center min-h-screen items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        className="rounded-full h-28 w-28"
      />
    </div>
  );
};

const ErrorDisplay = ({ error }) => {
  return <h3>Error: {error.message}</h3>;
};

const ProductGrid = ({ products }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
      </div>
    </div>
  );
};

export default Home;

// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";
// import { useState } from "react";

// const Home = () => {
//   const search = useSearchParams();
//   const skip = parseInt(search.get("skip") || 0);
//   const limit = parseInt(search.get("limit") || 8);

//   const router = useRouter();
//   const {
//     isLoading,
//     error,
//     data: products,
//   } = useQuery({
//     queryKey: ["products", limit, skip],
//     queryFn: async () => {
//       const data = await fetch(
//         `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
//       ).then((res) => res.json());
//       return data.products;
//     },
//   });

//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       return await fetch("https://dummyjson.com/products/categories").then(
//         (res) => res.json()
//       );
//     },
//   });

//   // const handleMove = (moveCount) => {
//   //   // Next
//   //   // skip = 4, moveCount = 4
//   //   // 4 + 4 = 8

//   //   // Prev
//   //   // skip = 0, moveCount = -4
//   //   // 0 + -4 = -4

//   //   setSearchParams((prev) => {
//   //     prev.set("skip", Math.max(skip + moveCount, 0));
//   //     return prev;
//   //   });
//   // };

//   if (isLoading) {
//     return (
//       <div className="relative flex justify-center min-h-screen items-center">
//         <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
//         <img
//           src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
//           className="rounded-full h-28 w-28"
//         />
//       </div>
//     );
//   }

//   if (error) {
//     return <h3>Error: {error.message}</h3>;
//   }

//   return (
//     <>
//       <div className="bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//               My store
//             </h2>
//           </div>
//           <div>
//             <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
//               <input
//                 onChange={() => {}}
//                 type="text"
//                 name="price"
//                 id="price"
//                 className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="IPhone"
//               />
//               <select className="border p-2 text-gray-800" onChange={() => {}}>
//                 <option>Select category</option>
//                 {categories?.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {products?.map((product) => (
//               <div key={product.id} className="group relative">
//                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <Link href={`/products/${product.id}`}>
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         {product.title}
//                       </Link>
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {product.category}
//                     </p>
//                   </div>
//                   <p className="text-sm font-medium text-gray-900">
//                     ₹{product.price}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-2  justify-center mt-12">
//             <button
//               className="bg-purple-500 px-4 py-1 text-white rounded"
//               onClick={() => {
//                 router.push(
//                   "/" + "?" + "skip=" + (+skip - 4) + "&" + "limit=" + limit
//                 );
//               }}
//             >
//               Prev
//             </button>
//             <button
//               className="bg-purple-500 px-4 py-1 text-white rounded"
//               onClick={() => {
//                 router.push(
//                   "/" + "?" + "skip=" + (+skip + 4) + "&" + "limit=" + limit
//                 );
//               }}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
