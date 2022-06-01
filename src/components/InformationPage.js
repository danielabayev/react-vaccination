import React, {useState, useEffect} from 'react';
import './tabledata.css';

export default function InformationPage() {
    const [data, setData] = useState([])
    const [city,setCity] = useState(false);
    const [birth,setBirth] = useState(false);
    const [citySearch,setCitySearch] = useState("");
    const [birthSearch,setBirthSearch] = useState("");

    const URL = 'http://localhost:8000/Human';

    const handleSearch = (event) => {
        setBirth(false);
        setCity(false);
    };

    const handleSearchBirth = (event) => {
        setBirthSearch(event.target.value);
        setBirth(true);
        setCity(false);
    };

    const handleSearchCity = (event) => {
        setCitySearch(event.target.value);
        setBirth(false);
        setCity(true);
    };

    const checkSearch = (item) => {
        if (birthSearch === "" && citySearch === "")
            return true;
        if (birth)
            return checkBirth(item);
        if (city)
            return checkCity(item);
        return true;
    }

    const checkCity = (item) => {
        return item.City === citySearch
    }

    const checkBirth = (item) => {
        return item.dateOfBirth === birthSearch;
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                setData(response);
            })

    }

    return (
        <>
            <tbody>
            <tr>
                <th>patient Id</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>dateOfBirth</th>
                <th>address</th>
                <th>City</th>
                <th>zipCode</th>
                <th>landLine</th>
                <th>cellularPhone</th>
                <th>infected</th>
                <th>conditions</th>
            </tr>
            {data.filter(item => checkSearch(item)).map(item => (
                <tr key={item.HumanId}>
                    <td>{item.HumanId}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.address}</td>
                    <td>{item.City}</td>
                    <td>{item.zipCode}</td>
                    <td>{item.landLine}</td>
                    <td>{item.cellularPhone}</td>
                    <td>{item.infected}</td>
                    <td>{item.conditions}</td>
                </tr>
            ))}
            </tbody>

            <label htmlFor="searchBirth">
                Search by birth:
                <input id="searchBirth" type="text" onChange={handleSearchBirth}/>
            </label>
            <label htmlFor="searchCity">
                Search by city:
                <input id="searchCity" type="text" onChange={handleSearchCity}/>
            </label>
            <label htmlFor="search">
                <button id="search" onClick={handleSearch}>search with no filter</button>
            </label>
        </>
    );
}