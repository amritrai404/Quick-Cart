'use client'
import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, router, addToCart } = useAppContext()

  const handleClick = (e) => {
    // If click is on buy button, add to cart instead of navigating
    if (e.target.closest('button')) {
      e.stopPropagation();
      addToCart(product.id);
      return;
    }
    router.push('/product/' + product.id);
    scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
        <Image
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="group-hover:scale-105 transition object-cover w-full h-full"
          width={200}
          height={200}
          priority
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition">
          <Image
            className="h-3 w-3"
            src={assets.heart_icon}
            alt="heart_icon"
          />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
      
      <div className="flex items-center gap-2">
        <p className="text-xs">{product.rating}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={index < Math.floor(product.rating) ? assets.star_icon : assets.star_dull_icon}
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <div className="flex flex-col">
          <p className="text-base font-medium">{currency}{product.price}</p>
          {product.discountPercentage && (
            <p className="text-xs text-gray-500 line-through">
              {currency}{Math.round(product.price * (100 + product.discountPercentage) / 100)}
            </p>
          )}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
          }}
          className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy now
        </button>
      </div>
    </div>
  )
}

export default ProductCard