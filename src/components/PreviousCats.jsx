import { useState } from 'react'

function PreviousCats ({ prevBreeds, prevImages }) {


    return (
        <div className = "previous-cats-div">
            <h2>Previous Cats</h2>
            <h3>Here are the previous cats you've seen:</h3>
            <div className = "previous-cats-images">
                {prevImages.length > 0 ? (
                    prevImages.map((image, index) => (
                        <div key={index} className="previous-cat-image">
                            <img src={image} alt={`Previous cat ${index + 1}`} />
                            {prevBreeds[index] && (
                                <p>{`Breed: ${prevBreeds[index].name}, Weight: ${prevBreeds[index].weight}, Lifespan: ${prevBreeds[index].lifespan}`}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No previous cats.</p>
                )}
            </div>
        </div>
    )

}

export default PreviousCats