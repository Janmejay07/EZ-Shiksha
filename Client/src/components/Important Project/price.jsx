import React from 'react';
import img1 from './icons/icon1.png'
import img2 from './icons/icon2.png'
import img3 from './icons/icon3.png'
import { Link } from 'react-router-dom';

function PricingPlan({ imgSrc, header, features, price, buttonText, isFeatured, link }) {
    return (
        <Link to={link} className='no-underline'>
            <div className="border-b border-[#e1f1ff] pb-8 last:border-b-0 last:pb-0 md:border-b-0 md:border-r md:border-[#e1f1ff] md:pr-12 md:pb-0 md:last:border-r-0">
                <img src={imgSrc} alt="" className="max-w-full mb-6 mx-auto" />
                <h2 className="text-gray-500 font-semibold tracking-wide uppercase mb-12">{header}</h2>
                <ul className="my-12 text-primary">
                    {features.map((feature, index) => (
                        <li 
                            key={index} 
                            className="font-semibold tracking-wide text-xs leading-6 py-4 border-t border-[#e1f1ff] last:border-b last:border-[#e1f1ff]"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
                <span className="block text-primary text-3xl font-bold mb-6">{price}</span>
                <a 
                    href="#/" 
                    className={`inline-block border border-[#9dd1ff] rounded-lg text-primary py-4 px-9 no-underline my-6 transition-colors ${
                        isFeatured 
                            ? 'bg-primary text-white hover:bg-primary' 
                            : 'hover:bg-[#e1f1ff]'
                    }`}
                >
                    {buttonText}
                </a>
            </div>
        </Link>
    );
}

function PriceTiers() {
    return (
        <div className="min-h-screen bg-primary flex justify-center items-center p-4">
            <div className="bg-white rounded-lg py-6 px-6 md:px-8 w-full max-w-5xl flex flex-col md:flex-row text-center uppercase">
                <PricingPlan
                    imgSrc={img1}
                    header="Personal"
                    features={["Custom domains", "Sleeps after 30 mins of inactivity"]}
                    price="Free"
                    buttonText="Free Trial"
                    link="/payment?key1=Personal&key2=Free"
                />
                <PricingPlan
                    imgSrc={img2}
                    header="Small team"
                    features={["Never sleeps", "Multiple workers for more powerful apps"]}
                    price="$150"
                    buttonText="Free trial"
                    isFeatured
                    link="/payment?key1=Small+Team&key2=150"
                />
                <PricingPlan
                    imgSrc={img3}
                    header="Enterprise"
                    features={["Dedicated", "Simple horizontal scalability"]}
                    price="$400"
                    buttonText="Free trial"
                    link="/payment?key1=Enterprise&key2=400"
                />
            </div>
        </div>
    );
}

export default PriceTiers;
