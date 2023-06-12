import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src="https://uploads-ssl.webflow.com/636c1da7b9e42c43e229900c/636c1da7b9e42caa79299017_header-logo.svg" loading="lazy" alt="Photon Logo"/>
                <div>People App</div>
            </Link>
        </header>
    );
}

export default Header;