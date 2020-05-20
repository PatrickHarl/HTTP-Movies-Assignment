import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialNewMovie = {

    title:'',
    director:'',
    metascore:'',
    stars:[]

}


const AddMovie = (props) => {

    const history = useHistory()
    

    const [newMovie, setNewMovie] = useState(initialNewMovie)

    const handleChange = (e) => {

        if(e.target.name !== 'stars')
        {

            setNewMovie({

                ...newMovie,
                [e.target.name]: e.target.value
    
            })


        } else {

            const newStars = e.target.value.split(',')

            setNewMovie({

                ...newMovie,
                stars: newStars
    
            })


        }
       



    }


    const addNewMovie = () => {


        axios.post('http://localhost:5000/api/movies', newMovie)
            .then(res=> {

                props.setMoviesList(res.data)
                setNewMovie(initialNewMovie)
                history.push('/')

            })
            .catch(err=> {

                console.log(err)

            })


    }


    return(

        <div>
            <p>Add a Movie</p>
            <label>Title: </label><input onChange={handleChange} type='text' name='title' value={newMovie.title} />
            <label>Director: </label><input onChange={handleChange} type='text' name='director' value={newMovie.director} />
            <label>Metascore: </label><input onChange={handleChange} type='text' name='metascore' value={newMovie.metascore} />
            <label>Stars: </label><input onChange={handleChange} type='text' name='stars' value={newMovie.stars} />
            <button onClick={addNewMovie}>Add Movie</button>

        </div>

    )


}
export default AddMovie