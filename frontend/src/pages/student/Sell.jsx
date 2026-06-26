import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { createListing } from "../../services/api";

const CATEGORIES = ["Books", "Electronics", "Notes", "Stationery", "Hostel", "Other"];

const labelClasses = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.06em] text-ink-secondary";
const selectClasses =
  "h-11 w-full rounded-[20px] border border-border bg-white px-5 text-sm text-ink-primary outline-none shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 focus:border-ink-primary focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)]";
const textareaClasses =
  "w-full rounded-[20px] border border-border bg-white px-5 py-4 text-sm text-ink-primary placeholder:text-ink-muted outline-none shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 focus:border-ink-primary focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] min-h-[96px] resize-y";

function SectionHeading({ step, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg">
        {step}
      </span>
      <h2 className="text-[14px] font-semibold text-ink-primary">{title}</h2>
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
      <div className="rounded-[32px] border border-border bg-white p-8 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)] sm:p-10">
        <h1 className="text-center text-h1 font-bold tracking-[-0.02em] text-ink-primary">Create New Listing</h1>
        <p className="mt-2 mb-8 text-center text-ink-secondary">
          Sell your products to students on campus
        </p>

        {error && (
          <p role="alert" className="mb-6 rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
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
                <Input
                  id="sell-title"
                  type="text"
                  placeholder="e.g. Engineering Mathematics textbook"
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
                  className={textareaClasses}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-8">
            <SectionHeading step={2} title="Pricing & Category" />
            <div className="flex flex-col gap-4 pl-10">
              <div>
                <label htmlFor="sell-price" className={labelClasses}>
                  Price (₹)
                </label>
                <Input
                  id="sell-price"
                  type="number"
                  placeholder="e.g. 250"
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
                  className={selectClasses}
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

          <div className="flex flex-col gap-4 border-t border-border pt-8">
            <SectionHeading step={3} title="Product Images" />
            <div className="pl-10">
              <ImageUploader onUploadComplete={setImageUrls} maxImages={3} />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="h-12 w-full">
            {loading ? "Posting..." : "Post Listing"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Sell;
