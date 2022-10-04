import { FaBars } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

import { useState, useEffect } from "react";
import { Modal, MantineProvider } from "@mantine/core";

const ls = localStorage;
const guessDist = ls.guessDist;

function Navbar() {
    const [help, setHelp] = useState(false);
    const [stats, setStats] = useState(false);
    const [settings, setSettings] = useState(false);

    useEffect(() => {
        if (ls.length == 0) {
            ls.setItem("played", 0);
            ls.setItem("won", 0);
            ls.setItem("streak", 0);
            ls.setItem("maxStreak", 0);
            // array that represents the guess distribution of right answers from player
            ls.setItem("guessDist", "0 0 0 0 0 0");
        }
    }, []);

    return (
        <nav className="flex flex-wrap justify-between px-4 py-4 border-b border-[#3A3A3C] font-semibold font-sans tracking-tighter items-center">
            <div className="inline-flex flex-row gap-3 items-center">
                <a>
                    <FaBars className="w-5 h-5" />
                </a>
                <h1 className="sm:hidden text-3xl ">not-wordle</h1>
            </div>
            <h1 className="hidden sm:block text-3xl">not-wordle</h1>
            <div className="inline-flex flex-row gap-2">
                <MantineProvider theme={{ colorScheme: "dark" }}>
                    <Modal opened={help} onClose={() => setHelp(false)}>
                        <Instructions />
                    </Modal>
                </MantineProvider>
                <a onClick={() => setHelp(true)}>
                    <BsQuestionCircle className="w-6 h-6 md:w-7 md:h-7" />
                </a>
                <MantineProvider theme={{ colorScheme: "dark" }}>
                    <Modal opened={stats} onClose={() => setStats(false)}>
                        <Stats />
                    </Modal>
                </MantineProvider>

                <a onClick={() => setStats(true)}>
                    <BiBarChartAlt2 className="w-6 h-6 md:w-7 md:h-7" />
                </a>
                <a>
                    <IoMdSettings className="w-6 h-6 md:w-7 md:h-7" />
                </a>
            </div>
        </nav>
    );
}

function Instructions() {
    return (
        <div>
            <p className="font-bold text-center text-lg">HOW TO PLAY</p>
            <p className="mt-4">
                Guess the WORDLE in 6 tries.
                <br />
                <br />
                Each guess must be a valid 5-letter word. Hit the enter button
                to submit.
                <br />
                <br />
                After each guess, the color of the tiles will change to show how
                close your guess was to the word.
            </p>
            <hr className="mt-2 h-[0.062rem] border-none bg-gray-600" />
            <p className="font-bold mt-2 mb-4">Examples</p>
            <img src="/display1.png" />
            <p className="mt-2 mb-4">
                The letter <b>W</b> is in the word and in the correct spot.
            </p>
            <img src="/display2.png" />
            <p className="mt-2 mb-4">
                The letter <b>I</b> is in the word but in the wrong spot.
            </p>
            <img src="/display3.png" />
            <p className="mt-2 mb-4">
                The letter <b>U</b> is not in the word in any spot.
            </p>
        </div>
    );
}

function Stats() {
    return (
        <div>
            <p className="text-center font-bold">STATISTICS</p>
            <div className="flex flex-row justify-center mt-2 gap-10 text-center text-sm">
                <div className="flex flex-col">
                    <p className="text-4xl">{ls.played}</p>
                    <p>Played</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-4xl">{ls.win / ls.played}</p>
                    <p>Win %</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-4xl">{ls.streak}</p>
                    <p>
                        Current
                        <br />
                        Streak
                    </p>
                </div>
                <div className="flex flex-col">
                    <p className="text-4xl">{ls.maxStreak}</p>
                    <p>
                        Max
                        <br />
                        Streak
                    </p>
                </div>
            </div>
            {guessDist.split(" ").map((num, index) => {
                return (
                    <p>
                        {index + 1} {num[index]}
                    </p>
                );
            })}
        </div>
    );
}

export default Navbar;
