import React from "react";

const FreeCourseCard = (props) => {
  const { imgUrl, title, students, rating } = props.item;

  return (
    <div>
      <div className="relative w-full h-full mb-5 z-[9999]">
        <img src={imgUrl} alt="" className="w-full rounded-xl" />
        <button className="absolute bottom-[-20px] right-5 z-[999999] bg-primary text-white px-6 py-1 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          Free
        </button>
      </div>

      <div className="pt-5">
        <h6 className="text-xl font-poppins font-semibold text-secondary leading-8 mb-4">{title}</h6>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-secondary text-sm font-medium">
            <i className="ri-user-line text-primary"></i> {students}k
          </span>

          <span className="flex items-center gap-2 text-secondary text-sm font-medium">
            <i className="ri-star-fill text-primary"></i> {rating}k
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeCourseCard;
