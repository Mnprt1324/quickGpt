import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { commImageApi } from "../api/api";
const Community = () => {
  const [images, setImages] = useState([]);
  const getImages = async () => {
    try {
      const res = await commImageApi();
      if (res.data.success) {
        setImages(res.data.images);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className="flex-1 p-6 pt-12 2xl:px-20 w-full h-screen mx-auto">
      <h2 className=" dark:text-white font-semibold text-xl text-center">
        Community Images
      </h2>
      {images.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {images.map((img, indx) => (
            <a
              href=""
              key={indx}
              className="relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={img.imgurl}
                className="w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <p className="hidden absolute bottom-0 right-0 group-hover:block bg-black/50  px-2 rounded-md  dark:text-white text-xs">Created By {img.userName}</p>
            </a>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center text-gray-600 dark:text-white mt-10">
            No Images Available
          </p>
        </>
      )}
    </div>
  );
};

export default Community;
