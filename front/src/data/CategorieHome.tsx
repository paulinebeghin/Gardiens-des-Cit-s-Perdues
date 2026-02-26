import { ButtonCategorieHome } from "../ui/ButtonCategorieHome"



export const LinksHome = [
        {
            button : <ButtonCategorieHome name="Personnages" url="/categorie" urlImg={""} alt={""} />,
            alt : "Image représentant les prestations du CIMAP"
        },
        {
            button : <ButtonCategorieHome name="Livre" url="/pages/tarifs" urlImg={"https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772107051/img-1_ojydaf.png"} alt={""} />,
        },
        {
            button : <ButtonCategorieHome name="Univers" url="/univers" urlImg={"https://res.cloudinary.com/dxtfa4bcx/image/upload/v1772109768/img_dcmos6.png"} alt={""} />,
            alt : "Image représentant les actualités du CIMAP"
        }, 
    ]

    