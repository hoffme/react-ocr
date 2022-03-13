import {useContext, useEffect, useState} from "react";

import ScannerContext from "../../contexts/scanner";

import Loading from "../loading";

import style from './style.module.scss';

interface Props {
    className?: string
}

const Results = (props: Props) => {
    const { scanning, results } = useContext(ScannerContext);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open && scanning) setOpen(true);

        return () => {}
    }, [open, scanning])

    const styles = [style.container];
    if (props.className) styles.push(props.className);

    if (!open) return <></>;

    return <div className={styles.join(' ')}>
        <h3 className={style.title}>Results</h3>
        <div className={style.results}>
            <img className={style.photo} src={results?.photoUri} alt={''} />
            <label className={style.text}>{ results?.text }</label>
        </div>
        {
            scanning ?
                <Loading /> :
                <>
                    <button onClick={() => setOpen(false)}>close</button>
                </>
        }
    </div>
}

export default Results;