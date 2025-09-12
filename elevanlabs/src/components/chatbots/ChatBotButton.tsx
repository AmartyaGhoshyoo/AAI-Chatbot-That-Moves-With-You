'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from 'lucide-react';
import { Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from "@/lib/utils";
import ChatForm from "./ChatForm";


const ChatBotButton = () => {

    const [openchatbot, setOpenchatbot] = useState(false);

    return (
        <section className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8">
            <ChatBotUI openchatbot={openchatbot} />
            <ChatButton openchatbot={openchatbot} handleOnClick={() => setOpenchatbot((prev) => (!prev))} />
        </section>
    )
}

export default ChatBotButton

const ChatButton = ({ handleOnClick, openchatbot }: { handleOnClick: () => void, openchatbot: boolean }) => {


    return (
        <div className="flex justify-end">
            <AnimatePresence mode="wait">
                {!openchatbot ? (
                    <motion.div
                        key="ask-now"
                        className="rounded-2xl bg-black sm:w-[300px] sm:p-6 p-4 flex flex-col gap-4 cursor-pointer"
                        initial={{ scale: 0.8, opacity: 0, transformOrigin: "100% 100%" }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={handleOnClick}
                    >
                        <p className="font-semibold sm:text-xl hidden sm:block">Need Help?</p>
                        <Button className="bg-white sm:text-xl text-[16px] sm:h-[45px] rounded-md text-black w-full hover:bg-white cursor-pointer flex justify-center items-center">
                            <Phone className="mr-2 fill-black capitalize" /> Ask anything
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat-toggle"
                        className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] rounded-2xl bg-black flex justify-center items-center cursor-pointer"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Button
                            onClick={handleOnClick}
                            className="w-[35px] sm:w-[50px] h-[35px] sm:h-[50px] rounded-xl bg-white cursor-pointer hover:bg-white"
                        >
                            <ChevronDown className="text-black" style={{ width: "24px", height: "24px" }} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const ChatBotUI = ({ openchatbot }: { openchatbot: boolean }) => {
    return (
        <AnimatePresence>
            {openchatbot && (
                <motion.div
                    className={cn("w-[350px] sm:w-[450px] h-[600px] bg-black text-white rounded-2xl mb-8")}
                    initial={{ scale: 0, opacity: 0, transformOrigin: "100% 100%" }}
                    animate={{ scale: 1, opacity: 1, transformOrigin: "100% 100%" }}
                    exit={{ scale: 0, opacity: 0, transformOrigin: "100% 100%" }}
                    transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                >
                    <ChatForm />
                </motion.div>
            )}
        </AnimatePresence>
    )
}


