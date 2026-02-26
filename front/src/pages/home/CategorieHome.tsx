import { LinksHome } from "../../data/CategorieHome"


export const CategorieImgHome = () => {
    return (
<div className="w-full justify-center mx-auto max-w-7xl">
 
  <div className="flex  justify-between   ">
    {LinksHome.map((link, index) => (
      <div 
        key={index} 
        className={`flex justify-between items-center   ${
          index === LinksHome.length - 1 && LinksHome.length % 2 !== 0
            ? 'justify-center' 
            : 'justify-center'
        }`}
      >


     
        <div className="w-full mt-3">
      
          {link.button}
        </div>
      </div>
    ))}
  </div>
</div>
)}