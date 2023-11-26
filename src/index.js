import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom/client';


function Home(){
    const [replyInputValue, setReplyInputValue] = useState("");
    const [replies, setReplies] = useState([]);
    const [replyFormOpen, setReplyFormOpen] = useState(false);

    const createReplyForm = (parentElement)=>{
        console.log("ini. " + replyFormOpen);

        const replyForm = document.createElement("form");

        //create reply input field
        const replyInput = document.createElement("input");
        replyInput.type = "text";
        replyInput.placeholder = "Enter your reply here";
        replyInput.value = replyInputValue;
        replyInput.addEventListener("change", (event) => setReplyInputValue(event.target.value));

        //create submit button for reply
        const submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "reply";

        //append to parent element: input,submit => form; form=>parentElement
        replyForm.appendChild(replyInput);
        replyForm.appendChild(submitButton);

        parentElement.appendChild(replyForm);

        //handle the submission
        replyForm.addEventListener("submit", (event)=> {
            event.preventDefault();
            if(replyInput.value.length > 0){
                const replyListItem = document.createElement("li");
                replyListItem.textContent = replyInput.value;
                
                //create indentation for child elements
                Object.assign(replyListItem.style, {"marginLeft": "15px"});

                parentElement.appendChild(replyListItem);
                parentElement.removeChild(replyForm);
                replyInput.value = "";

                setReplies([...replies, replyListItem.textContent])
                
                const style = {"border": "none", "margin": "5px"}
        
                
                const replyButton = document.createElement("button");
                replyButton.textContent = "Reply";
                Object.assign(replyButton.style, style)
                replyListItem.appendChild(replyButton);

                // replyButton.addEventListener("click", () => {
                //     if (!replyFormOpen){
                //         setReplyFormOpen(true);
                //         console.log("4. " + replyFormOpen);
                //         createReplyForm(replyListItem);
                //     }
                // });

                replyButton.addEventListener("click", () => {
                    setReplyFormOpen((prevOpen) => {
                        if (!prevOpen) {
                            createReplyForm(replyListItem);
                            return true;
                        }
                        return prevOpen;
                    });
                });
                setReplyFormOpen(false);
                
            }
        });
        replyInput.value = "";

    }
    


    const submitHandler = (event)=>{
        event.preventDefault();
        const commentInput = document.getElementById("commentInput");
        const commentValue = commentInput.value;

        if(commentValue.length > 0){
            const listItem = document.createElement("li");
            listItem.textContent = commentValue
            const style = {"border": "none", "margin": "5px"}
            const replyButton = document.createElement("button");
            replyButton.textContent = "Reply";
            Object.assign(replyButton.style, style);
            listItem.appendChild(replyButton);
        
            replyButton.addEventListener("click", () => {
                setReplyFormOpen((prevOpen) => {
                    if (!prevOpen) {
                        createReplyForm(listItem);
                        return true;
                    }
                    return prevOpen;
                });
            });
            
            
            document.getElementById("main-comments").appendChild(listItem);
            setReplies([...replies, listItem.textContent]);
            commentInput.value="";
        } 
    }




    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" id="commentInput" placeholder="Enter your comment here."/>
                <input type="submit" value="Comment"/>
            </form>
            <div id="commentSection">
                <h3>Comments</h3>
                <ul style={{"listStyleType" : "none"}} id="main-comments">
                </ul> 
            </div>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />);