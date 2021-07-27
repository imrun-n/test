import React, { useEffect, useState } from 'react';
import './StartACampaign.css'
import BasicStep from './Steps/BasicStep';
import Contents from './Steps/Contents';
import Funding from './Steps/Funding';
import { NavLink, useHistory } from 'react-router-dom';
//import { Route } from 'react-router';

const StartACampaign = () => {

    const history = useHistory();
    const [values, setValues] = useState({
        ctitle: "",
        category: "",
        ctagline: "",
        location: "",
        tags: "",
        duration: "",
        story: "",
        amount: "",
        rnumber: "",
        anumber: "",
        re_anumber: "",
        raisedamount: "0"

    });

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const [faqList, setfaqList] = useState([
        { question: "", answer: "" }

    ]);
    const [step, setStep] = useState(1);

    const callLoginPage = async () => {

        try {
            const res = await fetch('/checklogin', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });

            if (res.status === 401) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }

    }

    // const postDetails=() =>{
    //    try{
    //     const imageData = new FormData()
    //     imageData.append("file", image)
    //     imageData.append("upload_preset", "crowdfunding")
    //     imageData.append("cloud_name", "tumpa")
    //     const res=await fetch("https://api.cloudinary.com/v1_1/tumpa/image/upload", {
    //         method:"POST",
    //         body:imageData
    //     });
    //    imageData = await res.json();
    //    console.log(imageData);

    //    }
    //    catch(err){
    //        console.log(err);

    //    }

    // }
    const postDetails = () => {
        const imageData = new FormData()
        imageData.append("file", image)
        imageData.append("upload_preset", "crowdfunding")
        imageData.append("cloud_name", "tumpa")
        fetch("https://api.cloudinary.com/v1_1/tumpa/image/upload", {
            method: "post",
            body: imageData
        })
            .then(res => res.json())
            .then(imageData => {
                setUrl(imageData.url);
            })
            .catch(err => {
                console.log(err);
            })

    }
    const PostData = async () => {
        //e.preventDefault();
        try {

            const { ctitle, category, ctagline, location, tags, duration, story, amount, rnumber, anumber, re_anumber, raisedamount } = values;
            const startdate = new Date();
            const expiredate = new Date();


            expiredate.setDate(startdate.getDate() + parseInt(duration));

            const res = await fetch("/createproject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ctitle, category, ctagline, location, tags, duration, story, amount, raisedamount: amount, rnumber, anumber, re_anumber, faqList, startdate, expiredate, url


                })


            });
            const data = await res.json();

            if (res.status === 201) {
                window.alert("Project created");
                console.log("Project created");
                history.push("/");

            } else if (res.status === 401) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                window.alert(data.error);
                console.log("project is not created");
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }


    }





    const nextStep = () => {
        if (step === 1) {
            if (values.ctitle && values.category && values.ctagline && values.location && values.tags && values.duration) {
                postDetails();
                setStep(step + 1);
            }
            else {
                window.alert("Please fill up the fields!");
            }

        } else if (step === 2) {
            if (values.story && faqList[0].question && faqList[0].answer) {
                setStep(step + 1);
            }
            else {
                window.alert("Please fill up the fields!");
            }

        }
        else if (step === 3) {
            if (values.amount && values.rnumber && values.anumber && values.re_anumber) {
                if (values.anumber === values.re_anumber) {
                    // console.log(values);
                    // console.log(faqList);
                    PostData();
                }
                else {
                    window.alert("Account number did not match!");
                }


            }
            else {
                window.alert("Please fill up the fields!");
            }

        }
    };
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };




    const props = { faqList, setfaqList, values, setValues, image, setImage, handleChange }


    useEffect(() => {
        callLoginPage();

    }, []);




    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-13 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                    <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                        <h2 id="heading">Get Started!</h2>
                        <p>Fill all form field to go to the next step</p>

                        <div className="bg-light vh-200" id="msform" >
                            <div className="container d-flex justify-content-center align-items-center">
                                <div className="card p-3 w-300 mt-5">
                                    {
                                        {
                                            1: <BasicStep {...props} />,
                                            2: <Contents {...props} />,
                                            3: <Funding handleChange={handleChange} values={values} />,

                                        }[step]
                                    }
                                    <div className="d-flex justify-content-around px-5 mt-5">
                                        {step > 1 ? (
                                            <button className="action-button-previous btn-warning" onClick={prevStep}>
                                                Back
                                            </button>
                                        ) : null}
                                        <button className="action-button btn-warning" onClick={nextStep}>
                                            {step === 3 ? "Submit" : "Next"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartACampaign;