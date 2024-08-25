import axios from "axios";


export function getProData(id:number) {
  return axios
    .get(" https://myeasykart.codeyogi.io/product/" + id)
    .then(function (response) {
      return response.data;
    });
}
export function getProductByIds(ids:number[]) {
  const commaSepeartedIds = ids.join();
  return axios
    .get("https://myeasykart.codeyogi.io/products/bulk", {
      params: {
        ids: commaSepeartedIds,
      },
    })
    .then(function (response) {
      return response.data;
    });
}
export function getList(
  sortBy?:string |undefined, 
  query?:string,
   page?:number,
  sortType?:number |undefined) {

    type paramsProps={
      page:number,
      sortBy:string,
      search:string,
      sortType:number | undefined,
  }
  const params:paramsProps = {
    page:0,
    sortBy:"",
    search:"",
    sortType:undefined,

  };
  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (query) {
    params.search = query;
  }

  if (page) {
    params.page = page;
  }
  if (sortType) {
    params.sortType = sortType;
  }

  console.log("sortby", sortBy);
  console.log("page", page);
  return axios
    .get("https://myeasykart.codeyogi.io/products", {
      params,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      return response.data;
    });
}

export function saveCart(cart:{}) {
  return axios
    .post(
      "https://myeasykart.codeyogi.io/carts",
      { data: cart },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then(function (response) {
      return response.data;
    });
}
export function getCart() {
  return axios
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      return response.data;
    });
}
