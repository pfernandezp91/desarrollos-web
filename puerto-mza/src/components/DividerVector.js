import React from 'react';

function DividerVector() {
    return (
        <div className="divider position-relative" style={{ zIndex: 1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="96px" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" className="injected-svg" fill="#fff">
                <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"></path>
            </svg>
        </div>
    );
}

export default DividerVector;
