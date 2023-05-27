//form.tsx is a component that sets a form with questions passed in as props and allows the user to answer them

import { useState } from "react";


//form is a function that takes in props and returns a step by step form with questions passed in as props
export default function Form(props: any) {
//builds a backend for the frontend form
const [formState, setFormState] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
    address: "",
    verification_string: "verified",
});


//saves to the planetscale database using users interface
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formData = Object.fromEntries(data.entries());
        console.log(formData);
        const req = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(formData),
        });
        const res = await req.json();
        console.log(res);
    };


    //form is a function that takes in props and returns a step by step form with questions passed in as props
    return (
        <div className="form">
            <div className="form-title">
                <h1>{props.title}</h1>
            </div>
            <div className="form-body">
                <form>
                    <div className="form-questions">
                        {props.questions.map((question: any) => (
                            <div className="form-question">
                                <label htmlFor={question.name}>{question.label}</label>
                                <input type={question.type} name={question.name} id={question.name} placeholder={question.placeholder} />
                            </div>
                        ))}
                    </div>
                    <div className="form-but`tons">
                        <button className="form-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );

};