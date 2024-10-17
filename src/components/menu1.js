import {useState} from "react";

function Menu1({item, setItem}){
    return (
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
    );
}

export default Menu1;