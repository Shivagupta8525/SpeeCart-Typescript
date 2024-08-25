import React, { memo } from 'react';

function Nomatch(params:any) {
    return (<>
        <div className="   flex justify-center my-28 text-2xl min-w-6xl"  >No match found Product.</div>
    </>
    )
}
export default memo(Nomatch);