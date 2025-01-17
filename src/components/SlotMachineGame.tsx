import { useEffect, useRef, useState } from 'react'
import Button from './Button';
import clsx from 'clsx';
import { SlotMachine } from '../classes/SlotMachine';

interface SlotMachineData {
    id: number;
    name: string;
    betAmounts: number[];
}

const SlotMachineGame = () => {
    const [selectedMachine, setSelectedMachine] = useState<SlotMachineData | null>(null);
    const [currentBet, setCurrentBet] = useState<number | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState(100);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // Waiting for data on the selected machine
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'SELECT_MACHINE') {
                setSelectedMachine(event.data.data);
                setCurrentBet(null); // Resetting the current rate
                setResultMessage(null); // Clearing the past result
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);  

    const handleSpin = () => {
        if (currentBet! > userBalance) {
            setResultMessage('Insufficient balance for this bet');
            return;
        }
        if (!selectedMachine) {
            setResultMessage('No slot machine selected');
            return;
        }

        // Set the video playing of spinning slot
        setIsSpinning(true);

        // Set the current rate through the class method. Call spin() to get the result
        const slotMachineInstance = new SlotMachine(selectedMachine.id, selectedMachine.name);
        slotMachineInstance.placeBet(currentBet!);
        const spinResult = slotMachineInstance.spin();
        // Update the balance
        const newBalance = userBalance + spinResult;
        setUserBalance(newBalance);

        // Send a new balance in the first iframe
        window.postMessage({ type: 'UPDATE_BALANCE', balance: newBalance }, '*');

        // Notify the user of the result
        setResultMessage(
            spinResult > 0
                ? `You won $${spinResult}!`
                : `You lost $${Math.abs(spinResult)}.`
        );

        if (videoRef.current) {
            videoRef.current.playbackRate = 2;
            videoRef.current.play().then(() => {
            }).catch((error) => {
                console.error("Error playing video: ", error);
                setIsSpinning(false); //  Unlock button in case of an error
            });
        
            // Guarantee a state reset even if the video did not complete correctly
            videoRef.current.onended = () => {
                setIsSpinning(false); // Unlock button on video ended
            };
        
            videoRef.current.onerror = () => {
                console.error("Video playback encountered an error.");
                setIsSpinning(false); // Unlock button on video error
            };
        }
    }


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
                            className='max-[460px]:w-[100px] w-[150px] mt-4 max-[460px]:mt-2 h-auto object-contain transition-all duration-300'
                            muted
                            playsInline
                            preload="auto"
                            poster="/assets/slot-machine.png"
                            aria-label="Slot machine spinning animation"
                        >
                            <source src="/assets/slot-machine-175.webm" type="video/webm" />
                            <source src="/assets/slot-machine-1.mp4" type="video/mp4" />
                            Your browser does not support video with transparency.
                        </video>
                        <div aria-live="assertive" className={clsx('caption !leading-7 text-base max-w-44 mx-auto mt-10 hidden max-[570px]:block')}>
                            {resultMessage}
                        </div>
                    </div>

                    {/* Buttons for bet selection */}
                    <div className='md:text-xl'>
                        <p>Please select your bet:</p>
                        <div className='max-w-96 max-[695px]:max-w-60 grid grid-cols-4 gap-4 max-[695px]:grid-cols-2 max-[695px]:gap-2 my-4'>
                            {selectedMachine.betAmounts.map((bet, i) => (
                                <Button
                                    key={i}
                                    onClick={() => setCurrentBet(bet)}
                                    onKeyDown={(e) => e.key === 'Enter' && setCurrentBet(bet)}
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
                        <Button onClick={handleSpin} disabled={isSpinning || currentBet === null}>
                            Spin
                        </Button>

                        {/* Message about result of spin */}
                        {resultMessage && <div aria-live="assertive" className={clsx('caption !leading-7 text-2xl mt-10 max-[570px]:hidden')}>{resultMessage}</div>}
                    </div>
                </div>
            ) : (
                <h2 className='h5 mt-6 flex items-center justify-center'>Please select a slot machine from the list.</h2>
            )}
        </div>
    )
}

export default SlotMachineGame