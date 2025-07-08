import { useAppSelector } from "../hooks"

const Profile = () => {
    const user = useAppSelector((state => state.auth.user))
    if(!user) return <p>Loading...</p>

    return(
        <div style={{padding: "1rem"}}>
            <h2>My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>

        </div>
    )
}

export default Profile;