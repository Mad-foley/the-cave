import { logo } from "../../utilities/constants"
import BottleFluidFill from "./BottleFillLoading"
export default function FallingBottle() {
    return (
        <div>
            <div className="loading-bg">
                <div className="loading">
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                    <span><BottleFluidFill/></span>
                </div>
            </div>
        </div>
    )
}
