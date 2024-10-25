import React from 'react';
import '../../assets/styles/ProfileBlock.css';
import { User } from '../types/User';

interface ProfileBlockProps {
  userData: User;
}

function ProfileBlock ({ userData }: ProfileBlockProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className="profile-block">
      <div className="profile-header">
        <div className="profile-image"></div>
      </div>
      <div className="profile-data-block">
        <h3 className="block-title">Email</h3>
        <p className="email">{userData.email}</p>
      </div>
      <div className="profile-data-block">
        <h3 className="block-title">General</h3>
        <form onSubmit={handleSubmit}>
          <div className="profile-form-inputs">
            <div className="input-block">
              <label htmlFor="firstName">First name</label>
              <input type="text" name="firstName" value={userData.firstName}/>
            </div>
            <div className="input-block">
              <label htmlFor="lastName">Last name</label>
              <input type="text" name="lastName" value={userData.lastName}/>
            </div>
          </div>
          <button type="submit" className='form-button_submit'>Update data</button>
        </form>
      </div>
      <div className="profile-data-block">
        <h3 className="block-title">Security</h3>
        <form onSubmit={handleSubmit}>
          <div className="profile-form-inputs">
            <div className="input-block">
              <label htmlFor="password">Current password</label>
              <input type="text" name="password" />
            </div>
            <div className="input-block"></div>
            <div className="input-block">
              <label htmlFor="newPassword">New password</label>
              <input type="text" name="newPassword" />
            </div>
            <div className="input-block">
              <label htmlFor="claimPassword">Claim new password</label>
              <input type="text" name="claimPassword" />
            </div>
          </div>
          <button type="submit" className='form-button_submit'>Change password</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileBlock;