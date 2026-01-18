"use client"
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Github, Linkedin } from 'lucide-react';

export const ContactSection = () => {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [formState, setFormState] = useState({ email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('SENDING');

        try {
            const response = await fetch("https://formsubmit.co/ajax/u7962778@anu.edu.au", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.email,
                    message: formState.message,
                    _subject: "New Calling Card from Portfolio"
                })
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFormState({ email: '', message: '' });
            } else {
                setStatus('ERROR');
            }
        } catch  {
            setStatus('ERROR');
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto flex items-center justify-center p-4 pt-20">
            <div className="relative w-full max-w-lg md:max-w-2xl bg-white transform rotate-2 p-1 border-4 border-black shadow-[10px_10px_0_#39ff14] md:shadow-[15px_15px_0_#39ff14] animate-spin-stick origin-center my-auto">
                
                {/* The "Stick" Pin visual */}
                <div className="absolute -top-6 left-1/2 w-4 h-12 bg-[#39ff14] border-2 border-black z-20"></div>

                <div className="bg-black p-6 md:p-12 relative overflow-hidden group min-h-[500px] flex flex-col justify-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #39ff14 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {status === 'SUCCESS' ? (
                        <div className="text-center animate-slam">
                            <div className="flex justify-center mb-6">
                                <div className="bg-[#39ff14] p-4 rounded-full border-4 border-white">
                                    <CheckCircle className="w-16 h-16 text-black" />
                                </div>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 transform -skew-x-12">CARD SENT!</h2>
                            <p className="text-[#39ff14] font-bold text-xl uppercase tracking-widest">HEART STOLEN SUCCESSFULLY</p>
                            <button 
                                onClick={() => setStatus('IDLE')}
                                className="mt-8 text-white underline hover:text-[#39ff14] font-bold"
                            >
                                SEND ANOTHER?
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-4xl md:text-7xl font-black text-[#39ff14] text-center mb-2 transform -skew-x-12 hover-glitch">TAKE YOUR HEART</h2>
                            <p className="text-white text-center font-bold text-sm md:text-xl mb-6 md:mb-8 uppercase tracking-widest">Send a calling card</p>
                            
                            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                                <input 
                                    type="email" 
                                    required
                                    placeholder="YOUR EMAIL" 
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-transparent border-b-2 border-white/50 text-white p-2 font-mono focus:border-[#39ff14] focus:outline-none transition-all focus:pl-4 text-sm md:text-base disabled:opacity-50" 
                                    disabled={status === 'SENDING'}
                                />
                                <textarea 
                                    rows={3} 
                                    required
                                    placeholder="YOUR MESSAGE" 
                                    value={formState.message}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-transparent border-b-2 border-white/50 text-white p-2 font-mono focus:border-[#39ff14] focus:outline-none transition-all focus:pl-4 text-sm md:text-base disabled:opacity-50"
                                    disabled={status === 'SENDING'}
                                ></textarea>
                                
                                <button 
                                    disabled={status === 'SENDING'}
                                    className="w-full bg-[#39ff14] hover:bg-[#ff1f28] disabled:bg-gray-600 text-black font-black text-lg md:text-2xl py-2 md:py-3 mt-4 transform -skew-x-6 border-2 border-black shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {status === 'SENDING' ? (
                                        <>SENDING...</>
                                    ) : (
                                        <>SEND IT <Send className="w-5 h-5" /></>
                                    )}
                                </button>

                                {status === 'ERROR' && (
                                    <div className="bg-red-500/20 border border-red-500 p-2 text-red-500 text-center font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
                                        <AlertCircle className="w-4 h-4" /> TRANSMISSION FAILED. TRY AGAIN.
                                    </div>
                                )}
                            </form>

                            <div className="flex justify-center gap-6 mt-6 md:mt-8">
                                <Github className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[#39ff14] hover:scale-125 transition-all cursor-pointer" />
                                <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-[#39ff14] hover:scale-125 transition-all cursor-pointer" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};