import React from "react";
import '../StartACampaign.css';


const BasicStep = ({ values, setValues, image, setImage, handleChange }) => {
    return (
        <div>
            <fieldset>
                <div className="form-card">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="fs-title">Basic Information:</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="steps">Step 1/3</h2>
                        </div>
                    </div> <label className="fieldlabels">Campaign Title: *</label>
                    <input type="text" name="ctitle" placeholder="Campaign Title" value={values.ctitle} onChange={handleChange("ctitle")} />
                    <label className="fieldlabels">Category: *</label>
                    <select className="form-select" aria-label="Default select example" name="category" value={values.category} onChange={handleChange("category")}>
                        <option>Select a category</option>
                        <option value="Education">Education</option>
                        <option value="Innovative products">Innovative products</option>
                        <option value="Wellness">Wellness</option>
                    </select>
                    <label className="fieldlabels">Campaign Tagline: *</label>
                    <input type="text" name="ctagline" placeholder="Short Description" value={values.ctagline} onChange={handleChange("ctagline")} maxLength="20" />
                    <label className="fieldlabels">Location: *</label>
                    <input type="text" name="location" placeholder="Country Name" value={values.location} onChange={handleChange("location")} />
                    <label className="fieldlabels">Tags: *</label>
                    <input type="text" name="tags" placeholder="Tags" value={values.tags} onChange={handleChange("tags")} />
                    <label className="fieldlabels">Campaign Duration: *</label>
                    <input type="number" name="duration" placeholder="Campaign Duration" value={values.duration} onChange={handleChange("duration")} />
                    <label className="fieldlabels">Campaign Image: *</label>
                    <input type="file" placeholder="Campaign image" onChange={(e) => setImage(e.target.files[0])} />
                </div>

            </fieldset>
        </div>


    )
};

export default BasicStep;