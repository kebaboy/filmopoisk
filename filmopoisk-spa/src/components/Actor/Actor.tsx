import React from 'react';
import styles from './Actor.module.css';
import { Actor } from '../../constants/types';

interface ActorProps {
    actor: Actor,
}

const ActorCard: React.FC<ActorProps> = ({ actor: { name, photo } }) => {
    return (
        <div className={styles.actorCard}>
            <div className={styles.actorImage}>
                <img src={photo} alt={name} />
            </div>
            <div className={styles.actorName}>{name}</div>
        </div>
    );
};

export default ActorCard;