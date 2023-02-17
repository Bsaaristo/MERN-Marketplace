import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'
import { TiSortAlphabetically } from 'react-icons/ti';

function CategoriesNav() {
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <Link to="/categories/all">
                <Button variant="dark" id="all"><TiSortAlphabetically />All</Button>{' '}
            </Link>
            <Link to="/categories/home">
                <Button variant="dark" id="home">Home</Button>{' '}
            </Link>
            <Link to="/categories/microgreens">
                <Button variant="dark" id="microgreens">Microgreens</Button>{' '}
            </Link>
            <Link to="/categories/farm">
                <Button variant="dark" id="farm">Farm</Button>{' '}
            </Link>
            <Link to="/categories/garden">
                <Button variant="dark" id="garden">Garden</Button>{' '}
            </Link>
        </div>
    )
}

export default CategoriesNav;