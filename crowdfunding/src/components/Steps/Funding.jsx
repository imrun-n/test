import React from "react";
import '../StartACampaign.css';


const Funding = (props) => {
    return (
        <div>
            <fieldset>
                <div className="form-card">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="fs-title">Funding Information:</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="steps">Step 3/3</h2>
                        </div>
                    </div>
                    <label className="fieldlabels">Campaign Goal Amount: *</label>
                    <input type="number" name="amount" placeholder="Goal Amount" value={props.values.amount} onChange={props.handleChange("amount")} />

                    <div>
                        <label className="fieldlabels" style={{ "fontSize": "20px" }}>Bank Information *</label>
                        <br />
                        <label className="fieldlabels">Routing Number: *</label>
                        <input type="number" name="rnumber" placeholder="Bank Routing Number" value={props.values.rnumber} onChange={props.handleChange("rnumber")} />
                        <label className="fieldlabels">Account Number: *</label>
                        <input type="number" name="anumber" placeholder="Bank Account Number" value={props.values.anumber} onChange={props.handleChange("anumber")} />
                        <input type="number" name="re_anumber" placeholder="Re-type Account Number" value={props.values.re_anumber} onChange={props.handleChange("re_anumber")} />
                    </div>

                </div>

            </fieldset>
        </div>


    )
};

export default Funding;