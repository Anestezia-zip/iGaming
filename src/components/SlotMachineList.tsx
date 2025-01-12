import React, { useEffect, useState } from 'react'
import { SlotMachine, SlotMachineInterface } from '../classes/SlotMachine';
import { mockSlotMachineData } from '../constants/index';

type SlotMachineData = {
    machine: SlotMachineInterface;
    betAmounts: number[];
};

const SlotMachineList = () => {
    const [slotMachines, setSlotMachines] = useState<SlotMachineData[]>([]);
    const [selectedSlotMachine, setSelectedSlotMachine] = useState<SlotMachineData | null>(null);
    const [userBalance, setUserBalance] = useState(100);

    // State of loading data and error state
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSlotMachines = () => {
            setLoading(true);
            setError(null)
            try {
                const data = mockSlotMachineData.slotMachines;
                if (data.length === 0) {
                    setError('No slot machines available.');
                    return;
                }

                const machines = data.map((item) => ({
                    machine: new SlotMachine(item.id, item.name),
                    betAmounts: item.betAmounts,
                }));
                setSlotMachines(machines);
            } catch (error) {
                setError('Failed to load slot machines. Please try again later.');
            } finally {
                setTimeout(() => {
                    setLoading(false); // simulate a long data load
                }, 1100);
            }
        };

        fetchSlotMachines();
    }, []);

    const handleSelectMachine = ({ machine, betAmounts }: SlotMachineData) => {
        setSelectedSlotMachine({ machine, betAmounts });
        const gameData = {
            id: machine.id,
            name: machine.name,
            betAmounts,
        }
        window.postMessage({ type: 'SELECT_MACHINE', data: gameData }, '*');
    };

    if (error) {
        return <div className="text-center md:text-2xl p-8">
            <div className='text-red-500 mb-6'>{error}</div>
            <div className='h4 max-sm:h5 text-center'>Balance: ${userBalance}</div>
        </div>;
    }

    return (
        <div>
            {loading ? (
                <div className='flex justify-center'>
                    <div className="m-8 flex flex-col items-center justify-between w-[160px] h-[260px] bg-orange-100/60 rounded-3xl shadow-md animate-pulse-fast">
                        <div className="bg-green-100/70 h-8 w-8 mt-4 rounded-full"></div>
                        <div className="bg-green-100/70 h-10 w-3/4 my-4 rounded"></div>
                        <div className="bg-green-100/70 h-16 w-3/4 mb-8 rounded"></div>
                    </div>
                    <div className="m-8 flex flex-col items-center justify-between w-[160px] h-[260px] bg-orange-100/60 rounded-3xl shadow-md animate-pulse-fast">
                        <div className="bg-green-100/70 h-8 w-8 mt-4 rounded-full"></div>
                        <div className="bg-green-100/70 h-10 w-3/4 my-4 rounded"></div>
                        <div className="bg-green-100/70 h-16 w-3/4 mb-8 rounded"></div>
                    </div>
                    <div className="m-8 flex flex-col items-center justify-between w-[160px] h-[260px] bg-orange-100/60 rounded-3xl shadow-md animate-pulse-fast">
                        <div className="bg-green-100/80 h-8 w-8 mt-4 rounded-full"></div>
                        <div className="bg-green-100/80 h-10 w-3/4 my-4 rounded"></div>
                        <div className="bg-green-100/80 h-16 w-3/4 mb-8 rounded"></div>
                    </div>
                </div>

            ) : (
                <div className='flex flex-col gap-4 p-2'>
                    <div className='flex justify-center gap-8 rounded-bl-lg rounded-br-lg'>
                        {slotMachines.length === 0 ? (
                            <div className='text-center md:text-2xl text-red-500 p-8'>No slot machines available</div>
                        ) : (
                            <>
                                {slotMachines.map((item) => (
                                    <div
                                        key={item.machine.id}
                                        onClick={() => handleSelectMachine(item)}
                                        className='relative'
                                    >
                                        <img src="/src/assets/slot.png" width={200} className='cursor-pointer' alt={item.machine.name} />
                                        <p className='slot-id'>{item.machine.id}</p>
                                        <p className='slot-bet-range'>Bet range: {item.betAmounts[0]}-{item.betAmounts[item.betAmounts.length - 1]}</p>
                                        <p className='slot-name'>{item.machine.name}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className='h4 max-sm:h5 text-center'>Balance: ${userBalance}</div>
                </div>
            )}
        </div>
    );
}

export default SlotMachineList