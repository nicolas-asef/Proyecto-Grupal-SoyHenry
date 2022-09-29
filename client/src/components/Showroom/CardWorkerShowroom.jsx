

export function CardWorkerShowroom({id, name, lastName, img, jobs, rating_W}) {
    

    return (
        <div>
            <div> 
                <img src={img} alt='imagen'/>
            </div>
            <div>
                <h3>{name}</h3>
                <h3>{lastName}</h3>
            </div>
            <div>
                {jobs.map((j, index) => <span key={index}>{j}</span>)}
            </div>
            <div>
                <span>Rating:</span>
                <span>
                    { 
                    rating_W === 100 ? <p>★★★★★</p> :  
                    rating_W > 75 ? <p>★★★★</p> :
                    rating_W > 50 ? <p>★★★</p> : 
                    rating_W > 25 ? <p>★★</p> :
                    <p>★</p>
                    }
                </span> 
            </div>
        </div>
    )
}

