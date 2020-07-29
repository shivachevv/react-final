import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import fb from '../../images/fb.png'
import styles from './footer.module.scss'
import defineLinks from '../../NavLinksProvider'
import { UserContext } from '../../UserProvider'

function Footer(props) {
    const user = useContext(UserContext)

    return (
        <footer>
            <div className={styles.footerside}>
                <img src={logo} alt=""></img>
                <Link className="up" to="/">fantasy legends</Link>
            </div>

            <div className={styles.footercat}>
                <h2 className="up">Categories</h2>
                {defineLinks(user).map(link => {
                    return <Link key={link.path} to={link.path}>{link.label}</Link>
                })}
            </div>
            <div className={styles.footerside}>
                <a className="up" href="https://www.facebook.com/groups/393007311341533/?ref=group_header" target="blank">Follow the legends</a>
                <a href="https://www.facebook.com/groups/393007311341533/?ref=group_header" target="blank">
                    <img src={fb} alt=""></img>
                </a>
            </div>
        </footer>
    );
}

export default Footer;