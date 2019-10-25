import React, { Component } from 'react';
import './Registration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter } from "react-router-dom"

export class Registration extends Component {


  state = {
    accountName: "",
    emailAddress: "",
    phoneNumber: "",
    dob: "",
    ageValid: "",
    zipCode: "",
    password: "",
    passwordConfrm: "",
    passwordValid: "",
    userId: 11,
    redirectMain: false
  }
  constructor(props) {
    super(props)


    this.state = {
      accountName: "",
      emailAddress: "",
      phoneNumber: "",
      dob: "",
      ageValid: "",
      zipCode: "",
      password: "",
      passwordConfrm: "",
      passwordValid: "",
      userId: 11,
      redirectMain: false
    }

    this.change = this.change.bind(this)
    this.ageValidation = this.ageValidation.bind(this)
    this.passwordValidation = this.passwordValidation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  ageValidation = async () => {
    let dob = this.state.dob
    dob = dob.replace(/\D/g, '');              //convert to string and strip of the '-'
    var birthYear = Number(dob.substring(0, 4));
    var birthMonth = Number(dob.substring(4, 6)) - 1;
    var birthDay = Number(dob.substring(6));
    var current = new Date();
    var currentYear = current.getFullYear();
    var currentMonth = current.getMonth();
    var currentDay = current.getDate();
    var age = currentYear - birthYear;
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
    if (age < 18) {
      this.setState({ ageValid: false })
    } else {
      this.setState({ ageValid: true })
    }
  }

  passwordValidation = e => {
    let password = document.getElementById("password");
    let passwordConfrm = document.getElementById("passwordConfrm");

    if (password.value === passwordConfrm.value) {
      this.setState({ passwordValid: true })
    } else {
      this.setState({ passwordValid: false })
    }

  }

  cancelForm = () => {
    this.setState({
      accountName: "",
      emailAddress: "",
      phoneNumber: "",
      dob: "",
      ageValid: "",
      zipCode: "",
      password: "",
      passwordConfrm: "",
      passwordValid: ""
    })
  }

  // handleSubmit = e => {

  //   e.preventDefault();
  //   //this.cancelForm()
  // }

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  // handleSubmit = (e) => {
  handleSubmit = (e) => {
    // e.preventDefault();
    //this.setState({ ageValid: true })
    //return;
    this.ageValidation()
    this.passwordValidation()
    // this.setState({ageValid:true}, () => console.log(this.state.ageValid))
    // this.setState({ ageValid: true })

    console.log(this.state.ageValid)
    console.log(this.state.passwordValid)
    let dobMsg = document.getElementById("dobMsg")
    let passwordMsg = document.getElementById("passwordMsg")
    if (this.state.ageValid === false) {

      dobMsg.style = "display: inline"
      dobMsg.innerHTML = "Only people who are 18 years old or older can register."
    } else {
      dobMsg.style = "display: None"
    }

    if (this.state.passwordValid === false) {
      passwordMsg.style = "display: inline"
      passwordMsg.innerHTML = "password does not match!"
    } else {
      passwordMsg.style = "display: None"
    }
    console.log("in handleClick!!!!!!!!!!")
    if (this.state.ageValid == true && this.state.passwordValid == true) {
      localStorage.setItem("userId", this.state.userId)
      this.setState({ redirectMain: true })
      console.log("in inner!!!!!!!!!!")
    }

  }


  render() {
    return (
      <div className="registration">
        <h1>Register</h1>
        {this.state.redirectMain && <Redirect to='/Main' push />}
        {/* <form className="registrationForm" onSubmit={this.handleSubmit}> */}
        <form className="registrationForm">

          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="row ml-5">
              <label>Account Name:</label>
              <input
                name="accountName"
                placeholder="enter account name"
                pattern="^[^0-9][a-zA-Z0-9]*$"
                value={this.state.accountName}
                onChange={this.change}
                title="upper or lower case letters and numbers, may not start with a number"
                required
              />
            </div>
            <div className="row ml-5 mt-2">
              <label>Email Address:</label>
              <input
                name="emailAddress"
                placeholder="enter email address"
                value={this.state.emailAddress}
                type="email"
                onChange={this.change}
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>phone Number:</label>
              <input
                name="phoneNumber"
                placeholder="enter phone number"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                value={this.state.phoneNumber}
                type="tel"
                onChange={this.change}
                title="The format should be xxxxxxxxxx"
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>Date of Birth:</label>
              <input
                name="dob"
                value={this.state.dob}
                type="date"
                onChange={this.change}
                required
              />
              <span id="dobMsg"></span>
            </div>


            <div className="row ml-5 mt-2">
              <label>Zipcode:</label>
              <input
                name="zipCode"
                placeholder="enter zip code"
                pattern="[0-9]{5}"
                value={this.state.zipCode}
                type="text"
                onChange={this.change}
                title="should be 5 digits"
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>Password:</label>
              <input
                name="password"
                id="password"
                placeholder="enter password"
                value={this.state.password}
                type="password"
                onChange={this.change}
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>re-enter:</label>
              <input
                name="passwordConfrm"
                id="passwordConfrm"
                placeholder="re-enter password"
                value={this.state.passwordConfrm}
                type="password"
                onChange={this.change}
                onKeyUp={this.passwordValidation}
                required
              />
              <span id="passwordMsg"></span>
            </div>


            <div className="button">
              <button type="submit" className="btn btn-primary btn-sm mt-2" onClick={this.handleSubmit}>Register</button>
              <button className="btn btn-primary btn-sm ml-1 mt-2" onClick={this.cancelForm}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Registration
