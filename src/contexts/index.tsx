import { ReactNode } from "react";

import { CameraProvider } from "./camera";
import {ScannerProvider} from "./scanner";

interface Props {
    children?: ReactNode
}

const Contexts = (props: Props) => {
    return <CameraProvider>
        <ScannerProvider>
            { props.children }
        </ScannerProvider>
    </CameraProvider>
}

export default Contexts;