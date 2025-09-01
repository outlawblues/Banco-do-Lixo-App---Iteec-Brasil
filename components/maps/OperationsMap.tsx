import React from 'react';

const OperationsMap: React.FC = () => {
  return (
    <div className="w-full h-full bg-primary-50 rounded-lg overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <path
          d="M399,759c-142,-22 -229,-64 -322,-144c-45,-39 -51,-44 -60,-52c-20,-17 -31,-38 -31,-58c0,-20 11,-41 31,-58c9,-8 15,-13 60,-52c93,-80 180,-122 322,-144c114,-18 206,0 293,58c21,14 34,31 38,49c6,26 -6,55 -29,71c-2,1 -3,1 -5,0c-26,-15 -62,-23 -112,-26c-103,-6 -195,32 -268,111c-2,2 -4,5 -4,7c0,2 2,5 4,7c73,79 165,117 268,111c50,-3 86,-11 112,-26c2,-1 3,-1 5,0c23,16 35,45 29,71c-4,18 -17,35 -38,49c-87,58 -179,76 -293,58z"
          fill="#CCF1EA"
          stroke="#99E3D6"
          strokeWidth="2"
        />
        {/* Pin for Cuiabá/Várzea Grande */}
        <g transform="translate(390, 485)">
            <circle cx="0" cy="0" r="15" fill="rgba(0, 184, 148, 0.3)">
                 <animate
                    attributeName="r"
                    from="15"
                    to="30"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="0" cy="0" r="8" fill="#00B894" stroke="white" strokeWidth="2"/>
        </g>
        <g transform="translate(420, 520)">
            <text fontSize="18" fontWeight="bold" fill="#374151" className="font-sans" textAnchor="middle">
                Cuiabá / VG
            </text>
        </g>
      </svg>
    </div>
  );
};
export default OperationsMap;
