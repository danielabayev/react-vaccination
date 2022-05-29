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
                                <div className="form-group col-11 my-2">
                                    <label htmlFor="InputLocationName">Location name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="InputLocationName"
                                           placeholder="Enter location name">
                                    </input>
                                </div>
                                <div className="form-group col-11 my-2">
                                    <label htmlFor="InputLatitude">latitude</label>
                                    <input type="text"
                                           className="form-control"
                                           id="InputLatitude"
                                           placeholder="Enter latitude">
                                    </input>
                                </div>
                                <div className="form-group col-11 my-2">
                                    <label htmlFor="InputLongitude">Longitude</label>
                                    <input type="text"
                                           className="form-control"
                                           id="InputLongitude"
                                           placeholder="Enter longitude">
                                    </input>
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