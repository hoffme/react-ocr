import {useContext} from "react";

import ScannerContext from "../../contexts/scanner";
import CameraContext from "../../contexts/camera";

import style from './style.module.scss';

interface Props {
    className?: string
}

const Controls = (props: Props) => {
    const { scan } = useContext(ScannerContext);
    const { getSnapshotUri } = useContext(CameraContext);

    const startScan = () => {
        getSnapshotUri()
            .then(scan)
            .catch(console.error)
    }

    const styles = [style.container];
    if (props.className) styles.push(props.className);

    return <div className={styles.join(' ')}>
        <button onClick={startScan}>Scan</button>
    </div>
}

export default Controls;