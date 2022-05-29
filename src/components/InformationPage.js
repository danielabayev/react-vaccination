/**
 * the component to the location page.
 * @param props: all the attribute:
 *              locationList - the location list.
 *              onDelete - the function to delete location.
 *              onAdd - the function to add location.
 * @returns {JSX.Element} - the location page html.
 */
export default function InformationPage(props) {
    return( <div className="row">
            <div className="col-12 col-md-4">
                <h1>Add Location:</h1>
                <LocationForm onAdd={props.onAdd}
                              locationList={props.locationList}/>
            </div>
            <div className="col-12 col-md-8">
                <LocationList locationList={props.locationList} onDelete={props.onDelete}/>
            </div>
        </div>
    );
}