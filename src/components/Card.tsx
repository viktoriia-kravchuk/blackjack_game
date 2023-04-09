import React from 'react';

interface CardProps {
    suit: string;
    number: string;
    isHidden: boolean;
}


const Card: React.FC<CardProps> = ({ suit, number, isHidden }) => {

    const getCrad = () => {
        return  suit + number;
    }

    return (
        isHidden! ? <div>
            <div className={getCrad()}></div>
        </div>
        :
        <div></div>
    );
}

export default Card;