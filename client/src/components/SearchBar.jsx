import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName} from '../actions';
import "./SearchBar.css"

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('')//Hook


    function handleInputChange(e) {
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokemonName(name))
 
        setName('')

    }

    return (
        <div className='searchBar'>
            <input value={name} id="inputSearch" type='text' placeholder='Search...' onChange={e => handleInputChange(e)}></input>
            <button className="btnSearch" type='submit' onClick={e => handleSubmit(e)}>GO!</button>
        </div>
    )
}


