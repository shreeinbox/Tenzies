

const Dice = (props) => {
    const {buttons, handleBtn} = props
    return (
        <div id='container'>
            {buttons.map((element)=>{
            return <button className={element.isHeld?`btn btnSelected backgroundOption${element.value}` : `btn backgroundOption${element.value}`} 
                            onClick={handleBtn} 
                            key={element.id}
                            id={element.id}
                            >
                                
                    </button>
            })
            }
        </div>
    )
}

export default Dice
