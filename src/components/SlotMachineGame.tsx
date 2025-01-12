import React, { useState } from 'react'

interface SlotMachineData {
    id: number;
    name: string;
    betAmounts: number[];
}

const SlotMachineGame = () => {
  const [selectedMachine, setSelectedMachine] = useState<SlotMachineData | null>(null);

  return (
    <div>SlotMachineGame</div>
  )
}

export default SlotMachineGame