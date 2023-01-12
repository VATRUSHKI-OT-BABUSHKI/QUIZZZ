import { useState } from 'react'
import styles from './page.module.scss'


export function RadioButton({ text }) {
    const [pressed, setPressed] = useState(false);

    const onClickHandler = () => {
        setPressed(!pressed);
    }

    return <div className={`${styles.radio} 
                    ${pressed ? styles.radio_pressed : ''}`} onClick={onClickHandler}>
        <div className={styles.radio__outer}>
            <div className={styles.radio__circle}>
                {pressed && <div className={styles.radio__dot}></div>}
            </div>
        </div>
        <div>{text}</div>
    </div>
}


export default function Page() {
    return <div>
        <RadioButton text="Номер один" />
        <RadioButton text="Номер два" />
        <RadioButton text="Номер три" />
    </div>
}