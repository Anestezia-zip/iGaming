import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import clsx from 'clsx';

interface SlotMachineData {
    id: number;
    name: string;
    betAmounts: number[];
}

const SlotMachineGame = () => {
    const [selectedMachine, setSelectedMachine] = useState<SlotMachineData | null>(null);
    const [currentBet, setCurrentBet] = useState<number | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);


    useEffect(() => {
        // Waiting for data on the selected machine
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'SELECT_MACHINE') {
                setSelectedMachine(event.data.data);
                setCurrentBet(null); // Resetting the current rate
                // setResultMessage(null); // Clearing the past result
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleSpin = () => {}


    return (
        <div className='container g7 min-h-[420px] p-2'>
            <h2 className='caption text-xl py-6 pb-2'>Try your luck</h2>
            {selectedMachine ? (
        <div className='container flex lg:gap-44 max-lg:gap-22 max-[695px]:gap-12 max-[410px]:gap-4 md:text-xl'>
          <div>
            <h3>Selected machine: {selectedMachine.name}</h3>
            <p className='max-[570px]:hidden'>
              Bet range: ${selectedMachine.betAmounts[0]} - {selectedMachine.betAmounts[selectedMachine.betAmounts.length - 1]}
            </p>
            <video
              ref={videoRef}
              src="/src/assets/slot-machine-175.webm"
              className='max-[460px]:w-[100%] w-[70%]'
              muted
            />
            {/* <div className={clsx('caption !leading-7 text-base max-w-44 mx-auto mt-10 hidden max-[570px]:block')}>
              {resultMessage}
            </div> */}
          </div>

          <div className='md:text-xl'>
            {/* Кнопки для выбора ставки */}
              <p>Please select your bet:</p>
            <div className='max-w-96 max-[695px]:max-w-60 grid grid-cols-4 gap-4 max-[695px]:grid-cols-2 max-[695px]:gap-2 my-4'>
              {selectedMachine.betAmounts.map((bet, i) => (
                <Button 
                  key={i}
                  onClick={() => setCurrentBet(bet)} 
                  containerClassName={clsx('mb-8 max-[695px]:mb-4 rounded-14', currentBet === bet ? '!g2' : '')}
                  size={clsx('py-3 px-4 max-[695px]:py-2 px-2')}
                  textBtn=''
                  hoverBg={currentBet !== bet}
                >
                  ${bet}
                </Button>
              ))}
            </div>

            {/* Spin button */}
            <Button onClick={handleSpin}  disabled={isSpinning || currentBet === null}>
              Spin
            </Button>

            {/* Message about rezult of spin */}
            {/* {resultMessage && <div className={clsx('caption !leading-7 text-2xl mt-10 max-[570px]:hidden')}>{resultMessage}</div>} */}
          </div>
        </div>
      ) : (
        <h2 className='h5 mt-6 flex items-center justify-center'>Please select a slot machine from the list.</h2>
      )}
        </div>
    )
}

export default SlotMachineGame