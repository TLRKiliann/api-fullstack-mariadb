import React, { Component } from "react";
import {app} from "../api/axiosconfig";
import '../StylesComponents/SignUp.scss';
import signupServices from '../Services/signupServices';
//import { DataType } from '../Models/model';


class SignUp extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    complete: false,
    isNotLoad: true,
    datas: []
  };

  componentDidMount() {
    signupServices
      .getAllSignUp()
      .then(initialNote => {
        this.setState({datas: initialNote});
      })
  };

  nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({name: e.target.value});
  };

  emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({email: e.target.value});
  };

  passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({password: e.target.value});
  };

  generateId = () => {
    const maxId = this.state.datas.length > 0
      ? Math.max(...this.state.datas.map((data:any) => data?.id)) : 0
    return maxId + 1;
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const registered = {
      id: this.generateId(),
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    try {
      const request = await app.post('/signup', JSON.stringify(registered), 
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      )
      console.log(request)
      if (request.data) {
        console.log("Response:", request.data)
      }
    } catch (err: any) {
      console.error("Error response PUT-1:");
      console.error("erd", err.response.data);    // ***
      console.error("ers", err.response.status);  // ***
      console.error("erh", err.response.headers); // ***
      throw err;
    }
    this.setState({
      id: "",
      name:"",
      email:"",
      password:"",
      complete: true,
      isNotLoad: false
    })
  };

  render() {
    console.log(this.state.datas)
    return (
      <div className="div--signup">

        <form className="form--signup" onSubmit={(e) => this.handleSubmit(e)}>

          <h1 className="title--signup">Sign Up</h1>

          <input type="text" className="input--logsign" value={this.state.name}
              placeholder="name" onChange={(e) => this.nameChange(e)} />

          <input type="email" className="input--logsign" value={this.state.email}
              placeholder="e-mail" onChange={(e) => this.emailChange(e)} />

          <input type="password" className="input--logsign" value={this.state.password}
              placeholder="password" onChange={(e) => this.passwordChange(e)} />

          <button type="submit" className="btn--submit">
            Sign Up
          </button>

          {this.state.complete ? (
            <span className="signup--done">SignUp Done !</span>
            ) : !this.state.isNotLoad  ? (
            <span className="signup--failed">SignUp failed !</span>
            ) : (
            <span>SignUp please !</span>
            )
          }

        </form>

        <div style={{color: 'lightgreen'}}>
            <h2>Data Sign Up :</h2>
            <div>

              <table className="signup--data">

                <tr className="tr--table">
                  <th style={{width: '40px'}}>N°</th>
                  <th style={{width: '170px'}}>Name</th>
                  <th style={{width: '170px'}}>Email</th>
                </tr>
                {this.state.datas.map((data:any) => (
                  <tr key={data.id} className="tr--table">
                    <td style={{width: '40px'}}>{data.id}</td>
                    <td style={{width: '170px'}}>{data.name}</td>
                    <td style={{width: '170px'}}>{data.email}</td>
                  </tr>

                ))}
              </table>
            </div>
            <span className="signup--members">
              Number of people: {this.state.datas.length}
            </span>
        </div>

      </div>
    );
  }
}

export default SignUp;