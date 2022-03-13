import {createContext, ReactNode, useEffect, useState} from "react";

interface CameraContextValue {
    loading: boolean
    stream?: MediaStream
    getSnapshotUri: () => Promise<string>
}

const CameraContext = createContext<CameraContextValue>({
    loading: true,
    getSnapshotUri: async () => { throw new Error('camera not initialized') }
})

interface Props {
    children?: ReactNode
}

const CameraProvider = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [stream, setStream] = useState<MediaStream | undefined>();

    useEffect(() => {
        setLoading(true);

        navigator
            .mediaDevices
            .getUserMedia({
                video: true
            })
            .then(setStream)
            .catch(console.error)
            .finally(() => setLoading(false))

        return () => {};
    }, [])

    const getSnapshotUri = async (): Promise<string> => {
        const canvas = document.createElement('canvas');
        const video = document.createElement('video');

        const ctx = canvas.getContext( '2d' );

        if (!ctx || !stream) throw new Error('Cannot get stream video');

        video.srcObject = stream;
        await video.play();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        return canvas.toDataURL("image/png");
    }

    return <CameraContext.Provider value={{
        loading,
        stream,
        getSnapshotUri
    }}>
        { props.children }
    </CameraContext.Provider>
}

export default CameraContext;
export {
    CameraProvider
}