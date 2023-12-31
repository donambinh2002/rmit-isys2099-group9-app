import PropTypes from "prop-types";

// Icon Imported
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";

import TestImg from "../../../images/potato.jpg";

const Product = ({ data, compFunction }) => {
  const { handleDeleteData } = compFunction;
  return (
    <div className="product_table d-flex mt-4">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ width: "15%" }}>Image</th>
            <th style={{ width: "15%" }}>Product Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Width</th>
            <th>Height</th>
            <th>Length</th>
            <th>Seller</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>
                  <img src={TestImg} alt="" />
                </td>
                <td>{item.product_description}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.width}</td>
                <td>{item.height}</td>
                <td>{item.length}</td>
                <td>{item.seller}</td>
                <td className="sticky_action">
                  <span className="btn btn-primary">
                    <BiEdit />
                  </span>
                  <span
                    className="btn btn-warning ms-2"
                    onClick={() => handleDeleteData(item.id, "product")}
                  >
                    <ImBin2 />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      product_description: PropTypes.string,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      length: PropTypes.number.isRequired,
      seller: PropTypes.string.isRequired,
    }),
  ).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
  }).isRequired,
};

export default Product;
