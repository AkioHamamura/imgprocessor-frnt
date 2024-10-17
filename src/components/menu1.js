import {useState} from "react";

function Menu1({item, setItem}){
    return (
        <div>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            <li><a onClick={() => {
                setItem(1);
            }}>Upscale</a></li>
            <li><a onClick={() => {
                setItem(2);
            }}>AI Remove Background</a></li>
            <li><a onClick={() => {
                setItem(3);
            }}>AI Upscale</a></li>
        </ul>
            <div className="join">
                <input className="join-item btn" type="radio" name="options" aria-label="Radio 1"/>
                <input className="join-item btn" type="radio" name="options" aria-label="Radio 2"/>
                <input className="join-item btn" type="radio" name="options" aria-label="Radio 3"/>
        </div>
        </div>
    );
}

export default Menu1;