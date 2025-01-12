import React from 'react'
import { SlotMachine, SlotMachineInterface } from '../classes/SlotMachine';
import { mockSlotMachineData } from '../constants/index';

const SlotMachineList = () => {
    const [slotMachines, setSlotMachines] = useState<{
        machine: SlotMachineInterface;
        betAmounts: number[];
    }[]>([]);
  return (
    <div>SlotMachineList</div>
  )
}

export default SlotMachineList