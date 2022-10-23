type ButtonMeetingProps = {
  id: number | any;
  handleDelete: (id: number | any) => void;
  handleRegister: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMeeting:React.FC<ButtonMeetingProps> = (props) => {
  return (
    <div className="btn--meetingdelete">
      <button
        className="delete--meetingbtn"
        onClick={() => props.handleDelete(props.id)}
      >
        Delete
      </button>

      <button
        className="register--meetingbtn"
        onClick={() => props.handleRegister(props.id)}
      >
        Register
      </button>
    </div>
  )
}

export default ButtonMeeting;