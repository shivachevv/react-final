import React, { Component } from 'react';
import styles from './login.module.scss'
import Input from '../../components/Input/Input'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn'
import { auth } from '../../firebase'
import { UserContext } from '../../UserProvider'
import { withRouter } from 'react-router-dom'
import changePageTitle from '../../utils/changePageTitle'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            password: '',
            errors: {
                email: false,
                password: false,
                apiErr: false,
            },
            errMsgs: {
                email: 'Email not valid!',
                password: 'Password should be more than 3 characters!',
                apiErr: '',
            }
        }
    }

    componentWillMount(){
        changePageTitle("Login!")
    }

    static contextType = UserContext

    changeHandlers = {
        email: v => {
            return this.setState({
                email: v
            })
        },
        password: v => {
            return this.setState({
                password: v
            })
        }
    }

    editErrors = (err, val) => {
        const newErrors = this.state.errors
        newErrors[err] = val
        this.setState({ errors: newErrors })
    }
    editErrorMsgs = (err, val) => {
        const newErrors = this.state.errMsgs
        newErrors[err] = val
        this.setState({ errMsgs: newErrors })
    }

    blurHandlers = {
        email: v => {
            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (!v.match(emailRegex)) {
                this.editErrors('email', true)
            } else {
                this.editErrors('email', false)
            }
        },
        password: v => {
            if (v.length < 3) {
                this.editErrors('password', true)
            } else {
                this.editErrors('password', false)
            }
        }
    }


    handleLogin = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
                this.props.history.push('/')
            })
            .catch(err => {
                this.editErrors('apiErr', true)
                this.editErrorMsgs('apiErr', err.message)
            })
    }

    render() {
        const {
            email,
            password,
        } = this.state


        const emailErr = this.state.errors.email
        const passErr = this.state.errors.password
        const apiErr = this.state.errors.apiErr

        return (
            <div className={styles.container}>
                <form className={[styles.form, 'sha'].join(' ')} onSubmit={this.handleLogin}>
                    <h1 className="up">Login to FFL!</h1>

                    {emailErr ? (<h3 className={styles.error}>{this.state.errMsgs.email}</h3>) : ''}
                    {passErr ? (<h3 className={styles.error}>{this.state.errMsgs.password}</h3>) : ''}
                    {apiErr ? (<h3 className={styles.error}>{this.state.errMsgs.apiErr}</h3>) : ''}
                    <Input error={emailErr ? 'error' : ''} id="email" label="Email" onChange={this.changeHandlers.email} value={email} onBlur={this.blurHandlers.email}></Input>
                    <Input error={passErr ? 'error' : ''} type="password" id="password" label="Password" onChange={this.changeHandlers.password} value={password} onBlur={this.blurHandlers.password}></Input>

                    <SubmitBtn title="Login" />
                </form>

            </div>
        );
    }
}



export default withRouter(Login);