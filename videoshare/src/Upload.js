import React from "react"
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import axios from 'axios';

export default function Form(){
    const [formData,setFormData] = React.useState(
        {selectedFile:null, vidname: "",description:""}
    )   
    function handleChange(event){
        console.log(formData)
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    function handleFile(event){
        let file = event.target.files[0];
        console.log(event.target.files[0])
        console.log(formData)
        if(file.name.includes(".mp4" ) || file.name.includes(".mov" )||file.name.includes(".wmv" )){
            setFormData(prevFormData => {
                return{
                    ...prevFormData,
                    selectedFile: file
                }
            })
        }else {
            alert("Videoshare does not accept the selected file type, please select a mp4, mov, or wmv file please")
        }
    }
    function handleSubmit(event){
        event.preventDefault()
        if(formData.selectedFile && formData.vidname){
            if(!formData.description){
                setFormData(prevFormData => {
                    return{
                        ...prevFormData,
                        description:""
                    }
                })
            }
            axios.post(`/upload`,formData).then(res => {
                const id = res.data._id;
                getS3(id).then(res =>
                    putS3(res.uploadURL)
                )
            })
        }
        console.log(formData)
    }

    async function getS3(id){
        try {
            let res = await axios({
                url: '/s3url',
                method: 'get',
                timeout: 8000,
                headers: {
                    'Content-Type': 'application/json'
                },
                params:{id:id}
            })
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    async function putS3(s3url){
        try {
            let res = await axios({
                url: s3url,
                method: 'put',
                timeout: 8000,
                headers: {
                    'Content-Type': undefined
                },
                data:formData.selectedFile
            })

            return res.data
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
        <form className="upload" onSubmit={handleSubmit} action="#">
            <input type ="file" onChange={handleFile} name="selectedFile" ></input><br></br>
            <input type="text" placeholder="Video Name" onChange={handleChange} name="vidname"></input>
            <input type="text" placeholder="Video Description" onChange={handleChange} name="description"></input>
            <button type="submit">UPLOAD</button>
        </form>
        </div>
    )
}
