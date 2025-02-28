import React from 'react';
import dummyProfile from '../../../assets/store/sample_profile.png'

function ItemPreview({ item, onClose }) {
  return (
    <div className="w-2/3 min-h-screen h-full bg-white shadow-lg rounded-lg p-6 relative">
      <button 
        className="absolute top-2 right-2 bg-gray-100 text-black px-3 py-1 rounded-full" 
        onClick={onClose}
      >
        X
      </button>
      <img src={item.photo} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-4">{item.name} - ${item.price}</h2>
      <p className="text-gray-700 mt-2">{item.description}</p>

      
      <div className='flex mt-20'>
        <img src={dummyProfile} alt={"Profile Picture"} className="w-16 h-16 object-cover rounded-lg" />
        <div className='ml-4'>
            <p className="text-black-700 mt-2">MARO</p>
            <p className="text-black-700 mt-2">Trusted by pawtopia</p>
        </div>
      </div>

      <a href={item.link} target="_blank" ><p className="text-[#1060FF] mt-20">Product Link</p></a>
    </div>
  );
}

export default ItemPreview;
