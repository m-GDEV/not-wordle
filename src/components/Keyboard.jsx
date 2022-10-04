import { FiDelete } from "react-icons/fi";

let alphabet = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
];

function Keyboard() {
    return (
        <section className="flex flex-wrap gap-1.5 justify-center w-[31rem] place-items-center mx-auto">
            {alphabet.map((letter) => {
                // if letter is m then put delete key next to it
                // if letter is z then put enter key next to it
                // else just print letter
                if (letter == "m") {
                    return (
                        <>
                            <button className="h-[3.75rem] w-11 rounded-md font-bold bg-gray-500 gap-1">
                                {letter.toUpperCase()}
                            </button>
                            <button className="h-[3.75rem] w-16 rounded-md font-bold bg-gray-500 gap-1 flex justify-center place-items-center">
                                <FiDelete className="font-bold w-12 h-6" />
                            </button>
                        </>
                    );
                } else if (letter == "z") {
                    return (
                        <>
                            <button></button>
                            <button className="h-[3.75rem] w-16 rounded-md font-bold bg-gray-500 gap-1 flex justify-center place-items-center text-sm">
                                ENTER
                            </button>
                            <button className="h-[3.75rem] w-11 rounded-md font-bold bg-gray-500 gap-1">
                                {letter.toUpperCase()}
                            </button>
                        </>
                    );
                } else {
                    return (
                        <button className="h-[3.75rem] w-11 rounded-md font-bold bg-gray-500">
                            {letter.toUpperCase()}
                        </button>
                    );
                }
            })}
        </section>
    );
}

export default Keyboard;
