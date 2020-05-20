import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialUpdateMovie = {

    name:'',
    director:'',
    metascore:'',
    stars:[]

}

const UpdateMovie = (props) => {

    const [updateMovie, setUpdateMovie] = useState(initialUpdateMovie)
    const {id} = useParams()
    const {push} = useHistory()
    const { setMovieList } = props

    useEffect(() => {

        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {

                setUpdateMovie(res.data)
                

            })
            .catch(err => {

                console.log(err)

            })

    }, [])

    const upMovie = () => {


        axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
            .then(res => {

                axios.get('http://localhost:5000/api/movies')
                    .then(res => {

                        setMovieList(res.data)

                    })
                    .catch(err => {

                        console.log(err)

                    })
               
                setUpdateMovie(initialUpdateMovie)
                push('/')

            })
            .catch(err => {

                console.log(err)

            })


    }

    const handleChange = (e) => {


        if(e.target.name !== 'stars')
        {

            setUpdateMovie({

                ...updateMovie,
                [e.target.name]: e.target.value
    
            })

        } else {

            const newStars = e.target.value.split(',')

            setUpdateMovie({


                ...updateMovie,
                stars: newStars

            })

        }
        

    }

    return (
        <div>
        {updateMovie &&
        <div>
            <p>Update Movie</p>
            <label>Title: <input onChange={handleChange} type='text' name='title' value={updateMovie.title}/></label>
            <label>Director: <input onChange={handleChange} type='text' name='director' value={updateMovie.director} /></label>
            <label>Metascore: <input onChange={handleChange} type='text' name='metascore' value={updateMovie.metascore} /></label>
            <label>Stars: <input onChange={handleChange} type='text' name='stars' value={updateMovie.stars} /></label>
            <button onClick={upMovie}>Update</button>
        </div>
        }
        </div>

    )

}

export default UpdateMovie