import clsx from 'clsx'
import { FC } from 'react';

type ButtonProps = {
    icon?: string;
    children: React.ReactNode;
    href?: string;
    containerClassName?: string;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    disabled?: boolean;
    size?: string;
    textBtn?: string;
    hoverBg?: boolean;
};


const Button: FC<ButtonProps> = ({ icon, children, href, containerClassName, onClick, onKeyDown, disabled, size = 'h-[60px] px-12 g4', textBtn = 'text-p1', hoverBg }) => {
    const Inner = () => (
        <span className={clsx('relative flex items-center justify-center rounded-2xl overflow-hidden', size, disabled && 'mix-blend-exclusion', hoverBg && 'bg-gradient-hover group-hover:before:opacity-100')}>
            {icon && (<img src={icon} alt="icon" className='size-10 mr-5 object-contain z-10' />)}
            <span className={clsx('relative z-2 font-bold text-2xl max-[500px]:text-lg tracking-widest uppercase', textBtn)}>{children}</span>
        </span>
    )

    return href ? (
        <a className={clsx('relative p-0.5 g5 rounded-2xl shadow-300 group', containerClassName)} href={href}>
            <Inner />
        </a>
    ) : (
        <button className={clsx('relative p-0.5 g6 rounded-2xl shadow-300 group', containerClassName)} onClick={onClick} onKeyDown={onKeyDown} disabled={disabled}>
            <Inner />
        </button>
    )
}

export default Button