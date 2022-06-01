import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * the home page component.
 * @param props: all the attribute:
 *
 * @returns {JSX.Element} - the home page html.
 */
export default function Home(props) {
    /**
     * function to fetch the data from the server.
     * @param event - the submit event from the list.
     * @returns {Promise<void>} - the data from the server.
     */
    const fetchData = async event => {
        let conditions = ""
        // let condition = conditions
        if (Allergies)
            conditions += 'Allergies'
        if (CardioVascular){
            if (condition!="")
                conditions += ', '
            conditions += 'CardioVascular'
        }
        if (Diabetes){
            if (condition!="")
                conditions += ', '
            conditions += 'Diabetes'
        }
        if (conditions!="" && condition != '') {
            conditions += ', '
            conditions += condition
        }
        const sendData = {
            firstName, lastName, dateOfBirth, address, City, zipCode, landLine, cellularPhone, infected, conditions
        }
        try {
            await axios.post('http://localhost:8000/Human', sendData);
            setInfoAdd("The patient added, add another one or move the information page.")
        } catch (e) {
            console.log(e.response.data.message);
            setInfoAdd("There was some problem add the patient, please try again.")
        }
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [City, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [landLine, setLandLine] = useState("");
    const [cellularPhone, setCellularPhone] = useState("");
    const [infected, setInfected] = useState(false);
    const [condition, setCondition] = useState("");
    const [InfoAdd, setInfoAdd] = useState("");
    const [Diabetes,setDiabetes] = useState(false);
    const [CardioVascular,setCardioVascular] = useState(false);
    const [Allergies,setAllergies] = useState(false);

    return (
        <div className="row">
            {
                <div className="col-12 col-md-8">
                        <div>
                            <form onSubmit={fetchData}>
                                <div className="form-group">
                                    <label htmlFor="FirstName">First name:</label>
                                    <input type="text"
                                           className="form-control"
                                           id="FirstName"
                                           onChange={e => setFirstName(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LastName">Last name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="LastName"
                                           onChange={e => setLastName(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group col-md-3 mb-3">
                                    <label htmlFor="DateOfBirth">Date of birth (in dd/mm/yyyy format)</label>
                                    <input type="date"
                                           className="form-control"
                                           id="DateOfBirth"
                                           onChange={e => setDateOfBirth(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Address">Address</label>
                                    <input type="text"
                                           className="form-control"
                                           id="Address"
                                           onChange={e => setAddress(e.target.value)}
                                           required/>
                                </div>
                                <select className="form-select my-3"
                                        aria-label="Default select example"
                                        onChange={e => setCity(e.target.value)}>
                                    <option selected>choose your city</option>
                                    <option value="Vasco Da Gama">Vasco Da Gama</option>
                                    <option value="Gangtok">Gangtok</option>
                                    <option value="Aurangabad">Aurangabad</option>
                                    <option value="Jehanabad">Jehanabad</option>
                                    <option value="Tezpur">Tezpur</option>
                                    <option value="Buxar">Buxar</option>
                                    <option value="Amaravati">Amaravati</option>
                                    <option value="Tadepalligudem">Tadepalligudem</option>
                                    <option value="Kavali">Kavali</option>
                                    <option value="Ballia">Ballia</option>
                                </select>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text"
                                           className="form-control"
                                           id="zip"
                                           onChange={e => setZipCode(e.target.value)}
                                           placeholder="Zip"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LandLine">Land line</label>
                                    <input type="text"
                                           className="form-control"
                                           id="LandLine"
                                           onChange={e => setLandLine(e.target.value)}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="CellularPhone">Cellular phone</label>
                                    <input type="text"
                                           className="form-control"
                                           id="CellularPhone"
                                           onChange={e => setCellularPhone(e.target.value)}
                                           required/>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox"
                                                  value=""
                                                  onChange={e => setInfected(!infected)}
                                    />have you infected by covid 19?</label>
                                </div>

                                <h6>previous conditions:</h6>
                                <div className="checkbox">
                                    <label><input type="checkbox"
                                                  value=""
                                                  onChange={e => setDiabetes(!Diabetes)}
                                    />Diabetes</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox"
                                                  value=""
                                                  onChange={e => setCardioVascular(!CardioVascular)}
                                    />Cardio-Vascular problems</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox"
                                                  value=""
                                                  onChange={e => setAllergies(!Allergies)}
                                    />Allergies</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="other">other</label>
                                    <input type="text"
                                           className="form-control"
                                           id="other"
                                           onChange={e => setCondition(e.target.value)}/>
                                </div>

                                <button type="submit" className="btn btn-primary my-2">Submit</button>
                            </form>
                        </div>
                </div>
            }
            {InfoAdd}
        </div>
    );
}