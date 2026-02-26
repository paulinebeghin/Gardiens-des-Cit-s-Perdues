import { CategorieImgHome } from "./CategorieHome";




export const Home = () => {
    return (
        <div className="flex flex-col pt-20 max-md:pt-10 justify-center gap-32 max-md:gap-12 " >
            <img src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772092469/Group_3_hkutc7.png" alt="" />
          <CategorieImgHome/>
        </div>
    );
};