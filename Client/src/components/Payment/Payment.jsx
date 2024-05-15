import React from 'react';
import { useLocation} from 'react-router-dom';

function UpgradePlan() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const key1 = queryParams.get('key1');
    const key2 = queryParams.get('key2');

    return (
        <div className="min-h-screen bg-[#e6ebf4] py-12 px-4 flex justify-center">
            <div className="bg-white border-none rounded-lg shadow-lg p-8 max-w-2xl w-full">
                <div>
                    <h4 className="text-2xl font-poppins font-semibold text-secondary mb-3">Upgrade your plan</h4>
                    <p className="text-base font-medium text-[#b1b6bd]">Please make the payment to start enjoying all the features of our premium plan as soon as possible</p>
                </div>
                <div className="border-2 border-[#304FFE] bg-[#f2f5ff] p-4 rounded-lg mt-6 flex justify-between items-center">
                    <div className="flex flex-row items-center">
                        <img src="https://i.imgur.com/S17BrTx.png" className="rounded" alt="Small Business" width="60" />
                        <div className="flex flex-col ml-4">
                            <span className="text-xl font-medium text-secondary">{key1}</span>
                            <span className="text-[#aba4a4]">CHANGE PLAN</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <sup className="text-base font-bold text-[#6b6b6f]">$</sup>
                        <span className="text-5xl font-medium ml-1 mr-1 text-secondary">{key2}</span>
                        {key2 !== "Free" && (
                            <span className="text-xl font-bold text-[#6b6b6f] mt-5">/ year</span>
                        )}
                    </div>
                </div>
                <span className="text-2xl font-medium text-secondary block mt-8">Payment details</span>
                <div className="bg-white rounded-lg mt-6 flex justify-between items-center p-4 border border-gray-200">
                    <div className="flex flex-row items-center">
                        <img src="https://i.imgur.com/qHX7vY1.png" className="rounded" alt="Credit Card" width="70" />
                        <div className="flex flex-col ml-3">
                            <span className="text-xl font-medium text-secondary">Credit Card</span>
                            <span className="text-[#aba4a4]">1234 XXXX XXXX 2570</span>
                        </div>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            className="h-11 w-[73px] border-2 border-gray-200 rounded focus:outline-none focus:border-[#304FFE] px-2" 
                            placeholder="CVC" 
                        />
                    </div>
                </div>
                <div className="bg-white rounded-lg mt-2 flex justify-between items-center p-4 border border-gray-200">
                    <div className="flex flex-row items-center">
                        <img src="https://i.imgur.com/qHX7vY1.png" className="rounded" alt="Debit Card" width="70" />
                        <div className="flex flex-col ml-3">
                            <span className="text-xl font-medium text-secondary">Debit Card</span>
                            <span className="text-[#aba4a4]">2344 XXXX XXXX 8880</span>
                        </div>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            className="h-11 w-[73px] border-2 border-gray-200 rounded focus:outline-none focus:border-[#304FFE] px-2" 
                            placeholder="CVC" 
                        />
                    </div>
                </div>
                <h6 className="mt-6 text-primary font-poppins font-semibold">ADD PAYMENT METHOD</h6>
                <div className="mt-3">
                    <input 
                        type="text" 
                        className="h-14 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-[#304FFE] px-4" 
                        placeholder="Email Address" 
                    />
                </div>
                <div className="mt-4">
                    <button className="bg-primary text-white w-full h-[70px] text-xl font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                        Proceed to payment <i className="fa fa-long-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpgradePlan;

