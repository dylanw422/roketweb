import socket from "@/socket";
import { X } from "lucide-react";
import { useState } from "react";

export default function Captcha({ image }: { image: string }) {
  const [open, setOpen] = useState(false);

  const handleCaptchaAnswer = (squareNumber: number) => {
    socket.emit("captchaAnswer", squareNumber);
  };

  return (
    <div
      className={`${open ? "" : "hidden"} absolute top-0 left-0 z-10 flex flex-col justify-center items-center
          w-full h-full bg-opacity-50 backdrop-blur-sm`}
    >
      <div>
        <X className="fixed top-2 right-2" />
      </div>
      <div className="min-w-[400px] rounded-lg bg-background border border-muted/50 p-4">
        <h1 className="text-xl font-semibold">Solve Captcha</h1>
        <p className="text-sm">
          Please click on the image to solve the captcha.
        </p>
        <div className="relative flex justify-center items-center mt-4">
          <img
            className="w-full"
            src={`data:image/png;base64,${image}`}
            alt="captcha"
          />
          <div className="absolute w-full inset-0 grid grid-cols-3 grid-rows-2 pb-4 pt-11">
            {[1, 2, 3, 4, 5, 6].map((squareNumber) => {
              return (
                <div
                  key={squareNumber}
                  className="bg-transparent hover:bg-black/20 cursor-pointer text-black"
                  onClick={() => handleCaptchaAnswer(squareNumber)}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
