import { useContext } from "react";

import CameraContext from "../../contexts/camera";

import Loading from "../loading";

import style from './style.module.scss';

interface Props {
    className?: string
}

const Camera = (props: Props) => {
    const { loading, stream } = useContext(CameraContext);

    const styles = [style.container];
    if (props.className) styles.push(props.className);

    if (loading) {
        return <div className={styles.join(' ')}>
            <Loading />
        </div>
    }

    if (!stream) {
        return <div className={styles.join(' ')}>
            <label>Camera not found</label>
        </div>
    }

    return <div className={styles.join(' ')}>
        <video
            className={style.video}
            ref={video => { if (video) video.srcObject = stream }}
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            playsInline={true}
        />
    </div>
}

export default Camera;