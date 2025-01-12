import React, { useEffect, useState } from 'react'

interface SlotMachineData {
    id: number;
    name: string;
    betAmounts: number[];
}

const SlotMachineGame = () => {
    const [selectedMachine, setSelectedMachine] = useState<SlotMachineData | null>(null);

    useEffect(() => {
        // Слушаем сообщения из первого iframe
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'SELECT_MACHINE') {
                setSelectedMachine(event.data.data);
                // setCurrentBet(null); // Сбрасываем текущую ставку
                // setResultMessage(null); // Очищаем прошлый результат
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    return (
        <div>
            {selectedMachine ? (
                <div>
                    {selectedMachine.name}
                </div>
            ) : (<></>)}
        </div>
    )
}

export default SlotMachineGame