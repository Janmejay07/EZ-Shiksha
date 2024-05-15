import React from "react";

const CourseCard = (props) => {
  const { imgUrl, title, lesson, students, rating } = props.item;

  return (
    <div className="p-4">
      <div className="mb-5">
        <img src={imgUrl} alt="" className="w-full rounded-xl mb-5" />
      </div>

      <div>
        <h6 className="text-xl font-poppins font-semibold text-secondary leading-8 mb-4">{title}</h6>

        <div className="flex justify-between items-center mb-3">
          <p className="text-secondary text-sm font-medium flex items-center gap-1">
            <i className="ri-book-open-line text-primary"></i> {lesson} Lessons
          </p>

          <p className="text-secondary text-sm font-medium flex items-center gap-1">
            <i className="ri-user-line text-primary"></i> {students}K
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-secondary text-sm font-medium flex items-center gap-1">
            <i className="ri-star-fill text-primary"></i> {rating}K
          </p>

          <p className="flex items-center gap-1">
            <a href="#" className="text-primary text-sm font-semibold no-underline hover:opacity-80">
              Enroll Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
