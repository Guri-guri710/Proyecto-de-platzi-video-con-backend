import React, { useEffect } from 'react';
import '../assets/styles/components/Player.scss';
import { getVideoSource } from '../actions';
import { Redirect }


const Player = props => {
    const { id } = props.math.params;
    const hasPlaying = Object.keys(props.playing).length;

    useEffect(() => {
        props.getVideoSource(id)
    }, [])

    return hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src="" type="video/mp4" />
            </video>
            <div className="Player-back">
                <button type="button" onClick={() => props.history.goBack()}>
                    Regresar
                </button>
            </div>
        </div>
    ): <Redirect to="/404/"></Redirect>;
}

const mapStateToProps = state =>{
    return {
        playing: state.playing,
    }
}

const mapDispatchToProps = {
    getVideoSource,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)