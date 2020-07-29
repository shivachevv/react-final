import React, { Component, createContext } from "react";
import { auth } from "./firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth });
        });
    };

    render() {
        const isAuth = this.state.user ? this.state.user : ''
        return (
            <UserContext.Provider value={isAuth}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
export default UserProvider;