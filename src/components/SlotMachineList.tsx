import React, { useEffect, useState } from 'react'
import { SlotMachine, SlotMachineInterface } from '../classes/SlotMachine';
import { mockSlotMachineData } from '../constants/index';

const SlotMachineList = () => {
    const [slotMachines, setSlotMachines] = useState<{
        machine: SlotMachineInterface;
        betAmounts: number[];
    }[]>([]);
    const [selectedSlotMachine, setSelectedSlotMachine] = useState<{
        machine: SlotMachineInterface;
        betAmounts: number[]
    } | null>(null);
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
    


  return (
    <div>SlotMachineList</div>
  )
}

export default SlotMachineList