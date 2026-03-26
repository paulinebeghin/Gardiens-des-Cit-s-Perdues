import { useState } from 'react'
import { sendContactMessage } from '../../api/contact';

export const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await sendContactMessage({
                name : name.trim(),
                email : email.trim(),
                message : message.trim()
            });
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erreur lors de l'envoi du message");
        } finally {
            setLoading(false);
        }
    }

    return (
     
        <div className=" w-full items-center justify-center px-12 pb-12 border border-white rounded-[48px] max-w-5xl ">
            
            <h1 className="text-5xl text-center text-white py-12 font-bold">Contact</h1>
             
            <form 
            onSubmit={handleSubmit}
            className="
                flex flex-col gap-10"
            >
                {error && <p className="text-sm text-red-400 text-center bg-red-950/50 py-2 px-6 rounded-full">{error}</p>}
                {success && <p className="text-sm text-green-300 text-center bg-green-950/50 py-2 px-6 rounded-full">Message envoyé avec succès !</p>}

                <input 
                    type="text" 
                    placeholder="Nom" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="bg-white/90 rounded-full placeholder:text-sky-700 text-sky-950 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/90 rounded-full placeholder:text-sky-700 text-sky-950 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                />
                <textarea
                    placeholder="Votre message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-white/90 rounded-2xl placeholder:text-sky-700 text-sky-950 px-5 py-3 outline-none resize-none focus:ring-2 focus:ring-sky-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-sky-600 text-white font-bold rounded-full px-5 py-3 cursor-pointer hover:bg-sky-500 disabled:opacity-50 transition"
                >
                    {loading ? "Envoi..." : "Envoyer"}
                </button>
            </form>
        </div>
    )
}

