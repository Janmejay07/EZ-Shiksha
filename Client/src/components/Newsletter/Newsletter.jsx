import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[75%] max-w-[700px] bg-[#69ecd2] p-8 rounded-3xl my-12">
        <h2 className="text-3xl font-poppins font-semibold text-secondary mb-6 text-center">Subscribe Our Newsletter</h2>
        <div className="flex w-full justify-center rounded-3xl">
          <div className="flex justify-between w-full bg-white rounded-full p-2">
            <input 
              type="text" 
              placeholder="Email" 
              className="pl-4 rounded-full flex-1 outline-none border-0" 
            />
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
