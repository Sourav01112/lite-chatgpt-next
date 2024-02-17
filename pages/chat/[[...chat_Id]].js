import { ChatSidebar } from "@/components/ChatSidebar";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "@/utils/svg/logoSVG";
import { useState } from "react";
import { streamReader } from "openai-edge-stream";

export default function ChatPage() {
  const [inputText, setInputtext] = useState("");
  const [incomingStreamVal, setIncomingStreamVal] = useState('I am an AI chatbot and do not have a personal name. You can simply refer to me as Assistant. How can I help you today?A motor functions by converting electrical energy into mechanical energy through the interaction of magnetic fields. When an electric current is passed through a wire coil (often referred to as the armature) that is located within a magnetic field, a force is generated that causes the coil to rotate. This rotation is then used to drive the mechanical system that the motor is a part of. The key components of a motor include the armature, the commutator (which helps to control the direction of the electrical current flow), the brushes (which transfer electrical energy to the commutator), and the magnetic field created by the stator (stationary portion of the motor that houses the magnet or magnets). In essence, a motor functions by using the principles of electromagnetism to create motion and drive a mechanical system.')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ inputText });
    const response = await fetch('api/chat/sendMessage', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEy}`
      },
      body: JSON.stringify({ message: inputText })
    })
    const data = response.body
    if (!data) return
    const reader = data.getReader()
    await streamReader(reader, (message) => {
      console.log("message", message)
      setIncomingStreamVal(out => `${out}${message.content}`)
    })
  };

  return (
    <>
      <Head>
        <title>New Chat</title>
      </Head>

      <div className="grid h-screen grid-cols-[260px_1fr] text-white">
        <ChatSidebar />

        <div
          className="flex flex-col text-white"
          style={{ backgroundColor: "#212121" }}
        >
          <div className="flex-1">
            {incomingStreamVal ? (
              <div className="text-white">{incomingStreamVal}</div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center rounded-full bg-white text-gray-950 w-12 h-12">
                  <LogoSVG />
                </div>
                <div className="text-2xl font-semibold flex justify-center align-middle mt-2">
                  How can I help you today?
                </div>
              </div>
            )}
          </div>

          <footer
            className="mb-2 w-[75%] m-auto  text-zinc-400"
          //  className="border border-gray-400 p-5 rounded-3xl mb-10 w-[75%] m-auto flex text-zinc-400 font-semibold"
          >
            {/* Message LiteChatGPT... */}

            <form onSubmit={handleSubmit}>
              <fieldset className="flex justify-center items-center gap-6 border border-zinc-400 rounded-2xl ">
                <textarea
                  className="w-full resize-none text-white outline-none rounded-xl ml-2 mt-2 mb-1 pl-3 placeholder-zinc-400 bg-[#212121]"
                  placeholder="Message LiteChatGPT... "
                  value={inputText}
                  onChange={(e) => setInputtext(e.target.value)}
                />
                <button
                  type="submit"
                  className="h-[35px] w-[35px] bg-slate-50 m-2 rounded-lg"
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-[#212121]"
                  />
                </button>
              </fieldset>
            </form>

            <div className="text-xs m-auto flex justify-center mt-2">
              Lite ChatGPT can make mistakes. Consider checking important
              information.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
