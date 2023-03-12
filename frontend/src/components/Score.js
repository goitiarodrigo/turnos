import { useState } from "react"
import ReactStars from 'react-stars'
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"

const Score = ({scoreArray, staff,valid,doctorId,sendScore})=>{
    // eslint-disable-next-line
    const [data, setData] = useState({
        action:'editScore',
        user:valid,
        doc:doctorId
    })
    const [newScoreArray, setNewScoreArray] = useState(scoreArray)

    const AddScores=()=>{
        let valor = 0
        newScoreArray.map(obj=> valor = valor+obj.point)
        return valor/newScoreArray.length
    }
    const changeScoreHandler=(e)=>{
        sendScore({...data,point:e})
        .then(res =>{
            if(res.success){
                setNewScoreArray(res.res)
            }
        })
    }
    
    if(!staff && valid){
        return(
            <div className='score'>
                <ReactStars count={5} size={27} value={AddScores()} onChange={changeScoreHandler} color2={'#ffd700'} half={true}/>
                <p>{AddScores().toFixed(1)}/5</p>
            </div>
             
        )
    }
    return(
        <ReactStars count={5} size={24} value={AddScores()} color2={'#ffd700'} half={true} edit={false}/>
    )
}
const mapDispatchToProps ={
    sendScore:doctorActions.sendScore
}
export default connect(null, mapDispatchToProps)(Score)