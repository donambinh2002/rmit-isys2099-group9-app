import ProductList from "./Product/ProductList";

const HomePage = () => {
  return (
    <section className="">
      {/* Search Bar */}
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <input
              type="text"
              name="searchTerm"
              className="form-control"
              placeholder="Search product model"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="minPrice"
              className="form-control"
              placeholder="Minimum price"
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="maxPrice"
              className="form-control"
              placeholder="Maximum price"
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="container px-2 px-lg-2 mt-5">
        <ProductList />
      </div>
    </section>
  );
};

export default HomePage;
