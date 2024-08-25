import { memo } from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { range } from "lodash";
import { Link } from 'react-router-dom';



function Pagenum(page) {
  return (
    <div className='mt-6   flex items-center mb-2 ml-8 gap-1'>
      {(page > 1) && (
        <HiArrowNarrowLeft className='text-4xl border border-black' onClick={() => handlePageChange(page - 1)} />
      )
      }
      {range(page, page + 2).map((item) => {

        return <Link to={'?' + new URLSearchParams({ ...params, page: item })} className={`border border-black py-1 px-4 ${page === item ? 'bg-gray-500' : ''}`} href="">{item}</LinK>
      }

      )}
      {(
        <HiArrowNarrowRight className='text-4xl border border-black' onClick={() => handlePageChange(page + 1)} />
      )
      }
    </div>
  );
}
export default memo(Pagenum);