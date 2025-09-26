import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, title, description, price, category, image } = product;
  return (
    <Link href={`/products/${id}`} className="border p-4 rounded hover:shadow-lg transition-shadow">
      <Image src={image} alt={title} width={200} height={200} className="mx-auto mb-4" />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-800 font-bold mb-2">${price}</p>
      <p className="text-sm text-gray-500">{category}</p>
    </Link>
  )
}

export default ProductItem