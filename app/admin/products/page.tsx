'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCatgoryFilter] = useState("");
    const [sort, setSort] = useState("");
    const [addtocart, setaddtocart] = useState("");
    const router = useRouter();
    const [wishlist, setWishlist] = useState<number[]>([]);




    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [stock, setStock] = useState("");

    const getWishlist = async () => {

        const response = await fetch("/api/wishlist");

        const data = await response.json();

        const ids = data.wishlist.map((item: any) => item.product_id);

        setWishlist(ids);

    }
    useEffect(() => {
        fetchProducts();
        getWishlist();
    }, []);

    const addToWishlist = async (productID: number) => {
        try {

            // Product wishlist me hai
            if (wishlist.includes(productID)) {

                const response = await fetch("/api/wishlist", {
                    method: "DELETE",
                    headers: {
                        "Content-Typ  e": "application/json",
                    },
                    body: JSON.stringify({
                        userID: 1,
                        productID,
                    }),
                });
                const data = await response.json();
                if (data.success) {
                    // State update
                    setWishlist((prev) =>
                        prev.filter((id) => id !== productID)
                    );

                    alert("Removed from Wishlist");
                }

            }

            // Product wishlist me nahi hai
            else {

                const response = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: 1,
                        productID,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // State update
                    setWishlist((prev) => [...prev, productID]);

                    alert("Added to Wishlist");
                }

            }

        } catch (error) {
            console.log(error);
        }
    };
    const setAddToCart = async (productID: number) => {
        try {
            const response = await fetch("/api/AddtoCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: 1,
                    productID,
                    quantity: 1,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);

                // Cart page par le jao
                router.push("/AddtoCart");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };


    // const getCategoryFilter=async()=>{
    //   const response=await fetch(
    //     `/api/products?categorySearch=${categoryFilter}`
    //   );
    //   const data = await response.json();
    //   setProducts(data.products);
    // }








    const getProducts = async () => {

        const response = await fetch(
            `/api/admin/products?search=${search}&categorySearch=${categoryFilter}&sort=${sort}`
        );

        const data = await response.json();

        setProducts(data.products);

    };


    const deleteCategory = async (id: number) => {
        const response = await fetch("/api/categories", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });

        const data = await response.json();

        alert(data.message);

        fetchCategories(); // Latest category list refresh karne ke liye
    };



    const updateCategory = async () => {
        const response = await fetch("/api/categories", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: categoryId,
                categoryName,
            }),
        });

        const data = await response.json();

        alert(data.message);

        setCategoryId(null);
        setCategoryName("");

        fetchCategories();
    };




    const editCategory_name = (cat: any) => {
        setCategoryId(cat.id);
        setCategoryName(cat.name);
    };



    const addCategory = async () => {
        const response = await fetch("/api/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                categoryName,
            }),
        });

        const data = await response.json();

        console.log(data);

        alert(data.message);

        setCategoryName("");
    };


    const fetchCategories = async () => {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data.categories);
    }

    // Products ko fetch karne ke liye
    const fetchProducts = async () => {
        const response = await fetch("/api/admin/products");
        const data = await response.json();

        setProducts(data.products);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    //products mai data insert karne ke liye 
    const handleProducts = async () => {
        const response = await fetch("/api/admin/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                desc,
                price,
                category,
                image,
                stock,
            }),
        });

        const data = await response.json();

        alert(data.message);

        // form clear
        setTitle("");
        setDesc("");
        setPrice("");
        setCategory("");
        // setImage("");
        setStock("");

        // latest products fetch
        fetchProducts();
    };


    const editProduct = (product: any) => {
        setEditId(product.id);

        setTitle(product.title);
        setDesc(product.description);
        setPrice(product.price);
        // setCategory(product.category);
        // setImage(product.image);
        setStock(product.stock);
        setImage(null);
    };

    // Products ka data update krne ke liye
    const updateProducts = async () => {
        try {
            const formData = new FormData();

            formData.append("id", String(editId));
            formData.append("title", title);
            formData.append("description", desc);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("stock", stock);

            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("/api/admin/products", {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                fetchProducts();

                setEditId(null);
                setTitle("");
                setDesc("");
                setPrice("");
                setCategory("");
                setImage(null);
                setStock("");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id: number) => {
        const response = await fetch("/api/admin/products", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        });
        const data = await response.json();
        alert(data.message);
        fetchProducts();
    }




    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price_asc">Price Low to High</option>
                    <option value="price_desc">Price High to Low</option>
                </select>





                <input
                    type="text"
                    placeholder="Search Product"
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);
                    }}
                />
                <select
                    value={category}
                    onChange={(e) => setCatgoryFilter(e.target.value)}
                    className="border p-3 rounded"
                >
                    <option value="">Select Category</option>

                    {categories.map((cat: any) => (
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button onClick={getProducts}>
                    search
                </button>

                {
                    products.map((product: any) => (
                        <div key={product.id}>
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>

                        </div>
                    ))
                }

                {/* <select
          value={category}
          onChange={(e) => setCatgoryFilter(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">Select Category</option>

          {categories.map((cat: any) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select> */}
                {/* <button onClick={getCategoryFilter}>
          GetcategoryFilter
        </button> */}









                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                    placeholder="Product Title"
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Description"
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="border p-3 rounded"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded"
                >
                    <option value="">Select Category</option>

                    {categories.map((cat: any) => (
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        console.log("Button Clicked");
                        setShowModal(true);
                    }}
                >
                    Add Category
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            setImage(file);
                        }
                    }}
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Stock"
                    className="border p-3 rounded"
                />

            </div>

            <button
                onClick={editId ? updateProducts : handleProducts}
                className="mt-4 bg-black text-white px-5 py-3 rounded"
            >
                {editId ? "Update Product" : "Add Product"}
            </button>

            <h1 className="text-2xl font-bold mt-10 mb-5">
                Product List
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products?.map((product: any) => (

                    <div
                        key={product.id}
                        className="border rounded p-4 shadow hover:shadow-lg transition"
                    >
                        <button onClick={() => addToWishlist(product.id)}>
                            {wishlist.includes(product.id) ? "❤️" : "🤍"}
                        </button>


                        {/* Product Details */}
                        <Link
                            href={`/products/${product.id}`}
                            className="block"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                height={200}
                                width={200}
                                className="w-full h-40 object-cover rounded"
                            />

                            <h2 className="font-bold text-lg mt-3">
                                {product.title}
                            </h2>

                            <p>{product.description}</p>

                            <p className="font-semibold">
                                ₹ {product.price}
                            </p>

                            <p>{product.category}</p>

                            <p>Stock: {product.stock}</p>
                        </Link>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={() => editProduct(product)}
                                className="bg-black text-black px-4 py-2 rounded"
                            >
                                Update
                            </button>

                            <button
                                onClick={() => deleteProduct(product.id)}
                                className="bg-red-500 text-black px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setAddToCart(product.id)}
                                className="bg-green-500 text-black px-4 py-2 rounded"
                            >
                                Add To Cart
                            </button>

                        </div>

                    </div>
                ))}
            </div>

            {
                showModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 99999,
                        }}
                    >
                        <div
                            style={{
                                background: "white",
                                width: "400px",
                                padding: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            <h1>Add Category</h1>

                            <input
                                type="text"
                                placeholder="Category"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                style={{
                                    width: "100%",
                                    border: "1px solid black",
                                    padding: "10px",
                                    marginTop: "15px",
                                }}
                            />

                            <div>
                                {categories.map((cat: any) => (
                                    <div key={cat.id} className="flex cursor-pointer justify-between items-center border p-2 mt-2">
                                        <span>{cat.name}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => editCategory_name(cat)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(cat.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))}

                            </div>


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                <button onClick={() => setShowModal(false)}>
                                    Close
                                </button>

                                <button
                                    onClick={
                                        categoryId
                                            ? updateCategory
                                            : addCategory
                                    }
                                >
                                    {categoryId ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}