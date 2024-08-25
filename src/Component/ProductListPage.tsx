import  { useEffect, useState, useCallback, ChangeEvent } from "react";
import ProductList from "./ProductList";
import { getList } from "./api";
import { ImSpinner10 } from 'react-icons/im'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { range } from "lodash";
import { useSearchParams, Link } from 'react-router-dom';
import Loading from "./Loading";



interface Product {
      id: number;
      [key: string]: any; 
    }
    
    interface ProductListResponse {
      meta: any;
      data: Product[];
    }
    
    type Params = {
      query?: string;
      sort?: string;
      page?: string;
    };

function ProductListPage() {
      const [proList, setProList] = useState<ProductListResponse>({ meta: {}, data: [] });
      const [loading, setLoading] = useState<boolean>(false);
     // const [totalPages, setTotalPages] = useState<number>(1);
      let [searchParams, setSearchParams] = useSearchParams();

      const params:Params = Object.fromEntries([...searchParams])

      let { query, sort, page } = params

      query = query || ""
      sort = sort || "default"
      page = +page || 1

      useEffect(() => {
            let sortBy;
            let sortType;


            if (sort == 'title') {
                  sortBy = 'title'
            }
            if (sort === "Low to high") {
                  sortBy = "price";
            }
            if (sort == "highToLow") {
                  sortBy = "price";
                  sortType = "desc";
            }
            if (sort == "rating") {
                  sortBy = "rating";
                  sortType = "desc"
            }
            getList(sortBy, query, page, sortType).then(function (xyz) {
                  setProList(xyz);
                  setLoading(false);
                  console.log("response", xyz);
            });
      }, [sort, query, page]);

      let data = [...proList.data];
      const handelonSearch = useCallback(function (event:ChangeEvent<HTMLInputElement>) {
            // setQuery(event.target.value);
            setSearchParams({ ...params, query: event.target.value })
      }, [query]
      )
      const handelonSort = useCallback(
            function (event) {
                //   setSort(event.target.value);
                  setSearchParams({ ...params, sort: event.target.value });
            })

      function handlePageChange(newPage) {
            setSearchParams({ ...params, page: newPage });
      }

      if (proList.length == 0) {
            return <div className=" grow text-indigo-700 text-4xl flex items-center justify-center"> <ImSpinner10 className="animate-spin" /></div>
      }
      return (
            <div className="  flex flex-col grow max-w-6xl mx-auto px-9  my-16 -2 bg-white ">
                  <div className=" flex  justify-between  ">
                        <input
                              value={query}
                              type="text"
                              placeholder="Search"
                              className=" placeholder-black border border-black rounded-md lg:ml-8 h-8  mt-2 lg:mt-2 lg:mb-2 text-center lg:w-40 w-28"
                              onChange={handelonSearch}
                        />
                        <select className="border border-gray-400 bg-white my-2 mx-2 w-32 h-8 rounded-md " onChange={handelonSort}
                              value={sort}>
                              <option value="default">Default sorting</option>
                              <option value="title">Sort by Name</option>
                              <option value="rating">Sort by Rating</option>
                              <option value="Low to high"> Price (Low to high)</option>
                              <option value="highToLow"> Price (High to Low)</option>
                        </select>
                  </div>
                  {<ProductList products={proList.data} />
                  }
                  {proList.data.length == 0 && <Loading/>}



                  <div className='mt-6   flex items-center mb-2 ml-8 gap-1'>
                        {(page > 1) && (
                              <HiArrowNarrowLeft className='text-3xl text-red-600 border border-orange-400' onClick={() => handlePageChange(page - 1)} />
                        )
                        }
                        {range(page, page + 2).map((item) => {

                              return <Link to={'?' + new URLSearchParams({ ...params, page: item })} className={`border border-orange-600 py-1 px-4 ${page === item ? 'bg-orange-400' : ''}`} href="">{item}</Link>
                        }

                        )}
                        {(
                              <HiArrowNarrowRight className='text-3xl   text-red-600 border border-orange-400' onClick={() => handlePageChange(page + 1)} />
                        )
                        }
                  </div>
            </div>
      )

}



export default ProductListPage;