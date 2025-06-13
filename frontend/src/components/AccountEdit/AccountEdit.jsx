function AccountEdit() {
    return (
        <div className="text-white">
            Account Edit
            <div>
                <p>Edit Profile Info</p>
                <div>
                    <img src="" alt="" />
                    <p>Update Profile Image</p>
                    <p>Should be less than 5mb</p>
                    <p>Recommended size:</p>
                    <p>500px x 500px</p>
                    <div>
                        <p>Drag Here to Upload Media</p>
                        <img src="" alt="" />
                        <button></button>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio"></textarea>
                    </div>
                    <button>Save</button>
                </div>
            </div>
            <div>
                <p>Change Username</p>
                <div>
                    <p>Current Username:</p>
                    <p>ron</p>
                </div>
                <div>
                    <label htmlFor="username">New Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <button>Save</button>
            </div>
            <div>
                <p>Change Password</p>
                <div>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input type="text" id="oldPassword" name="oldPassword" />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="text" id="newPassword" name="newPassword" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        type="text"
                        id="confirmPassword"
                        name="confirmPassword"
                    />
                </div>
                <button>Save</button>
            </div>
            <div>
                <div>
                    <p>Danger Zone</p>
                </div>
                <div>
                    <p>Delete Account</p>
                    <p>All your comments, posts, and account will be deleted</p>
                </div>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default AccountEdit
