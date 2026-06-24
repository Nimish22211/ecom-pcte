import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import { createListing } from "../../services/api";

const CATEGORIES = ["Books", "Electronics", "Notes", "Stationery", "Hostel", "Other"];

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30";
const labelClasses = "mb-1.5 block text-sm font-medium text-slate-700";

function SectionHeading({ step, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-semibold text-white">
        {step}
      </span>
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
    </div>
  );
}

function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (imageUrls.length === 0) return setError("Please upload at least one image");
    if (!category) return setError("Please select a category");

    setLoading(true);
    try {
      const data = { title, description, price: Number(price), category, images: imageUrls };
      await createListing(data);
      navigate("/student/my-listing");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10">
        <h1 className="text-center text-3xl font-bold text-slate-900">Create New Listing</h1>
        <p className="mt-2 mb-8 text-center text-slate-500">
          Sell your products to students on campus
        </p>

        {error && (
          <p role="alert" className="mb-6 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            <SectionHeading step={1} title="Product Details" />
            <div className="flex flex-col gap-4 pl-10">
              <div>
                <label htmlFor="sell-title" className={labelClasses}>
                  Product name
                </label>
                <input
                  id="sell-title"
                  type="text"
                  placeholder="e.g. Engineering Mathematics textbook"
                  className={inputClasses}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="sell-description" className={labelClasses}>
                  Description
                </label>
                <textarea
                  id="sell-description"
                  placeholder="Condition, edition, why you're selling, etc."
                  className={`${inputClasses} min-h-[96px] resize-y`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-8">
            <SectionHeading step={2} title="Pricing & Category" />
            <div className="flex flex-col gap-4 pl-10">
              <div>
                <label htmlFor="sell-price" className={labelClasses}>
                  Price (₹)
                </label>
                <input
                  id="sell-price"
                  type="number"
                  placeholder="e.g. 250"
                  className={inputClasses}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={1}
                />
              </div>
              <div>
                <label htmlFor="sell-category" className={labelClasses}>
                  Category
                </label>
                <select
                  id="sell-category"
                  className={inputClasses}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-8">
            <SectionHeading step={3} title="Product Images" />
            <div className="pl-10">
              <ImageUploader onUploadComplete={setImageUrls} maxImages={3} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-700 py-3 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sell;
