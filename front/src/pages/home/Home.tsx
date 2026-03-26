import { CategorieImgHome } from "./CategorieImgHome";




export const Home = () => {
    return (
        <div className="flex flex-col pt-20 max-md:pt-10 justify-center gap-32 max-md:gap-12 " >
            <img src="https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772455080/LogoHeader_suujwz.png" alt="" />
          <CategorieImgHome/>
        </div>
    );
};