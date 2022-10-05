import { FaBars } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";

import { useState, useEffect } from "react";
import { Modal, MantineProvider } from "@mantine/core";

const ls = localStorage;
const guessDist = ls.guessDist;

function Navbar() {
    const [help, setHelp] = useState(false);
    const [stats, setStats] = useState(false);
    const [info, setInfo] = useState(false);

    useEffect(() => {
        if (ls.length == 0) {
            ls.setItem("played", 0);
            ls.setItem("won", 0);
            ls.setItem("streak", 0);
            ls.setItem("maxStreak", 0);
            // array that represents the guess distribution of right answers from player
            ls.setItem("guessDist", "0,0,0,0,0,0");
        }
    }, []);

    return (
        <nav className="flex flex-wrap justify-between px-4 py-4 border-b border-[#3A3A3C] font-semibold font-sans tracking-tighter items-center">
            <div className="inline-flex flex-row gap-3 items-center">
                <a>
                    <FaBars className="w-6 h-6" />
                </a>
                <h1 className="sm:hidden text-3xl ">not-wordle</h1>
            </div>
            <h1 className="hidden sm:block text-3xl ml-[4.5rem]">not-wordle</h1>
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
                <a onClick={() => setInfo(true)}>
                    <BsInfoCircle className="w-6 h-6 md:w-7 md:h-7" />
                </a>
                <MantineProvider theme={{ colorScheme: "dark" }}>
                    <Modal opened={info} onClose={() => setInfo(false)}>
                        <Info />
                    </Modal>
                </MantineProvider>
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
                    <p className="text-4xl">
                        {Math.round((ls.won / ls.played) * 100)}
                    </p>
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
            <div>
                <p className="font-bold text-center mt-4 mb-2">
                    GUESS DISTRIBUTION
                </p>
                {guessDist.split(",").map((num, index) => {
                    // gross thing thats actually nice cus its on one line
                    // it gets the guessDist array from localStorage then converts to array
                    // then it calculates the sum of all elements
                    // proportion var is exactly that, proportion of wins that took index number
                    // of guesses
                    const gDistTotal = ls.guessDist
                        .split(",")
                        .reduce((a, b) => parseInt(a) + parseInt(b), 0);

                    let proportion = (num[index] / gDistTotal) * 100;
                    let color = "#3A3A3C";

                    if (proportion > 0) {
                        null;
                        color = "#50C878";
                    } else {
                        proportion = 0;
                    }

                    let style = {
                        width: `${proportion}%`,
                        backgroundColor: color,
                    };

                    return (
                        <div className="flex gap-3 mb-2" key={num + index}>
                            <p>{index + 1}</p>
                            <div
                                className="text-right text-white pr-2 font-bold"
                                style={style}
                            >
                                {num[index]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Info() {
    return (
        <div className="text-center flex flex-col gap-2">
            <p className="text-lg font-bold">not-wordle</p>
            <p className="text-sm">
                Made by Musa Ahmed (
                <a href="https://github.com/m-GDEV" className="text-blue-500">
                    m-GDEV
                </a>
                )
            </p>
            <p> Created on October 5, 2022 </p>
            <p className="text-sm">(exactly 129 days since this was popular)</p>
            <a
                href="https://github.com/m-GDEV"
                className="text-blue-500 text-lg mt-4"
            >
                Check out some of my other projects on Github!
            </a>
        </div>
    );
}

export default Navbar;
