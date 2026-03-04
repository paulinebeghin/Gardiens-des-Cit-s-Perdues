import { Header } from "../../components/Header"


const NotFound = () => {
    
    return (
        // 1. Conteneur principal : w-full pour occuper tout l'espace
        <div className='flex flex-col w-full items-center justify-center px-4'>
            <Header name={"Oups... Le cristal a éclaté !"}></Header>
            <div className="bg-slate-900/90 text-white text-center grid gap-5 rounded-2xl p-5">
                <p>On dirait que ton dernier saut lumineux a mal tourné. Tu as essayé de te concentrer sur une destination, mais tu as fini dans le Néant. Même les capacités de Sophie ne pourraient pas te retrouver ici... pour l'instant.</p>
                Attention, si tu restes trop longtemps, le Conseil risque de t'accuser d'avoir brisé les lois... tu vas te retrouver à l'Exil !
            </div>
        </div>
    )
}

export default NotFound