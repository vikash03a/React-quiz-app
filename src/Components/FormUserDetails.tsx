import React, { useState } from "react";
import { User } from "../Types/User";

interface FormUserDetailsProps {
  user: User;
  onSubmitForm: (data: User) => void;
}

function FormUserDetails(props: FormUserDetailsProps) {
  const [user, setUser] = useState<User>(props.user);
  const handleChange = (label, e) => {
    let newUser = user;
    newUser[label] = e.target.value;
    setUser(newUser);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitForm(user);
  };
  return (
    <form className="text-left mt-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your first name"
          onBlur={(event) => handleChange("firstName", event)}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your last name"
          onBlur={(event) => handleChange("lastName", event)}
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onBlur={(event) => handleChange("email", event)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label>Occupation</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your occupation"
          onBlur={(event) => handleChange("occupation", event)}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your city"
          onBlur={(event) => handleChange("city", event)}
        />
      </div>
      <div className="form-group">
        <label>Bio</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter your bio"
          onBlur={(event) => handleChange("bio", event)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormUserDetails;
