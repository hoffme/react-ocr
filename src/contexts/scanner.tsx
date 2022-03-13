import {createContext, ReactNode, useState} from "react";
import {createWorker} from "tesseract.js";

interface Results {
    photoUri: string
    text: string
}

interface ScannerContextValue {
    scanning: boolean
    scan: (src: string) => Promise<void>
    results?: Results
}

const ScannerContext = createContext<ScannerContextValue>({
    scanning: true,
    scan: () => { throw new Error('method not implemented') }
})

interface Props {
    children?: ReactNode
}

interface State {
    scanning: boolean
    results?: Results
}

const ScannerProvider = (props: Props) => {
    const [state, setState] = useState<State>({
        scanning: false
    });

    const scan = async (src: string): Promise<void> => {
        if (state.scanning) return;

        setState({ scanning: true, results: { photoUri: src, text: '' } })

        const worker = createWorker({
            cacheMethod: 'none'
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const { data: { text } } = await worker.recognize(src);
        setState({ scanning: true, results: { text, photoUri: src } });

        await worker.terminate();

        setState({ scanning: false, results: { text, photoUri: src } });
    }

    return <ScannerContext.Provider value={{
        ...state,
        scan
    }}>
        { props.children }
    </ScannerContext.Provider>
}

export default ScannerContext;
export {
    ScannerProvider
}