import { useState } from 'react'

function BannedAttributes ({ bannedAttributes, setBannedAttributes }) {

    const unbanAttribute = (attribute) => {
        setBannedAttributes(bannedAttributes.filter((attr) => attr !== attribute)); // remove the attribute from the banned attributes array
    }

    return (
        <div className = "banned-attributes-div">
            <h2>Banned Attributes</h2>
            <h3>Select an attribute of the cat to ban it</h3>
            <div className='banned-attributes-buttons'>
                {bannedAttributes.map((attribute, index) => (
                    <button onClick = {() => unbanAttribute(attribute)} key={index}>{attribute}</button>
                ))}
            </div>
        </div>
    )

}

export default BannedAttributes