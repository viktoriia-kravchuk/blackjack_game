import { observer } from "mobx-react"
import blackjackStore from "../../stores/GameStore"

const ActionButtons = () => {

    const handleHit = () => {
        blackjackStore.hit();
    }

    const handleStand = () => {
        blackjackStore.stand();
    }

    const handleReset = () => {
        blackjackStore.resetGame();
    }

    return (<div>
        <button onClick={handleHit}>HIT</button>
        <button onClick = {handleStand}>STAND</button>
        <button onClick = {handleReset}>RESET</button>
    </div>)

}

export default observer(ActionButtons)