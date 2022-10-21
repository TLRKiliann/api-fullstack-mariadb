import React, { useState, useEffect } from 'react';
import meetingServices from '../Services/meetingServices';
import phoneServices from '../Services/phoneServices';
import { DataType } from '../Models/model';
import SubMeetingPoint from '../Components/SubMeetingPoint';
import '../StylesPages/MeetingPoint.scss';


export const MeetingPoint:React.FC = () => {

  const [datas, setDatas] = useState<Array<DataType | any>>([]);
  const [newDatas, setNewDatas] = useState<Array<DataType | any>>([]);

  const [datee, setDatee] = useState<string>("");
  const [hour, setHour] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  const [firstname, setFirstname] = useState<string>("");
  const [editFirstName, setEditFirstName] = useState<string>("");
  const [changeName, setChangeName] = useState<boolean>(false);

  const [lastname, setLastname] = useState<string>("");
  
  const [phone, setPhone] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [changeNumber, setChangeNumber] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [changeEmail, setChangeEmail] = useState<boolean>(false);

  const [notice, setNotice] = useState<string>("");
  const [createNewMeeting, setCreatNewMeeting] = useState<boolean>(false);

  const [switchLastname, setSwitchLasname] = useState<boolean>(false);

  useEffect(() => {
    meetingServices
      .getAll()
      .then(initialNote => {
        setDatas(initialNote);
      })
  }, []);

  const handleRefresh = async () => {
    await meetingServices
      .getAll()
      .then(initialNote => {
        setDatas(initialNote);
      })
    alert("Refresh done !")
  };

  const handleCreate = () => {
    setCreatNewMeeting(!createNewMeeting);
  };

  const handleReorderDate = async () => {
    console.log("Date clicked !");

    await meetingServices
      .getByOrderDate()
      .then(initialNote => {
        setDatas(initialNote);
      })
      .catch((error) => {
        console.log("error", error)
      })
  };

  const handleReorderHour = async () => {
    //console.log("Hour clicked !");

    await meetingServices
      .getByOrderHour()
      .then(initialNote => {
        setDatas(initialNote);
      })
      .catch((error) => {
        console.log("error", error)
      })
  };

  //console.log("After handleReorder", datas)
  //Create new appointment (POST method)
  const generateId = () => {
    const maxId = datas.length > 0
      ? Math.max(...datas.map(d => d.id))
      : 0
    return maxId + 1;
  };

  //Method POST
  const handleSaveAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    const dataObject = {
      id: generateId(),
      datee: datee + " " + hour,
      hour: hour,
      location: location,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      notice: notice,
      editNum: false,
      editName: false
    }

    meetingServices
      .create(dataObject)
      .then(returnData => {
        setDatas(datas.concat(dataObject))
      })
      .catch((error) => {
        console.log("error with create new appointment !")
        setDatas([])
      })
    alert(`Data saved OK !`);
    setCreatNewMeeting(false);
  };

  //console.log("newDatas 1", newDatas);

  //PHONECONTACT
  const handleRegister = (id: number) => {
    const newDataObject = datas.find(data => data.id === id ? {...data,
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      location: data.location
    } : null);
    //console.log(newDataObject)

    phoneServices
      .createPhone(newDataObject)
      .then(returnData => {
        setNewDatas(newDatas.concat(newDataObject))
      })
      .catch((error) => {
        console.log("error with create new phone contact !");
        setNewDatas([]);
      })
    alert(`Data saved OK !`);
  };

  //console.log("newDatas 2", newDatas);

  //Change firstname
  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditFirstName(event.target.value);
  };

  //Update (PUT method)
  const handleFirstNameSwitch = (id: number) => {
    const data = datas.find(data => data.id === id);
    const changeFirstName = {...data, editName: !data.editName};
    setEditFirstName(data ? data.firstname : null);
    setChangeName(!changeName);

    meetingServices
      .updateName(id, changeFirstName)
      .then(returnFirstName => {
        setDatas(datas.map(data => data.id === id 
          ? {
            id: data.id,
            datee: data.datee + data.hour,
            hour: data.hour,
            location: data.location,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            notice: data.notice,
            editNum: data.editNum,
            editName: data.editName
          } : data
        ))
      })
      .catch((error) => {
        console.log("error with update firstname", error)
        setDatas(datas.filter(d => d.id !== id))
      })
  };

  const validateFirstName = (id: number) => {
    const data = datas.find(data => data.id === id);
    const newFirstName = {...data, firstname: editFirstName,
      editName: !data.editName};
    setChangeName(!changeName);

    meetingServices
      .updateValName(id, newFirstName)
      .then(returnFirstName => {
        setDatas(datas.map(data => data.id === id 
          ? {
            id: data.id,
            datee: data.datee + data.hour,
            hour: data.hour,
            location: data.location,
            firstname: editFirstName,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            notice: data.notice,
            editNum: data.editNum,
            editName: data.editName
          } : data
        ))
      })
      .catch((error) => {
        alert(`Phone Number: ${data.firstname} not found !`)
        setDatas(datas.filter(data => data?.id !== id)
      )})
    setEditFirstName("");
  };


  //To change note.number
  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(event.target.value);
  };

  //UPDATE to switch input number
  const handleUpdate = (id: number) => {
    const data = datas.find(data => data.id === id);
    const changeEdit = {...data, editNum: !data.editNum};
    setEditPhone(data ? data.phone : null);
    setChangeNumber(!changeNumber);

    meetingServices
      .updateNumber(id, changeEdit)
      .then(returnData => {
        setDatas(datas.map(data => data.id === id 
          ? {
            id: data.id,
            datee: data.datee + data.hour,
            hour: data.hour,
            location: data.location,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            notice: data.notice,
            editNum: data.editNum,
            editName: data.editName
          } : data
        ))
      })
      .catch((error) => {
        console.log("error editNum update", error)
        setDatas(datas.filter(data => data.id !== id))
      })
  };

  //UPDATE To Save Number
  const validateNumber = (id: number) => {
    const data = datas.find(data => data.id === id)
    const changeNumberVal = {...data, phone: editPhone, editNum: !data.editNum}
    setChangeNumber(!changeNumber);

    meetingServices
      .updateValNum(id, changeNumberVal)
      .then(returnData => {
        setDatas(datas.map(data => data.id === id
          ? {
            id: data.id,
            datee: data.datee + data.hour,
            hour: data.hour,
            location: data.location,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: editPhone,
            email: data.email,
            notice: data.notice,
            editNum: data.editNum,
            editName: data.editName
          } : data
        ))
      })
      .catch((error) => {
        alert(`Phone Number: ${data.phone} not found !`)
        setDatas(datas.filter(data => {
          return data.id !== id
        }))
      })
    setEditPhone("");
  };

  //PUT with email
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(event.target.value);
  };

  const handleUpdateEmail = (id: number) => {
    const data = datas.find(data => data.id === id);
    setEditEmail(data ? data.email : null);
    setChangeEmail(!changeEmail);
  };

  const handleValidateEmail = (id: number) => {
    const data = datas.find(data => data.id === id)
    const changeEmailVal = {...data, email: editEmail}
    setChangeEmail(!changeEmail);
    
    meetingServices
      .updateValEmail(id, changeEmailVal)
      .then(returnData => {
        setDatas(datas.map(data => data.id === id
          ? {
            id: data.id,
            datee: data.datee + data.hour,
            hour: data.hour,
            location: data.location,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: editEmail,
            notice: data.notice,
            editNum: data.editNum,
            editName: data.editName
          } : data
        ))
      })
      .catch((error) => {
        alert(`Email: ${data.email} not found !`)
        setDatas(datas.filter(data => {
          return data.id !== id
        }))
      })
    setEditEmail("");
  };


  //DELETE
  const handleDelete = (id: number) => {
    const data = datas.find(data => data.id === id);
    if (window.confirm(`Delete ${data.firstname} ${data.lastname} ?`)) {

      meetingServices
        .remove(id)
        .then(returnData => {
          setDatas(datas.filter(data => data.id !== id))
        })
        .catch((error) => {
          alert(`The note '${data.firstname} ${data.lastname}'\
            was already deleted from server`)
          setDatas(datas.filter(data => data.id !== id))
        });
    } else {
      return null;
    }
  };

  const handleSearchLasname = () => {
    setSwitchLasname(!switchLastname);
  };

  return (
    <div className="meetingpoint">
      <h1>Meeting Point</h1>

      {switchLastname ? (
        <div className="dash--searchLastname">
          <div className="subdash--searchLastname">

            <div className="div--topcruze">
              <p
                className="lastname--cruze"
                onClick={handleSearchLasname}
              >
                X
              </p>
            </div>

            <h2>Search By Lastname</h2>

            <div className="input--btnlastnamesearch">
              <input
                type="text"

                value=""
              
                placeholder="Enter lastname here..."
                style={{padding: '5px 3px'}} 
              />
              <button>
                Search
              </button>
            </div>

            <p style={{color: 'lightgreen'}}>Response of your Request :</p>
            <span>
              Value of search Value of searcValue of searc
              Value of searc Value of searc Value of searc
              Value of searc Value of searc Value of searc
            </span>
          </div>
        </div>
      ) : null}


      <div className="create--div">

        <div className="appointment--switch">
          <button
            onClick={handleCreate}>
            {createNewMeeting ? "Hide Frame" : "New Appointment"}
          </button>
        </div>

        <div className="appointment--reorderDate">
          <button
            onClick={handleReorderDate}
          >
            Reorder By Date
          </button>
        </div>

        <div className="appointment--reorderHour">
          <button
            onClick={handleReorderHour}
          >
            Reorder By Hour
          </button>
        </div>

        <div className="appointment--searchLastname">
          <button
            onClick={handleSearchLasname}>
            Search By Lastname
          </button>
        </div>

        <div className="appointment--refresh">
          <button
            onClick={handleRefresh}>
            Refresh Page
          </button>
        </div>

        {createNewMeeting ? (
          <div className="frameofsearch">

            <div className="div--xclose">
              <p 
                className="x--close" 
                onClick={handleCreate}>
                X
              </p>
            </div>

            <form
              className="display--settingsmeeting"
              onSubmit={(event) => handleSaveAppointment(event)} >

              <div className="title--newappointment">
                <h2>Create New Appointment</h2>
              </div>

              <div className="divMP--content">
                <label>
                  Date :
                </label>
                <input
                  type="text"
                  onChange={(e) => setDatee(e.target.value)}
                  autoFocus
                  placeholder="00-00-0000" />
              </div>

              <div className="divMP--content">
                <label>
                  Hour :
                </label>
                <input
                  type="text"
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="00:00" />
              </div>
              
              <div className="divMP--content">
                <label>
                  Location :
                </label>
                <input
                  style={{width: '240px'}}
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Chemin du Devin, 1012 Lausanne" />
              </div>
              
              <div className="divMP--content">
                <label>
                  Firstname :
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="firstname" />
              </div>

              <div className="divMP--content">
                <label>
                  Lastname :
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="lastname" />
              </div>

              <div className="divMP--content">
                <label>
                  Phone Number :
                </label>
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="333 333 22 22" />
              </div>

              <div className="divMP--content">
                <label>
                  Email :
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="super.man@mail.uk" />
              </div>

              <div className="div--textarealabel">
                <div className="noticelabel--div">
                  <label>
                    Note(s) :
                  </label>
                </div>
                <div className="text--areacreate">
                  <textarea
                    rows={5}
                    cols={66}
                    wrap="soft"
                    onChange={(e) => setNotice(e.target.value)}
                    placeholder="Write something here...">
                  </textarea>
                </div>
              </div>

              <div className="divbtn--createmeeting">
                <button
                  type="submit"
                  className="btn--createmeeting"
                >
                  Save New Meeting
                </button>
              </div>

            </form>
          </div>
        ) : null}

      </div>
        <div className="lastmainpoint--div">
        {datas.map((data) => (
          <SubMeetingPoint
            key={data?.id}
            id={data?.id}
            
            datee={data.datee}
            setDatee={setDatee}
            hour={data.hour}
            setHour={setHour}
            location={data.location}
            setLocation={setLocation}

            firstname={data.firstname}
            setFirstname={setFirstname}
            editFirstName={editFirstName}

            editName={data.editName}
            changeName={changeName}

            lastname={data.lastname}
            setLastname={setLastname}

            phone={data.phone}
            editPhone={editPhone}
            setPhone={setPhone}

            editNum={data.editNum}
            changeNumber={changeNumber}

            email={data.email}
            setEmail={setEmail}
            editEmail={editEmail}
            changeEmail={changeEmail}

            notice={data.notice}
            setNotice={setNotice}

            handleChangeFirstName={(event) => handleChangeFirstName(event)}
            handleFirstNameSwitch={() => handleFirstNameSwitch(data.id)}
            validateFirstName={() => validateFirstName(data.id)}

            handleChangeNumber={(event) => handleChangeNumber(event)}
            validateNumber={() => validateNumber(data.id)}
            handleUpdate={() => handleUpdate(data.id)}

            handleChangeEmail={(event) => handleChangeEmail(event)}
            handleUpdateEmail={() => handleUpdateEmail(data.id)} 
            handleValidateEmail={() => handleValidateEmail(data.id)}

            handleRegister={() => handleRegister(data.id)}
            handleDelete={() => handleDelete(data.id)}
          />
        ))}
      </div>
      {newDatas.map(newData => (
        <span key={newData.id}>
          {newData.id}
          {newData.firstname}
          {newData.lastname}
          {newData.phone}
          {newData.email}
          {newData.location}
        </span>
      ))}
    </div>
  )
}