import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function AddMovie(props){
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = () => {
        const NewMovieObj = {
          title: title,
          text: text,
          date: date
        }
        props.onAddMovie(NewMovieObj)
    }

    return(
        <div>
            <form id="add-form" action="#" className="container form1" style={{ display:'flex', flexDirection:'column' }}>
                <div style={{ padding: 10 }}>
                    <label>Title </label>
                </div>
                <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} required />

                <div style={{ padding: 10 }}>
                    <label>Opening Text </label>
                </div>
                <textarea rows="8" type="text" onChange={(e)=>setText(e.target.value)} name="opening_text" required />
                
                <div style={{ padding: 10 }}>
                    <label>Release Date </label>
                </div>
                <input type="text" onChange={(e)=>setDate(e.target.value)} name="release_date" required />

                <div style={{ padding: 20 }}>
                    <Button variant="outline-secondary" onClick={handleSubmit} id="button-addon2">
                        Add Movies
                    </Button>
                </div>
            </form>
        </div>
    )
}