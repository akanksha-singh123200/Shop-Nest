import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({ params }: Props) {
  // Next.js 16
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!data.product) {
    notFound();
  }

  const product = data.product;

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="grid grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <p className="text-2xl mt-5">
            ₹ {product.price}
          </p>

          <p className="mt-5">
            {product.description}
          </p>

          <p className="mt-3">
            Category : {product.category}
          </p>

          <p className="mt-3">
            Stock : {product.stock}
          </p>
        </div>

      </div>
    </div>
  );
}