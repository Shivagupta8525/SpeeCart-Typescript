import React, { memo } from 'react';
function Footer() {
    return (
        <div>
            <div className="bg-gray-500 flex justify-between px-4 py-2 md:px-3  lg:px-8 lg:py-4 w-screen">
                <div className="text-white text-sm"> &#169; Copyright 2024 | CodeYogi</div>
                <div className="text-white text-sm">Powered by Shiva</div>
            </div>
        </div>
    );
}
export default memo(Footer);