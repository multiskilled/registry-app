import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

function Registry(){
    //create a variable and initilize with empty array
    const [registryData, setRegistryData]=useState([])
    const [textInput, setTextInput]=useState("")
    const [error,setError]=useState(false)

    //a function to override the input on submit event handler
    const addItem=(e)=>{
        //prevent default form behaviour
            e.preventDefault();
            if(error) return;
        //create a copy of the read only item(text input)
        const tempData=[...registryData];
        //push the newly create text input
        tempData.push(textInput)
        //call setregistry data to update the set
        setRegistryData(tempData)
        //set text input to be empty
        setTextInput("")
       
    }

    useEffect(()=>{
        if(textInput.length > 10) setError(true);
        else setError(false)
    },[textInput])

    const removeItem=(index)=>{
        let newData=[...registryData]//copy the state
        newData.splice(index,1)
        setRegistryData(newData)
    }

    //function for editing text
    const editItem=(index)=>{
        if(error) return;
        
        let newData=[...registryData]
        newData[index]=textInput;

        setRegistryData(newData)
    }


    //test with console log output in the browser in console tab
    console.log(registryData)

    return(
        <div>
            <h1>Registry</h1>
            <Link to="/">Click here to go to Home</Link>
            <form onSubmit={addItem}>
                    <label>text input:
            <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            {error ? <span style={{color:"red"}}>Error Occured.</span> : null}
        {
//map over registry data array
//only javascript inside of curly braces
                registryData.map((item,index)=>
                {
                    return(
                        //makek a list
                        //use key to get associated with an item
                        <li key={index}>{item}  <button onClick={()=>removeItem(index)}>Remove</button> <button
                                onClick={()=>editItem(index)}>Edit item</button></li>
                    )
                }
                )


        }

            
        </div>
    )//all froms in react must be connected with state to make things easy


}

export default Registry;