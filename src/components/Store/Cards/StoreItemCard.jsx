import React from 'react';

function StoreItemCard({ item, onSelect }) {
  return (
    <div 
      className="h-80 bg-white shadow-md p-4 rounded-lg cursor-pointer" 
      onClick={() => onSelect(item)}
    >
      <img src={item.photo} alt={item.name} className="w-full h-32 object-cover rounded-md" />
      <p className="font-bold mt-2">{item.name} - ${item.price}</p>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
}

export default StoreItemCard;
