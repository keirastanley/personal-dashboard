import {Link} from "react-router-dom"

export default function PageNotFound(){
    return <div id="error-page">
                <h1>404: Page Not Found</h1>
        <p>Sorry, we can't find that page.</p>
        <p><Link to={`/personal-dashboard`}>Go back home</Link></p>
    </div>

}