 import { memo} from 'react';
  import { Link } from 'react-router-dom';

type ProductPros={
    id:number,
    title:string,
    category:string,
    rating:number,
    price:number,
    thumbnail:string,
}



 function Product (data:ProductPros)  {
     return (<>
         <Link to={"/ProductDetails/" + data.id} > 
         <div key ={data.id} className="  border   bg-white  flex flex-col gap-2   " >
             <div className="w-full h-full">
                 <img className=" w-full h-full object-cover aspect-square" src={data.thumbnail} alt={"product "+data.id} />
             </div>
 <div className="text-2xs  ml-2  font-bold mt-2">{data.title}</div>
             <div className="text-red-500 text-2xs ml-2   ">{data.category}</div>
             <div className="text-1xs ml-2 -mt-1">Rating : {data.rating}/5</div>
             <div className='ml-2 -mt-1 font-bold'> Price : ${data.price}</div>
             {/* <Link to={"/ProductDetails/" + data.id}>click here</Link> */}
          </div>
          </Link>  
         </>
     );

 }
 export default memo(Product); 
