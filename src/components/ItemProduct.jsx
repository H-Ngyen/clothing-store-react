import React from 'react';

export default function ItemProduct({ id, name, price, image, review, ordersSold }) {
  return (
    <div
      data-id={id}
      className="tw-border tw-bg-white tw-border-gray-300 tw-rounded tw-p-4 tw-m-4 tw-w-[245px] tw-h-[270px] tw-transform tw-transition-transform hover:tw-scale-105"
    >
      <img
        src={`http://localhost:5173/src/assets/images/${image}`}
        alt={name}
        className="tw-w-[100px] tw-h-[150px] tw-rounded tw-block tw-mx-auto"
      />
      <div className="tw-mt-2">
        <p className="tw-text-xl tw-my-2 tw-text-left">{name}</p>
        <p className="tw-inline tw-m-0 tw-text-base after:tw-content-['|'] after:tw-px-1">
          ${price}
        </p>
        <div className="tw-inline tw-m-0 tw-text-base after:tw-content-['|'] after:tw-px-1">
          <span className="tw-text-[#FFD700]">&#9733;</span>
          <span className="tw-ml-1">{parseFloat(review).toFixed(1)}</span>
        </div>
        <p className="tw-inline tw-m-0 tw-text-base tw-ml-1">Sold: {ordersSold}</p>
      </div>
    </div>
  );
}