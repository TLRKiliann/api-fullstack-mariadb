import React, { useState } from 'react';
//import { DataType } from '../Models/model';
import ButtonMeeting from './ButtonMeeting/ButtonMeeting';
import { AiFillEye } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineMyLocation } from 'react-icons/md';
import '../StylesComponents/SubMeetingPoint.scss';


type SubMeetingPointProps = {
  //data: string | number | boolean;
  id: number | any;
  editNum: boolean;
  editName: boolean;
  
  changeName: boolean;
  changeNumber: boolean;
  changeEmail: boolean;
  
  datee: string;
  setDatee: React.Dispatch<React.SetStateAction<string>>;
  
  hour: string;
  setHour: React.Dispatch<React.SetStateAction<string>>;
  
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  
  lastname: string;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  editFirstName: string;

  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  editPhone: string;

  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  editEmail: string;

  notice: string;
  setNotice: React.Dispatch<React.SetStateAction<string>>;

  //handleRegister: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRegister: (id: number) => void;

  handleChangeFirstName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFirstNameSwitch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  validateFirstName: () => void;

  handleUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateNumber: (id: number) => void;

  handleUpdateEmail: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidateEmail: (id: number) => void;

  handleDelete: (id: number | any) => void;
};

const SubMeetingPoint = (props: SubMeetingPointProps) => {

  const [showMeetingPoint, setShowMeetingPoint] = useState<boolean>(false);

  const handleShow = () => {
    setShowMeetingPoint(!showMeetingPoint);
  };

  const MAPPING = "https://wego.here.com/directions/mix//";

  const styles = {
    display: 'flex', 
    alignItems: 'center',
    color: 'royalblue'
  };

  return (
    <div className="mainfirst--div">

      <div className="first--data">

        <div className="capsview--div">

          <div className="left--divview">
            <div className="pview--left">
              <button onClick={handleShow}>
                {showMeetingPoint 
                  ? <FaRegEyeSlash size={24} style={styles} /> 
                  : <AiFillEye size={24} style={styles} />}
              </button>
              <p>Date : </p>
            </div>
            <div className="pinput--date">
              <input
                value={props.datee}
                onChange={(event) => props.setDatee(event.target.value)} />
            </div>
          </div>
          <div className="right--divhour">
            <div className="pview--left">
              <p>Hour : </p>
            </div>
            <div className="input--hour">
              <input
                value={props.hour}
                onChange={(event) => props.setHour(event.target.value)} />
            </div>
          </div>
        </div>

        {showMeetingPoint ? (
          <div>
            <div className="caps--location">

              <div className="p--location">
                <p>Location : </p>
              </div>

              <div className="input--location">
                <input
                  value={props.location}
                  onChange={(event) => props.setLocation(event.target.value)} />
              </div>  

              <div className="a--location">
                <a
                  href={`${MAPPING} ${props.location}`}
                  target="_blank"
                  title="Go to map !"
                  rel="noreferrer" 
                  className="hwg--a"
                >
                  <MdOutlineMyLocation size={24} />
                </a>
              </div>
                
            </div>


            <div className="caps--div">

              <div className="left--div">
                <div className="p--left">
                  <p>Firstname : </p>
                </div>
                <div className="input--right">
                  <input
                    value={props.firstname}
                    onChange={(event) => props.setFirstname(event.target.value)}
                  />
                </div>

                {props.changeName ? (

                  <div className="changephone--div">
                    <input
                      className="input--visiblecolor"
                      value={props.editFirstName}
                      onChange={props.handleChangeFirstName}
                    />
                    <button
                      className="btn--modify"
                      onClick={props.validateFirstName}>
                      Save
                    </button>
                  </div>
                  ) : null
                }

                {!props.changeName ? (

                  <div className="changephone--btndiv">
                    <button
                      className="btn--modify"
                      onClick={() => props.handleFirstNameSwitch(props.id)}>
                      Modify
                    </button>
                  </div>

                  ) : null
                }
              </div>


              {!props.editName ? (

              <div className="right--div">
              
                <div className="p--left">
                  <p>Lastname : </p>
                </div>
                
                <div className="input--right">
                  <input
                    value={props.lastname}
                    onChange={(event) => props.setLastname(event.target.value)}
                  />
                </div>

                  <div className="changephone--btndiv">
                    <button
                      className="btn--modify"
                      onClick={() => props.handleFirstNameSwitch(props.id)}>
                      Modify
                    </button>
                  </div>

              </div>
                ) : null
              }
            </div>


              <div className="caps--div">
              {!props.changeEmail ? (                
                <div className="left--div">
                  <div className="p--left">
                    <p>Phone : </p>
                  </div>
                  <div className="input--right">
                    <input
                      value={props.phone}
                      onChange={(event) => props.setPhone(event.target.value)}
                    />
                  </div>

                  {props.changeNumber ? (

                    <div className="changephone--div">
                      <input
                        className="input--visiblecolor"
                        value={props.editPhone}
                        onChange={props.handleChangeNumber}
                      />
                      <button 
                        className="btn--modify"
                        onClick={() => props.validateNumber(props.id)}>
                        Save
                      </button>
                    </div>
                    ) : null
                  }

                  {!props.changeNumber ? (

                    <div className="changephone--btndiv">
                      <button
                        className="btn--modify"
                        onClick={() => props.handleUpdate(props.id)}>
                        Modify
                      </button>
                    </div>
                    ) : null
                  }

                </div>
                ) : null
              }


              {!props.changeNumber ? (

                <div className="right--div">
                  <div className="p--left">
                    <p>Email : </p>
                  </div>
                  <div className="input--right">
                    <input
                      value={props.email}
                      onChange={(event) => props.setEmail(event.target.value)} />
                  </div>

                  {props.changeEmail ? (

                    <div className="changephone--div">
                      <input
                        className="input--visiblecolor"
                        value={props.editEmail}
                        onChange={props.handleChangeEmail}
                      />
                      <button 
                        className="btn--modify"
                        onClick={() => props.handleValidateEmail(props.id)}>
                        Save
                      </button>
                    </div>
                    ) : null
                  }

                  {!props.changeEmail ? (

                    <div className="changephone--btndiv">
                      <button
                        className="btn--modify"
                          onClick={() => props.handleUpdateEmail(props.id)}>
                        Modify
                      </button>
                    </div>
                    ) : null
                  }

                </div>
                ) : null
              }

              </div>

              <div className="caps--textarea">
                <div className="subtextarea">
                  <p>Note(s) : </p>
                  <textarea
                    className="text--area" 
                    value={props.notice}
                    onChange={(event) => props.setNotice(event.target.value)} />
                </div>
              </div>

              <ButtonMeeting
                id={props.id}
                handleDelete={() => props.handleDelete(props.id)}
                handleRegister={() => props.handleRegister(props.id)}
              />
          </div>
          ) : null
        }

      </div>
    </div>
  )
}

export default SubMeetingPoint;