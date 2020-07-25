import React, { Component } from 'react';
import styles from './login.module.scss'
import Input from '../../components/Input/Input'
import {auth} from '../../firebase'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            email: '',
            password: '',
            errors: {
                email: false,
                password: false,
            },
            errMsgs: {
                email: 'Email not valid!',
                password: 'Password should be more than 3 characters!',
            }
        }
    }


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

    blurHandlers = {
        email: v => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
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


    handleSubmit = async e => {
        e.preventDefault()
        const {user} = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        console.log(user);
    }

    render() {
        const {
            email,
            password,
            rePassword
        } = this.state

        const emailErr = this.state.errors.email
        const passErr = this.state.errors.password
        const rePassErr = this.state.errors.rePassword

        return (
            <div className={styles.container}>
                <form className={[styles.form, 'sha'].join(' ')} onSubmit={this.handleSubmit}>
                    <h1 className="up">Befome a part of FFL!</h1>

                    {emailErr ? (<h3 className={styles.error}>{this.state.errMsgs.email}</h3>) : ''}
                    {passErr ? (<h3 className={styles.error}>{this.state.errMsgs.password}</h3>) : ''}
                    {rePassErr ? (<h3 className={styles.error}>{this.state.errMsgs.rePassword}</h3>) : ''}

                    <Input error={emailErr ? 'error' : ''} id="email" label="Email" onChange={this.changeHandlers.email} value={email} onBlur={this.blurHandlers.email}></Input>
                    <Input error={passErr ? 'error' : ''} id="password" label="Password" onChange={this.changeHandlers.password} value={password} onBlur={this.blurHandlers.password}></Input>
                    <Input error={rePassErr ? 'error' : ''} id="rePassword" label="Repeat Password" onChange={this.changeHandlers.rePassword} value={rePassword} onBlur={this.blurHandlers.rePassword}></Input>

                    <button type="submit" className="up">Login</button>
                </form>
            </div>
        );
    }
}



export default Login;