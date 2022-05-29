import axios from "axios";
import {useState} from "react";

/**
 * the home page component.
 * @param props: all the attribute:
 *              locationList - the location list.
 * @returns {JSX.Element} - the home page html.
 */
export default function Home(props) {
    /**
     * function to define the checked location.
     * @param event - the location name from the click.
     */
    const handleChange = event => {
        setChecked(event.target.value);
    }

    const checkValidation = event => {
        event.preventDefault();
    }

    /**
     * function to fetch the data from the server.
     * @param event - the submit event from the list.
     * @returns {Promise<void>} - the data from the server.
     */
    const fetchData = async event => {
        const data = props.locationList.find((location) => {
            return location.name === checked
        });
        setLoading(true);
        const url = `https://www.7timer.info/bin/api.pl?lon=${data.longitude}&lat=${data.latitude}&product=civillight&output=json`;
        try {
            setProblemInServer(false);
            const result = await axios(url);
            setLocationData(result.data.dataseries);
            setImageUrl(`https://www.7timer.info/bin/astro.php?%20lon=${data.longitude}&lat=${data.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`)
        } catch (error) {
            setProblemInServer(true);
            console.log(error)
        }
        setLoading(false);
    }

    const [checked, setChecked] = useState(null);
    const [locationData, setLocationData] = useState('');
    const [imgUrl, setImageUrl] = useState('');
    const [Loading, setLoading] = useState(false);
    const [problemInServer, setProblemInServer] = useState(false);

    return (
        <div className="row">
            {
                <div className="col-12 col-md-8">
                    {problemInServer ? ("") : (
                        <div>
                            <form onSubmit={checkValidation}>
                                <div className="form-group">
                                    <label htmlFor="FirstName">First name:</label>
                                    <input type="text" className="form-control" id="FirstName" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LastName">Last name</label>
                                    <input type="text" className="form-control" id="LastName" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="DateOfBirth">Date of birth (in dd/mm/yyyy format)</label>
                                    <input type="text" className="form-control" id="DateOfBirth" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Address">Address</label>
                                    <input type="text" className="form-control" id="Address" required/>
                                </div>
                                <select className="form-select my-3" aria-label="Default select example">
                                    <option selected>choose your city</option>
                                    <option value="1">Vasco Da Gama</option>
                                    <option value="2">Gangtok</option>
                                    <option value="3">Aurangabad</option>
                                    <option value="4">Jehanabad</option>
                                    <option value="5">Tezpur</option>
                                    <option value="6">Buxar</option>
                                    <option value="7">Amaravati</option>
                                    <option value="8">Tadepalligudem</option>
                                    <option value="9">Kavali</option>
                                    <option value="10">Ballia</option>
                                </select>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="Zip"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LandLine">Land line</label>
                                    <input type="text" className="form-control" id="LandLine" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="CellularPhone">Cellular phone</label>
                                    <input type="text" className="form-control" id="CellularPhone" required/>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>have you infected by covid 19?</label>
                                </div>

                                <h6>previous conditions:</h6>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Diabetes</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Cardio-Vascular problems</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Allergies</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="other">other</label>
                                    <input type="text" className="form-control" id="other"/>
                                </div>


                                <button type="submit" className="btn btn-primary my-2">Submit</button>
                            </form>
                        </div>
                    )}
                </div>
            }
            {problemInServer ? (<h1>The was a problem connecting the server, please try again later.</h1>) : ("")}
        </div>
    );
}