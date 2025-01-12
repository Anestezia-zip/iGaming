import React, { useState } from 'react'
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
    
  return (
    <div>SlotMachineList</div>
  )
}

export default SlotMachineList