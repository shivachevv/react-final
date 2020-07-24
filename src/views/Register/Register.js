import React, { Component } from 'react';
import styles from './register.module.scss'
import Input from '../../components/Input/Input'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: '',
            errors: {
                email: false,
                password: false,
                rePassword: false
            },
            errMsgs:{
                email:'Email not valid!',
                password:'Password should be more than 3 characters!',
                rePassword:'Passwords do not match!'
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
        },
        rePassword: v => {
            return this.setState({
                rePassword: v
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
        },
        rePassword: v => {
            if (v !== this.state.password) {
                this.editErrors('rePassword', true)
            } else {
                this.editErrors('rePassword', false)
            }
        }
    }


    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state);
    }

    render() {
        const {
            email,
            password,
            rePassword
        } = this.state

        return (
            <div className={styles.container}>
                <form className={[styles.form, 'sha'].join(' ')} onSubmit={this.handleSubmit}>
                    <h1 className="up">Befome a part of FFL!</h1>

                    {this.state.errors.email ? (<h3 className={styles.error}>{this.state.errMsgs.email}</h3>) : ''}
                    {this.state.errors.password ? (<h3 className={styles.error}>{this.state.errMsgs.password}</h3>) : ''}
                    {this.state.errors.rePassword ? (<h3 className={styles.error}>{this.state.errMsgs.rePassword}</h3>) : ''}

                    <Input id="email" label="Email" onChange={this.changeHandlers.email} value={email} onBlur={this.blurHandlers.email}></Input>
                    <Input id="password" label="Password" onChange={this.changeHandlers.password} value={password} onBlur={this.blurHandlers.password}></Input>
                    <Input id="rePassword" label="Repeat Password" onChange={this.changeHandlers.rePassword} value={rePassword} onBlur={this.blurHandlers.rePassword}></Input>

                    <button type="submit" className="up">Register</button>
                </form>
            </div>
        );
    }
}



export default Register;