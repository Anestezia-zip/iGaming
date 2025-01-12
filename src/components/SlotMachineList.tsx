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

    useEffect(() => {
        const fetchSlotMachines = () => {
            try {
                const data = mockSlotMachineData.slotMachines;                
                const machines = data.map((item) => ({
                    machine: new SlotMachine(item.id, item.name),
                    betAmounts: item.betAmounts,
                }));
                setSlotMachines(machines);
            } catch (error) {
                console.error("Error fetching slot machines:", error);
            }
        };
    
        fetchSlotMachines();
    }, []);
    
    const handleSelectMachine = (machine: SlotMachineData) => {
        setSelectedSlotMachine(machine);
        const gameData = {
            id: machine.machine.id,
            name: machine.machine.name,
            betAmounts: machine.betAmounts,
        }
        window.postMessage({ type: 'SELECT_MACHINE', data: gameData }, '*');
    };

    return (
        <div className='flex flex-col gap-4 p-2'>
            <div className='flex justify-center gap-8 rounded-bl-lg rounded-br-lg'>
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
            </div>
            <div className='h4 max-sm:h5 text-center'>Balance: ${userBalance}</div>
        </div>
    );
}

export default SlotMachineList