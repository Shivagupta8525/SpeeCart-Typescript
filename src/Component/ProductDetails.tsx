import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProData } from "./api";
import { withCart } from "./withProvider";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { withParams } from "./withParams";
import { Product } from "./type/ProductType";





interface ProductDetailsProps {
  handleAddTocart: (product: number, count: number) => void;
  params: { id: string };
}

interface ProductDetailsState {
  product: Product | null;
  loading: boolean;
  count: number;
  id: number;
}

class ProductDetails extends Component<ProductDetailsProps, ProductDetailsState> {
  constructor(props: ProductDetailsProps) {
    super(props);

    this.state = {
      product: null,
      loading: true,
      count: 1,
      id:parseInt(this.props.params.id),
    };
  }

  componentDidMount() {
    this.fetchProductData();
  }

  componentDidUpdate(prevProps: ProductDetailsProps, prevState: ProductDetailsState) {
    if (prevState.id !== parseInt(this.props.params.id)) {
      this.setState({id:parseInt(this.props.params.id)},this.fetchProductData);
    }
  }

  fetchProductData = () => {
    const { id } = this.state;
    this.setState({ loading: true });

    getProData(id)
      .then((product: Product) => {
        console.log("Api response:", product);
        this.setState({ product, loading: false, count: 1 });
      })
      .catch(() => {
        console.log("Error occurred");
        this.setState({ loading: false });
      });
  };

  handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    this.setState({ count: value <= 0 ? 1 : value });
  };

  handleButtonClick = () => {
    const { id, count } = this.state;
    this.props.handleAddTocart(id, count);
  };

  render() {
    const { product, loading, count, id } = this.state;

    if (loading) {
      return (
        <div className="grow text-indigo-700 text-6xl h-full flex items-center justify-center">
           {/* <ImSpinner10 className="animate-spin" />  */}
          Loading...
        </div>
      );
    }

    if (!product) {
      return (
        <div className="grow text-indigo-700 text-6xl h-full flex items-center justify-center">
          {/* <NotFound /> */}
          Product not found
        </div>
      );
    }

    return (
      <div className="grow bg-gray-200 max-w-6xl mx-auto px-auto px-1">
        <Link to="/" className="text-4xl px-2 lg:px-80">
          <HiArrowSmLeft />
        </Link>
        <div className="bg-white border lg:flex max-w-6xl mx-auto my-20 -mt-10">
          <img
            className="w-screen sm:max-w-80 lg:w-2/5 lg:h-96 h-80"
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="lg:space-y-2 m-2 lg:gap-2">
            <h1 className="text-xl lg:text-3xl">{product.title}</h1>
            <h1 className="lg:text-lg">{product.category}</h1>
            <h2 className="lg:text-xl font-bold">Price: ${product.price}</h2>
            <p className="lg:text-xl">Rating: {product.rating}/5</p>
            <p className="text-gray-500 text-xs lg:text-xl">{product.description}</p>
            <div className="flex gap-2 pt-4 max-h-16">
              <input
                type="number"
                value={count}
                onChange={this.handleCountChange}
                className="border-2 border-gray-300 rounded-lg px-1 w-12"
              />
              <button className="bg-orange-400 px-2 py-1 border-orange-500 rounded-xl" onClick={this.handleButtonClick}>Add to cart</button>
              
            </div>
          </div>
        </div>
        <div className="flex px-5 justify-between mb-2">
          <div>
            {id > 1 && (
              <Link
                className="lg:text-2xl border border-yellow-500 rounded-lg px-2 py-1 bg-yellow-400 flex"
                to={`/ProductDetails/${id - 1}`}
              >
                <HiArrowSmLeft className="text-2xl lg:text-4xl" />
                Previous
              </Link>
            )}
          </div>
          <div>
            <Link
              className="border lg:text-2xl border-yellow-500 rounded-lg px-4 py-1 bg-yellow-400 flex"
              to={`/ProductDetails/${id + 1}`}
            >
              <HiArrowSmRight className="text-2xl lg:text-4xl" />
              Next
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(withParams(ProductDetails));
