import React from "react";
import '../StartACampaign.css';


const Contents = ({ faqList, setfaqList, values, handleChange }) => {

    const handleFAQ = (e, index) => {
        const { name, value } = e.target;
        const list = [...faqList];
        list[index][name] = value;
        setfaqList(list);
    };

    const handleRemoveInput = index => {
        const list = [...faqList];
        list.splice(index, 1);
        setfaqList(list);
    };

    const handleAddInput = () => {
        setfaqList([...faqList, { question: "", answer: "" }]);
    };

    return (
        <div>
            <fieldset>
                <div className="form-card">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="fs-title">Contents:</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="steps">Step 2/3</h2>
                        </div>
                    </div>
                    <label className="fieldlabels">Story: *</label>
                    <textarea
                        className="form-control"
                        id="story"
                        type="text"
                        style={{ "height": "200px" }}
                        name="story"
                        value={values.story}
                        onChange={handleChange("story")}

                    />
                    <div>
                        <label className="fieldlabels">FAQ</label>
                        {faqList.map((item, i) => {
                            return (

                                <div key={i}>
                                    <input type="text" name="question" placeholder="Question" value={item.question} onChange={e => handleFAQ(e, i)} />
                                    <input type="text" name="answer" placeholder="Answer" value={item.answer} onChange={e => handleFAQ(e, i)} />
                                    {faqList.length - 1 === i && <input className="btn action-button" type="button" value="+Add" onClick={handleAddInput} />}
                                    {faqList.length !== 1 && <input className="btn action-button-previous" type="button" value="Remove" onClick={() => handleRemoveInput(i)} />}
                                </div>
                            )

                        })}


                    </div>

                </div>

            </fieldset>
        </div>


    )
};

export default Contents;
