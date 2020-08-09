import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './register.module.scss'
import Input from '../../components/Input/Input'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn'
import { auth } from '../../firebase'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            password: '',
            rePassword: '',
            errors: {
                email: false,
                password: false,
                rePassword: false,
                apiErr: false
            },
            errMsgs: {
                email: 'Email not valid!',
                password: 'Password should be more than 3 characters!',
                rePassword: 'Passwords do not match!',
                apiErr: ''
            }
        }
    }

    componentDidMount = () => {

    };

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
        },
        rePassword: v => {
            if (v !== this.state.password) {
                this.editErrors('rePassword', true)
            } else {
                this.editErrors('rePassword', false)
            }
        }
    }


    handleRegister = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
                console.log('Successfull Register');
                this.props.history.push('/create-team')
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
            rePassword
        } = this.state

        const emailErr = this.state.errors.email
        const passErr = this.state.errors.password
        const rePassErr = this.state.errors.rePassword
        const apiErr = this.state.errors.apiErr

        return (
            <div className={styles.container}>
                <form className={[styles.form, 'sha'].join(' ')} onSubmit={this.handleRegister}>
                    <h1 className="up">Befome a part of FFL!</h1>

                    {emailErr ? (<h3 className={styles.error}>{this.state.errMsgs.email}</h3>) : ''}
                    {passErr ? (<h3 className={styles.error}>{this.state.errMsgs.password}</h3>) : ''}
                    {rePassErr ? (<h3 className={styles.error}>{this.state.errMsgs.rePassword}</h3>) : ''}
                    {apiErr ? (<h3 className={styles.error}>{this.state.errMsgs.apiErr}</h3>) : ''}

                    <Input error={emailErr ? 'error' : ''} id="email" label="Email" onChange={this.changeHandlers.email} value={email} onBlur={this.blurHandlers.email}></Input>
                    <Input error={passErr ? 'error' : ''} id="password" label="Password" onChange={this.changeHandlers.password} value={password} onBlur={this.blurHandlers.password}></Input>
                    <Input error={rePassErr ? 'error' : ''} id="rePassword" label="Repeat Password" onChange={this.changeHandlers.rePassword} value={rePassword} onBlur={this.blurHandlers.rePassword}></Input>

                    <SubmitBtn title="Register" />
                </form>
            </div>
        );
    }
}



export default withRouter(Register);