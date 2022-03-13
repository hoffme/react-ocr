import Contexts from "../contexts";

import Camera from "../components/camera";
import Controls from "../components/controls";
import Results from "../components/results";

import style from './style.module.scss';

const App = () => {
    return <div className={style.container}>
        <Contexts>
            <Camera className={style.background} />
            <Controls className={style.controls} />
            <Results className={style.results} />
        </Contexts>
    </div>
}

export default App;