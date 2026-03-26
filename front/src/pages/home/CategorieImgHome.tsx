import { LinksHome } from "../../data/LinksHome";

export const CategorieImgHome = () => {
  return (
    <div className="w-full justify-center mx-auto max-w-7xl">
      <div className="flex justify-between">
        {LinksHome.map((link, index) => (
          <div 
            key={index} 
            className="flex justify-center items-center"
          >
            <div className="w-full mt-3">
              {link.button}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};